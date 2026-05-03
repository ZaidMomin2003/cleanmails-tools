'use client'

import { useState } from 'react'

interface RecordResult {
  type: 'SPF' | 'DKIM' | 'DMARC'
  status: 'found' | 'not_found' | 'error'
  value?: string
  details?: string
}

export default function DnsCheckerTool() {
  const [domain, setDomain] = useState('')
  const [results, setResults] = useState<RecordResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const check = async () => {
    const clean = domain.trim().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').toLowerCase()
    if (!clean || !clean.includes('.')) { setError('Enter a valid domain like example.com'); return }

    setLoading(true)
    setError('')
    setResults(null)

    try {
      const res = await fetch(`/api/dns-check?domain=${encodeURIComponent(clean)}`)
      if (!res.ok) throw new Error('Failed to check DNS records')
      const data = await res.json()
      setResults(data.results)
    } catch {
      setError('Could not check DNS records. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const statusIcon = (s: string) => s === 'found' ? '✅' : s === 'not_found' ? '❌' : '⚠️'
  const statusColor = (s: string) => s === 'found' ? 'text-[var(--success)]' : 'text-[var(--danger)]'
  const grade = results
    ? results.filter(r => r.status === 'found').length === 3 ? 'A' : results.filter(r => r.status === 'found').length === 2 ? 'B' : results.filter(r => r.status === 'found').length === 1 ? 'C' : 'F'
    : null
  const gradeColor = grade === 'A' ? 'text-[var(--success)]' : grade === 'B' ? 'text-[var(--warning)]' : 'text-[var(--danger)]'

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="example.com"
          className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--border-strong)] transition-colors placeholder:text-[var(--text-tertiary)]"
        />
        <button
          onClick={check}
          disabled={loading || !domain.trim()}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
        >
          {loading ? '⏳ Checking...' : '🔍 Check Records'}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>}

      {results && (
        <div className="mt-8 space-y-4">
          {/* Grade */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
            <p className={`text-3xl font-bold ${gradeColor}`}>{grade}</p>
            <div className="h-10 w-px bg-[var(--border)]" />
            <div>
              <p className={`text-sm font-semibold ${gradeColor}`}>
                {grade === 'A' ? 'All records configured' : grade === 'B' ? 'Mostly configured' : grade === 'C' ? 'Partially configured' : 'No records found'}
              </p>
              <p className="text-[12px] text-[var(--text-secondary)]">
                {results.filter(r => r.status === 'found').length}/3 records found for {domain.trim().replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </p>
            </div>
          </div>

          {/* Records */}
          {results.map((r, i) => (
            <div key={i} className="border border-[var(--border)] rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)]">
                <span>{statusIcon(r.status)}</span>
                <span className="text-sm font-bold text-[var(--text)]">{r.type}</span>
                <span className={`text-[11px] font-medium ${statusColor(r.status)}`}>
                  {r.status === 'found' ? 'Found' : 'Not Found'}
                </span>
              </div>
              <div className="px-4 py-3">
                {r.value ? (
                  <pre className="text-xs text-[var(--text-secondary)] bg-[var(--code-bg)] p-3 rounded overflow-x-auto whitespace-pre-wrap break-all">
                    {r.value}
                  </pre>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">No {r.type} record found for this domain.</p>
                )}
                {r.details && (
                  <p className="mt-2 text-[12px] text-[var(--text-tertiary)]">{r.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
