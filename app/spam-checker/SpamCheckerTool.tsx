'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { spamWords, type Severity } from '@/lib/spam-words'

interface Match {
  word: string
  severity: Severity
  suggestion: string
  count: number
}

const sevStyles: Record<Severity, { underline: string; bg: string; badge: string; label: string }> = {
  high: {
    underline: 'decoration-red-500',
    bg: 'bg-red-500/10',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    label: '🔴 High',
  },
  medium: {
    underline: 'decoration-amber-500',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    label: '🟡 Medium',
  },
  low: {
    underline: 'decoration-blue-400',
    bg: 'bg-blue-400/10',
    badge: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    label: '🔵 Low',
  },
}

export default function SpamCheckerTool() {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mirrorRef = useRef<HTMLDivElement>(null)

  // Sync scroll between textarea and highlight mirror
  const syncScroll = useCallback(() => {
    if (textareaRef.current && mirrorRef.current) {
      mirrorRef.current.scrollTop = textareaRef.current.scrollTop
      mirrorRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }, [])

  // Live analysis — runs on every keystroke
  const { matches, score, highlightedHtml } = useMemo(() => {
    if (!text.trim()) return { matches: [], score: null, highlightedHtml: '' }

    const found: Match[] = []
    const lower = text.toLowerCase()

    // Sort spam words by length descending so longer phrases match first
    const sorted = [...spamWords].sort((a, b) => b.word.length - a.word.length)

    for (const sw of sorted) {
      const escaped = sw.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi')
      const m = lower.match(regex)
      if (m && m.length > 0) {
        found.push({ word: sw.word, severity: sw.severity, suggestion: sw.suggestion, count: m.length })
      }
    }

    found.sort((a, b) => {
      const order: Record<Severity, number> = { high: 0, medium: 1, low: 2 }
      return order[a.severity] - order[b.severity] || b.count - a.count
    })

    // Score
    const high = found.filter(f => f.severity === 'high').reduce((s, f) => s + f.count, 0)
    const med = found.filter(f => f.severity === 'medium').reduce((s, f) => s + f.count, 0)
    const low = found.filter(f => f.severity === 'low').reduce((s, f) => s + f.count, 0)
    const raw = 100 - (high * 12 + med * 5 + low * 2)
    const score = Math.max(0, Math.min(100, raw))

    // Build highlighted HTML
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Mark spam words with colored underlines — process longer phrases first
    for (const sw of sorted) {
      const escaped = sw.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(\\b)(${escaped})(\\b)`, 'gi')
      const sev = sw.severity
      const color = sev === 'high' ? '#ef4444' : sev === 'medium' ? '#f59e0b' : '#60a5fa'
      html = html.replace(regex, `$1<mark style="background:transparent;text-decoration:underline wavy;text-decoration-color:${color};text-underline-offset:3px;color:inherit">$2</mark>$3`)
    }

    // Preserve newlines
    html = html.replace(/\n/g, '<br>')

    return { matches: found, score, highlightedHtml: html }
  }, [text])

  const scoreColor = score === null ? '' : score >= 80 ? 'text-[var(--success)]' : score >= 50 ? 'text-[var(--warning)]' : 'text-[var(--danger)]'
  const scoreLabel = score === null ? '' : score >= 80 ? 'Looking clean' : score >= 50 ? 'Needs some work' : 'High spam risk'
  const scoreBg = score === null ? '' : score >= 80 ? 'border-green-200 dark:border-green-900/40' : score >= 50 ? 'border-amber-200 dark:border-amber-900/40' : 'border-red-200 dark:border-red-900/40'

  return (
    <div>
      {/* Editor area — textarea overlaid on highlighted mirror */}
      <div className="relative rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--bg)]">
        {/* Highlight mirror (behind textarea) */}
        <div
          ref={mirrorRef}
          className="absolute inset-0 p-4 text-sm leading-relaxed pointer-events-none overflow-hidden whitespace-pre-wrap break-words"
          style={{ color: 'transparent', wordBreak: 'break-word' }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightedHtml || '<span style="color:var(--text-tertiary)">Start typing your cold email here...</span>' }}
        />

        {/* Actual textarea (transparent text, caret visible) */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onScroll={syncScroll}
          placeholder="Start typing your cold email here..."
          className="relative w-full min-h-[240px] p-4 text-sm leading-relaxed resize-y bg-transparent text-[var(--text)] focus:outline-none placeholder:text-[var(--text-tertiary)]"
          style={{ caretColor: 'var(--text)' }}
          spellCheck={false}
        />
      </div>

      {/* Live score bar — shows as soon as there's text */}
      {text.trim() && score !== null && (
        <div className={`mt-6 flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-lg border ${scoreBg} bg-[var(--bg-secondary)]`}>
          {/* Score circle */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" strokeWidth="4" />
                <circle
                  cx="32" cy="32" r="28" fill="none"
                  stroke={score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 175.9} 175.9`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${scoreColor}`}>{score}</span>
              </div>
            </div>
            <div>
              <p className={`text-[15px] font-semibold ${scoreColor}`}>{scoreLabel}</p>
              <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                {matches.length === 0
                  ? 'No spam trigger words detected.'
                  : `${matches.length} trigger word${matches.length > 1 ? 's' : ''} found · ${matches.reduce((s, m) => s + m.count, 0)} total occurrences`}
              </p>
            </div>
          </div>

          {/* Severity breakdown pills */}
          {matches.length > 0 && (
            <div className="flex gap-2 sm:ml-auto">
              {(['high', 'medium', 'low'] as Severity[]).map(sev => {
                const count = matches.filter(m => m.severity === sev).length
                if (count === 0) return null
                return (
                  <span key={sev} className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${sevStyles[sev].badge}`}>
                    {count} {sev}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Matches table — live */}
      {matches.length > 0 && (
        <div className="mt-6 border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
            <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              Flagged words & replacements
            </p>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {matches.map((m, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 px-4 py-3.5 hover:bg-[var(--bg-hover)] transition-colors">
                {/* Word */}
                <div className="sm:w-[28%] flex items-center gap-2.5">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${sevStyles[m.severity].badge} uppercase`}>
                    {m.severity}
                  </span>
                  <span className="text-[14px] font-semibold text-[var(--text)]">
                    "{m.word}"
                  </span>
                  {m.count > 1 && (
                    <span className="text-[11px] text-[var(--text-tertiary)]">×{m.count}</span>
                  )}
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex sm:w-[8%] justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--text-tertiary)]">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Suggestion */}
                <div className="sm:w-[64%]">
                  <span className="text-[13px] text-[var(--success)] font-medium">
                    {m.suggestion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
