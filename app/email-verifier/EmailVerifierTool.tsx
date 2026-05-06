'use client'

import { useState, useRef, useCallback } from 'react'

interface VerifyResult {
  email: string
  status: 'valid' | 'invalid' | 'disposable' | 'no_mx' | 'role' | 'pending' | 'error'
  label: string
}

interface RowResult {
  [key: string]: string
}

const API_ENDPOINT = 'https://lead-validator.vercel.app/api/verify'
const API_KEY = 'hubsellistrash'
const MAX_EMAILS = 2000
const CONCURRENCY = 50

const statusConfig = {
  valid: { label: 'Valid', color: 'text-[var(--success)]', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
  invalid: { label: 'Invalid', color: 'text-[var(--danger)]', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' },
  disposable: { label: 'Disposable', color: 'text-[var(--warning)]', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
  no_mx: { label: 'No MX', color: 'text-[var(--danger)]', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' },
  role: { label: 'Role Account', color: 'text-[var(--warning)]', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
  pending: { label: 'Checking...', color: 'text-[var(--text-tertiary)]', bg: 'bg-[var(--bg-secondary)]', border: 'border-[var(--border)]' },
  error: { label: 'Error', color: 'text-[var(--text-tertiary)]', bg: 'bg-[var(--bg-secondary)]', border: 'border-[var(--border)]' },
}

export default function EmailVerifierTool() {
  const [state, setState] = useState<'idle' | 'processing' | 'done'>('idle')
  const [fileName, setFileName] = useState('')
  const [progress, setProgress] = useState(0)
  const [totalEmails, setTotalEmails] = useState(0)
  const [counts, setCounts] = useState({ valid: 0, invalid: 0, disposable: 0 })
  const [results, setResults] = useState<RowResult[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setState('idle')
    setFileName('')
    setProgress(0)
    setTotalEmails(0)
    setCounts({ valid: 0, invalid: 0, disposable: 0 })
    setResults([])
    setHeaders([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFile = useCallback(async (file: File) => {
    if (!file) return
    setFileName(file.name)
    setState('processing')

    // Dynamic import PapaParse
    const Papa = (await import('papaparse')).default

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const fields = result.meta.fields || []
        const data = result.data as Record<string, string>[]
        processRows(data, fields)
      },
      error: () => {
        setState('idle')
        alert('Failed to parse CSV file. Please check the format.')
      },
    })
  }, [])

  const processRows = async (data: Record<string, string>[], fields: string[]) => {
    const emailKey = fields.find(f => f.toLowerCase().includes('email')) || fields[0]
    const total = Math.min(data.length, MAX_EMAILS)
    const subset = data.slice(0, total)
    const allHeaders = [...fields, 'Verification Status']

    setHeaders(allHeaders)
    setTotalEmails(total)

    const localResults: RowResult[] = new Array(total)
    const localCounts = { valid: 0, invalid: 0, disposable: 0 }
    let processed = 0

    let index = 0

    const worker = async () => {
      while (index < total) {
        const rowIdx = index++
        const row = { ...subset[rowIdx] }
        const email = row[emailKey]?.trim()

        if (!email || !email.includes('@')) {
          row['Verification Status'] = 'Invalid: No Email'
          localCounts.invalid++
          processed++
          localResults[rowIdx] = row
          continue
        }

        try {
          const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-API-KEY': API_KEY },
            body: JSON.stringify({ email }),
          })
          const res = await response.json()

          if (res && res.is_valid) {
            row['Verification Status'] = 'Valid'
            localCounts.valid++
          } else if (res && res.is_disposable) {
            row['Verification Status'] = 'Disposable'
            localCounts.disposable++
          } else if (res && !res.has_mx_records) {
            row['Verification Status'] = 'Invalid: No MX'
            localCounts.invalid++
          } else {
            row['Verification Status'] = 'Invalid: Syntax/Role'
            localCounts.invalid++
          }
        } catch {
          row['Verification Status'] = 'Error'
          localCounts.invalid++
        }

        processed++
        localResults[rowIdx] = row

        // Update UI every 10 emails or at the end
        if (processed % 10 === 0 || processed === total) {
          setProgress(Math.round((processed / total) * 100))
          setCounts({ ...localCounts })
          setResults([...localResults.filter(Boolean)])
        }
      }
    }

    const workers = Array(CONCURRENCY).fill(null).map(() => worker())
    await Promise.all(workers)

    setProgress(100)
    setCounts({ ...localCounts })
    setResults(localResults.filter(Boolean))
    setState('done')
  }

  const downloadCSV = () => {
    if (results.length === 0) return
    const csvContent = [
      headers.join(','),
      ...results.map(row => headers.map(h => {
        const val = row[h] || ''
        return val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val
      }).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `verified_${fileName || 'emails'}`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      handleFile(file)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  // Idle state — upload zone
  if (state === 'idle') {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl p-12 sm:p-16 text-center transition-all cursor-pointer ${
          dragOver
            ? 'border-[var(--gold)] bg-[#fffdf0] dark:bg-[#2a2700] scale-[1.01]'
            : 'border-[var(--border-strong)] hover:border-[var(--gold)] hover:bg-[var(--bg-secondary)]'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={onFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl">📋</div>
          <div>
            <p className="text-[15px] font-semibold text-[var(--text)] mb-1">
              Drop your CSV file here
            </p>
            <p className="text-[13px] text-[var(--text-secondary)]">
              or click to browse · CSV format · up to 2,000 emails
            </p>
          </div>
          <button
            className="mt-2 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-5 py-2.5 rounded-md transition-colors"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
          >
            Browse Files
          </button>
        </div>
      </div>
    )
  }

  // Processing or Done state
  return (
    <div className="space-y-6">
      {/* File info + progress */}
      <div className="border border-[var(--border)] rounded-lg p-5 bg-[var(--bg-secondary)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--bg)] border border-[var(--border)] rounded-lg flex items-center justify-center text-lg">
              📄
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--text)]">{fileName}</p>
              <p className="text-[11px] text-[var(--text-tertiary)]">
                {totalEmails.toLocaleString()} emails · {state === 'done' ? 'Complete' : `${progress}% verified`}
              </p>
            </div>
          </div>
          {state === 'done' && (
            <button
              onClick={reset}
              className="text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              Upload new file
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--gold)] rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card-bg)] text-center">
          <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Valid</p>
          <p className="text-2xl font-bold text-[var(--success)]">{counts.valid.toLocaleString()}</p>
        </div>
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card-bg)] text-center">
          <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Invalid</p>
          <p className="text-2xl font-bold text-[var(--danger)]">{counts.invalid.toLocaleString()}</p>
        </div>
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card-bg)] text-center">
          <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Disposable</p>
          <p className="text-2xl font-bold text-[var(--warning)]">{counts.disposable.toLocaleString()}</p>
        </div>
      </div>

      {/* Preview table */}
      {results.length > 0 && (
        <div className="border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              Preview (first 10 results)
            </p>
            {state === 'done' && (
              <span className="text-[10px] font-semibold text-[var(--success)] bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                Complete
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                  <th className="text-left px-4 py-2.5 font-semibold text-[var(--text-secondary)] text-[11px] uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-[var(--text-secondary)] text-[11px] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {results.slice(0, 10).map((row, i) => {
                  const emailKey = headers.find(h => h.toLowerCase().includes('email') && h !== 'Verification Status') || headers[0]
                  const email = row[emailKey] || '—'
                  const status = row['Verification Status'] || 'Pending'
                  const isValid = status === 'Valid'
                  const isDisposable = status === 'Disposable'

                  return (
                    <tr key={i} className="hover:bg-[var(--bg-hover)] transition-colors">
                      <td className="px-4 py-2.5 text-[var(--text)] font-medium truncate max-w-[240px]">{email}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          isValid ? 'text-[var(--success)] bg-green-50 dark:bg-green-900/20'
                          : isDisposable ? 'text-[var(--warning)] bg-amber-50 dark:bg-amber-900/20'
                          : 'text-[var(--danger)] bg-red-50 dark:bg-red-900/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isValid ? 'bg-[var(--success)]' : isDisposable ? 'bg-[var(--warning)]' : 'bg-[var(--danger)]'
                          }`} />
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Download button */}
      {state === 'done' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={downloadCSV}
            className="flex-1 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-6 py-3 rounded-lg transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v8M4 7l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Verified CSV
          </button>
          <a
            href="https://cleanmails.online/#pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-[13px] font-semibold text-[var(--text)] border border-[var(--border)] hover:bg-[var(--bg-hover)] px-6 py-3 rounded-lg transition-colors no-underline"
          >
            Get 100% accuracy with Cleanmails →
          </a>
        </div>
      )}

      {/* Accuracy note */}
      {state === 'done' && (
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--bg-secondary)]">
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">💡</span>
            <div>
              <p className="text-[13px] font-medium text-[var(--text)] mb-1">This check is ~80% accurate</p>
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                We verified syntax, MX records, and disposable domains. For full SMTP handshake verification (mailbox existence, catch-all detection), 
                Cleanmails includes unlimited validation with every $497 license — no per-email fees.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
