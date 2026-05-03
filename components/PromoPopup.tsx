'use client'

import { useState, useEffect } from 'react'

export default function PromoPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('promo-dismissed')) return

    const timer = setTimeout(() => {
      setShow(true)
    }, 45000) // 45 seconds

    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem('promo-dismissed', '1')
  }

  if (!show || dismissed) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={close}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-[420px] bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease]"
        >
          {/* Gold accent bar */}
          <div className="h-1 bg-[#FFD700]" />

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-tertiary)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Icon */}
            <div className="w-12 h-12 bg-[#37352f] dark:bg-[#e8e8e6] rounded-xl flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="3" className="stroke-[#FFD700] dark:stroke-[#37352f]" strokeWidth="2"/>
                <path d="M2 8l10 6 10-6" className="stroke-[#FFD700] dark:stroke-[#37352f]" strokeWidth="2"/>
              </svg>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-xl sm:text-[22px] font-bold text-[var(--text)] leading-snug tracking-tight mb-2">
              Tired of paying monthly for cold email?
            </h2>

            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-5">
              Cleanmails is a self-hosted cold email platform with inbuilt SMTP, email validation, sender rotation, and cadences — for a <strong className="text-[var(--text)]">one-time payment</strong>.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Inbuilt SMTP', 'Email Validation', 'Sender Rotation', 'Unlimited Mailboxes', 'Guaranteed Inbox Placement'].map(f => (
                <span
                  key={f}
                  className="text-[11px] font-medium text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded-md"
                >
                  ✓ {f}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href="https://cleanmails.online"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-5 py-3 rounded-lg transition-colors no-underline"
              >
                Check it out
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <button
                onClick={close}
                className="flex-1 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text)] border border-[var(--border)] hover:bg-[var(--bg-hover)] px-5 py-3 rounded-lg transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>

            {/* Trust line */}
            <p className="text-[11px] text-[var(--text-tertiary)] text-center mt-4">
              30-day money-back guarantee · Free installation · Lifetime updates
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
