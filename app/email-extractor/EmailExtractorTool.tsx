'use client'

import { useState } from 'react'

export default function EmailExtractorTool() {
  const [text, setText] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [dupes, setDupes] = useState(0)
  const [domains, setDomains] = useState<{ domain: string; count: number }[]>([])
  const [extracted, setExtracted] = useState(false)
  const [copied, setCopied] = useState(false)

  const extract = () => {
    if (!text.trim()) return
    const regex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g
    const found = text.match(regex) || []
    const lower = found.map(e => e.toLowerCase())
    const unique = [...new Set(lower)]
    setDupes(lower.length - unique.length)
    setEmails(unique)

    // Domain breakdown
    const domainMap: Record<string, number> = {}
    unique.forEach(e => {
      const d = e.split('@')[1]
      domainMap[d] = (domainMap[d] || 0) + 1
    })
    const sorted = Object.entries(domainMap).map(([domain, count]) => ({ domain, count })).sort((a, b) => b.count - a.count)
    setDomains(sorted)
    setExtracted(true)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(emails.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCSV = () => {
    const csv = 'email\n' + emails.join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'extracted-emails.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={`Paste any text here...\n\nFor example:\nContact us at hello@company.com or sales@company.com\nJohn Smith <john@agency.io> is the founder.\nReach out to support@startup.com, info@brand.co, or team@example.org for more info.`}
        className="w-full min-h-[220px] p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm leading-relaxed resize-y focus:outline-none focus:border-[var(--border-strong)] transition-colors placeholder:text-[var(--text-tertiary)]"
      />

      <button
        onClick={extract}
        disabled={!text.trim()}
        className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-md transition-colors cursor-pointer"
      >
        📧 Extract Emails
      </button>

      {extracted && (
        <div className="mt-8">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[var(--text)]">{emails.length}</p>
              <p className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider">Unique</p>
            </div>
            {dupes > 0 && (
              <>
                <div className="h-8 w-px bg-[var(--border)]" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--text-secondary)]">{dupes}</p>
                  <p className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider">Dupes removed</p>
                </div>
              </>
            )}
            <div className="h-8 w-px bg-[var(--border)]" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[var(--text-secondary)]">{domains.length}</p>
              <p className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider">Domains</p>
            </div>
          </div>

          {emails.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">No email addresses found in the text.</p>
          ) : (
            <>
              {/* Actions */}
              <div className="flex gap-2 mb-4">
                <button onClick={copyAll}
                  className="text-[12px] font-medium text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-hover)] px-3 py-1.5 rounded transition-colors cursor-pointer">
                  {copied ? '✓ Copied' : '📋 Copy all'}
                </button>
                <button onClick={downloadCSV}
                  className="text-[12px] font-medium text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-hover)] px-3 py-1.5 rounded transition-colors cursor-pointer">
                  ⬇️ Download CSV
                </button>
              </div>

              {/* Email list */}
              <div className="border border-[var(--border)] rounded-lg overflow-hidden mb-4">
                <div className="max-h-[300px] overflow-y-auto p-4 bg-[var(--code-bg)]">
                  <pre className="text-sm text-[var(--text)] font-mono whitespace-pre-wrap">{emails.join('\n')}</pre>
                </div>
              </div>

              {/* Domain breakdown */}
              {domains.length > 0 && (
                <div className="border border-[var(--border)] rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 bg-[var(--bg-secondary)]">
                    <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">Domain breakdown</p>
                  </div>
                  <div className="divide-y divide-[var(--border)]">
                    {domains.slice(0, 10).map(d => (
                      <div key={d.domain} className="flex items-center justify-between px-4 py-2 hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-sm text-[var(--text)]">{d.domain}</span>
                        <span className="text-sm text-[var(--text-secondary)] font-medium">{d.count}</span>
                      </div>
                    ))}
                    {domains.length > 10 && (
                      <div className="px-4 py-2 text-[12px] text-[var(--text-tertiary)]">
                        +{domains.length - 10} more domains
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
