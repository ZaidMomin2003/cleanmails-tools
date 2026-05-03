import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const tools = [
  { slug: '/spam-checker', name: 'Spam Checker', icon: '🛡️' },
  { slug: '/dns-checker', name: 'DNS Checker', icon: '🔍' },
  { slug: '/email-extractor', name: 'Email Extractor', icon: '📧' },
  { slug: '/csv-cleaner', name: 'CSV Cleaner', icon: '🧹' },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]">
        <div className="container-wide flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 bg-[#37352f] dark:bg-[#e8e8e6] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="3" className="stroke-[#FFD700] dark:stroke-[#37352f]" strokeWidth="2.5"/>
                <path d="M2 9l10 6 10-6" className="stroke-[#FFD700] dark:stroke-[#37352f]" strokeWidth="2.5"/>
              </svg>
            </div>
            <div>
              <span className="text-[14px] font-semibold text-[var(--text)]">Cleanmails</span>
              <span className="text-[14px] text-[var(--text-tertiary)] ml-1.5">/</span>
              <span className="text-[14px] text-[var(--text-tertiary)] ml-1.5">Tools</span>
            </div>
          </Link>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a href="https://cleanmails.online" target="_blank" rel="noopener noreferrer"
              className="text-[12px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-3.5 py-1.5 rounded-md transition-colors no-underline">
              Get Cleanmails
            </a>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-5">
        <div className="text-center max-w-md py-20">
          {/* Animated envelope icon */}
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="opacity-40">
              <rect x="2" y="4" width="20" height="16" rx="3" stroke="var(--text)" strokeWidth="1.5"/>
              <path d="M2 9l10 6 10-6" stroke="var(--text)" strokeWidth="1.5"/>
              <line x1="15" y1="4" x2="20" y2="1" stroke="var(--danger)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="18" y1="5" x2="22" y2="3" stroke="var(--danger)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-widest mb-4">
            Page not found
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tight leading-tight mb-4">
            404
          </h1>

          <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-sm mx-auto">
            This page bounced. It either doesn&apos;t exist or was moved somewhere else.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--text)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] border border-[var(--border)] px-6 py-2.5 rounded-lg transition-colors no-underline"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to all tools
            </Link>
            <a
              href="https://cleanmails.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-6 py-2.5 rounded-lg transition-colors no-underline"
            >
              Get Cleanmails
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] transition-colors">
        {/* Tool links */}
        <div className="container-wide pt-14 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              Maybe you were looking for
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tools.map(t => (
              <Link
                key={t.slug}
                href={t.slug}
                className="flex items-center gap-2.5 p-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--bg-hover)] transition-colors no-underline"
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-[13px] font-medium text-[var(--text)]">{t.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)]">
          <div className="container-wide py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[12px] text-[var(--text-tertiary)]">© {new Date().getFullYear()} Cleanmails. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="https://cleanmails.online/privacy.html" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text)] no-underline transition-colors">Privacy</a>
              <a href="https://cleanmails.online/terms.html" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text)] no-underline transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
