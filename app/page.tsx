import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import PromoPopup from '@/components/PromoPopup'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Cleanmails Free Cold Email Tools',
  url: 'https://cleanmails.online/tools',
  description: 'Free tools for cold email: spam checker, DNS record checker, email extractor, and CSV list cleaner.',
  author: { '@type': 'Organization', name: 'Cleanmails', url: 'https://cleanmails.online' },
}

const tools = [
  {
    slug: '/spam-checker',
    icon: '🛡️',
    name: 'Email Spam Word Checker',
    description: 'Paste your cold email and instantly find spam trigger words that hurt deliverability. Get a score and safer alternatives.',
    tag: 'Deliverability',
  },
  {
    slug: '/dns-checker',
    icon: '🔍',
    name: 'SPF / DKIM / DMARC Checker',
    description: 'Enter any domain and check all three email authentication records in one click. See what\'s configured and what\'s missing.',
    tag: 'DNS',
  },
  {
    slug: '/email-verifier',
    icon: '✅',
    name: 'Bulk Email Verifier',
    description: 'Upload a CSV email list and verify every address against 126,000+ disposable domains, MX records, and syntax rules.',
    tag: 'Validation',
  },
  {
    slug: '/email-extractor',
    icon: '📧',
    name: 'Email Extractor from Text',
    description: 'Paste any text — paragraphs, scraped pages, documents — and extract all email addresses into a clean, deduplicated list.',
    tag: 'List Building',
  },
  {
    slug: '/csv-cleaner',
    icon: '🧹',
    name: 'CSV Email List Cleaner',
    description: 'Upload a messy CSV with multiple emails per row. Get a clean file with one email per row, all other columns preserved.',
    tag: 'List Cleaning',
  },
]

export default function ToolsIndex() {
  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Popup */}
      <PromoPopup />

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

      {/* Hero */}
      <div className="container-wide pt-14 sm:pt-20 pb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight mb-4">
          Free Cold Email Tools
        </h1>
        <p className="text-[15px] sm:text-base text-[var(--text-secondary)] max-w-lg leading-relaxed mb-3">
          No signup. No limits. Just paste, click, and get results.
        </p>
        <p className="text-xs text-[var(--text-tertiary)]">
          Built by <a href="https://cleanmails.online" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] underline underline-offset-2 hover:text-[var(--text)] transition-colors">Cleanmails</a> — the self-hosted cold email platform.
        </p>
      </div>

      <hr className="border-[var(--border)]" />

      {/* Tools grid */}
      <div className="container-wide py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tools.map(tool => (
            <Link key={tool.slug} href={tool.slug} className="group block no-underline">
              <div className="h-full border border-[var(--border)] rounded-lg bg-[var(--card-bg)] hover:bg-[var(--bg-hover)] transition-colors p-7">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-medium text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2 py-0.5 rounded uppercase tracking-wider mb-3">
                      {tool.tag}
                    </span>
                    <h2 className="text-[15px] font-bold text-[var(--text)] mb-2 group-hover:underline group-hover:decoration-[var(--border-strong)] group-hover:underline-offset-2">
                      {tool.name}
                    </h2>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--text-tertiary)] group-hover:text-[var(--text)] transition-colors">
                      Use tool
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] transition-colors">
        <div className="container-wide py-14 sm:py-16">
          <div className="bg-[var(--cta-card-bg)] rounded-xl p-8 sm:p-10 text-center transition-colors">
            <p className="text-[11px] font-semibold text-[#FFD700] uppercase tracking-widest mb-3">Stop paying monthly</p>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--cta-card-text)] leading-snug mb-3 max-w-md mx-auto">
              Own your cold email infrastructure.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-sm mx-auto leading-relaxed">
              Unlimited senders, email validation, cadences, and SMTP — one-time payment of $497.
            </p>
            <a href="https://cleanmails.online" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-6 py-2.5 rounded-lg transition-colors no-underline">
              Get Cleanmails
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
        <div className="border-t border-[var(--border)]">
          <div className="container-wide py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-[12px] text-[var(--text-tertiary)]">© {new Date().getFullYear()} Cleanmails. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://cleanmails.online/privacy.html" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text)] no-underline transition-colors">Privacy</a>
              <a href="https://cleanmails.online/terms.html" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text)] no-underline transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
