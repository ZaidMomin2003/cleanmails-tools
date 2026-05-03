'use client'

import { useState, useCallback } from 'react'
import Papa from 'papaparse'

interface Stats {
  inputRows: number
  outputRows: number
  emailsSplit: number
  dupesRemoved: number
  emailColumn: string
}

export default function CsvCleanerTool() {
  const [fileName, setFileName] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [preview, setPreview] = useState<string[][]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [cleanedCsv, setCleanedCsv] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) { setError('Please upload a .csv file'); return }
    setFileName(file.name)
    setProcessing(true)
    setError('')
    setStats(null)

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        const rows = result.data as string[][]
        if (rows.length < 2) { setError('CSV has no data rows'); setProcessing(false); return }

        const hdrs = rows[0]
        const dataRows = rows.slice(1)

        // Find email column
        let emailColIdx = hdrs.findIndex(h => /^e-?mail/i.test(h.trim()))
        if (emailColIdx === -1) {
          emailColIdx = hdrs.findIndex(h => /mail|contact/i.test(h.trim()))
        }
        if (emailColIdx === -1) {
          // Scan data for @ symbols
          for (let c = 0; c < hdrs.length; c++) {
            const hasEmail = dataRows.some(r => r[c] && r[c].includes('@'))
            if (hasEmail) { emailColIdx = c; break }
          }
        }
        if (emailColIdx === -1) { setError('Could not detect an email column. Make sure your CSV has emails.'); setProcessing(false); return }

        const emailColName = hdrs[emailColIdx]
        const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g

        // Split rows
        const newRows: string[][] = []
        let splitCount = 0

        for (const row of dataRows) {
          const emailCell = row[emailColIdx] || ''
          const emails = emailCell.match(emailRegex) || []

          if (emails.length <= 1) {
            newRows.push([...row])
          } else {
            splitCount += emails.length - 1
            for (const email of emails) {
              const newRow = [...row]
              newRow[emailColIdx] = email.trim()
              newRows.push(newRow)
            }
          }
        }

        // Deduplicate
        const seen = new Set<string>()
        const deduped: string[][] = []
        let dupesRemoved = 0
        for (const row of newRows) {
          const key = row.join('|||')
          if (seen.has(key)) { dupesRemoved++; continue }
          seen.add(key)
          deduped.push(row)
        }

        setHeaders(hdrs)
        setPreview(deduped.slice(0, 20))
        setStats({
          inputRows: dataRows.length,
          outputRows: deduped.length,
          emailsSplit: splitCount,
          dupesRemoved,
          emailColumn: emailColName,
        })

        // Build CSV
        const csv = Papa.unparse({ fields: hdrs, data: deduped })
        setCleanedCsv(csv)
        setProcessing(false)
      },
      error: () => { setError('Failed to parse CSV file.'); setProcessing(false) },
    })
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const download = () => {
    const blob = new Blob([cleanedCsv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cleaned-${fileName}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 sm:p-12 text-center transition-colors cursor-pointer ${
          dragOver ? 'border-[#FFD700] bg-[#FFD700]/5' : 'border-[var(--border)] hover:border-[var(--border-strong)]'
        }`}
        onClick={() => document.getElementById('csv-input')?.click()}
      >
        <input id="csv-input" type="file" accept=".csv" onChange={handleFileInput} className="hidden" />
        <p className="text-2xl mb-2">📁</p>
        <p className="text-sm font-medium text-[var(--text)]">
          {processing ? 'Processing...' : fileName ? fileName : 'Drop your CSV here or click to browse'}
        </p>
        <p className="text-[12px] text-[var(--text-tertiary)] mt-1">
          Supports .csv files up to 50MB. All processing happens in your browser.
        </p>
      </div>

      {error && <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>}

      {stats && (
        <div className="mt-8">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] mb-4">
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text)]">{stats.inputRows}</p>
              <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Input rows</p>
            </div>
            <div className="text-lg text-[var(--text-tertiary)]">→</div>
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--success)]">{stats.outputRows}</p>
              <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Output rows</p>
            </div>
            <div className="h-8 w-px bg-[var(--border)]" />
            <div>
              <p className="text-[12px] text-[var(--text-secondary)]">
                <strong>{stats.emailsSplit}</strong> emails split · <strong>{stats.dupesRemoved}</strong> dupes removed
              </p>
              <p className="text-[11px] text-[var(--text-tertiary)]">
                Email column: <strong>{stats.emailColumn}</strong>
              </p>
            </div>
          </div>

          {/* Download */}
          <button onClick={download}
            className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-5 py-2.5 rounded-md transition-colors cursor-pointer">
            ⬇️ Download Cleaned CSV
          </button>

          {/* Preview table */}
          <div className="border border-[var(--border)] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-[var(--bg-secondary)]">
              <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                Preview (first {Math.min(20, preview.length)} rows)
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
                    {headers.map((h, i) => (
                      <th key={i} className="text-left px-3 py-2 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} className="border-t border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 text-[var(--text)] whitespace-nowrap max-w-[200px] truncate">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
