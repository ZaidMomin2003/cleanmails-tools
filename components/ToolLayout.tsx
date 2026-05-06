import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import CTA from './CTA'
import PromoPopup from './PromoPopup'

const tools = [
  { slug: '/spam-checker', name: 'Spam Checker', icon: '🛡️' },
  { slug: '/dns-checker', name: 'DNS Checker', icon: '🔍' },
  { slug: '/email-extractor', name: 'Email Extractor', icon: '📧' },
  { slug: '/csv-cleaner', name: 'CSV Cleaner', icon: '🧹' },
]

const relatedArticles: Record<string, { title: string; href: string }[]> = {
  '/spam-checker': [
    { title: 'Cold Email Deliverability Guide', href: 'https://cleanmails.online/blog/cold-email-deliverability-guide' },
    { title: 'Why Your Cold Emails Land in Spam', href: 'https://cleanmails.online/blog/why-your-cold-emails-are-landing-in-spam-email-authentication' },
    { title: 'Best Cold Email Tools for Agencies 2026', href: 'https://cleanmails.online/blog/best-cold-email-tools-2026' },
  ],
  '/dns-checker': [
    { title: 'Cold Email Deliverability Guide', href: 'https://cleanmails.online/blog/cold-email-deliverability-guide' },
    { title: 'Why Your Cold Emails Land in Spam', href: 'https://cleanmails.online/blog/why-your-cold-emails-are-landing-in-spam-email-authentication' },
    { title: 'How to Warm Up a New Cold Email Domain', href: 'https://cleanmails.online/blog/how-to-warm-up-a-new-cold-email-domain' },
  ],
  '/email-extractor': [
    { title: 'Automate Cold Email Outreach Without Subscriptions', href: 'https://cleanmails.online/blog/automate-cold-email-outreach-without-monthly-subscriptions' },
    { title: 'Scaling Cold Email Without Monthly Fees', href: 'https://cleanmails.online/blog/scaling-cold-email-without-monthly-fees' },
    { title: 'Best Cold Email Tools for Agencies 2026', href: 'https://cleanmails.online/blog/best-cold-email-tools-2026' },
  ],
  '/csv-cleaner': [
    { title: 'Cold Email Deliverability Guide', href: 'https://cleanmails.online/blog/cold-email-deliverability-guide' },
    { title: 'Optimizing Sender Rotation for High Volume', href: 'https://cleanmails.online/blog/optimizing-cold-email-sender-rotation-for-high-volume-outreach' },
    { title: 'High Volume Cold Email Infrastructure', href: 'https://cleanmails.online/blog/high-volume-cold-email-infrastructure-no-monthly-fees' },
  ],
}

export default function ToolLayout({
  children,
  title,
  description,
  ctaMessage,
  currentSlug,
  seoContent,
}: {
  children: React.ReactNode
  title: string
  description: string
  ctaMessage?: string
  currentSlug: string
  seoContent?: React.ReactNode
}) {
  const otherTools = tools.filter(t => t.slug !== currentSlug)

  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors">
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
            <Link href="/" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] no-underline transition-colors hidden sm:inline">
              All tools
            </Link>
            <ThemeToggle />
            <a href="https://cleanmails.online" target="_blank" rel="noopener noreferrer"
              className="text-[12px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-3.5 py-1.5 rounded-md transition-colors no-underline">
              Get Cleanmails
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container pt-10 sm:pt-14 pb-8">
        <Link href="/" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] no-underline transition-colors mb-6 inline-block">
          ← All tools
        </Link>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight leading-tight mb-3">
          {title}
        </h1>
        <p className="text-[15px] text-[var(--text-secondary)] max-w-lg leading-relaxed">
          {description}
        </p>
      </div>

      <hr className="border-[var(--border)] mx-auto" style={{ maxWidth: '720px' }} />

      {/* Tool content */}
      <div className="container py-10 sm:py-12">
        {children}

        {/* SEO content section */}
        {seoContent && (
          <div className="mt-16 prose-section">
            {seoContent}
          </div>
        )}

        {/* Related blog articles */}
        {relatedArticles[currentSlug] && (
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">Related articles</p>
            <div className="flex flex-col gap-2">
              {relatedArticles[currentSlug].map(article => (
                <a
                  key={article.href}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text)] no-underline transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {article.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CTA with breathing room */}
        <div className="mt-16">
          <CTA message={ctaMessage} />
        </div>
      </div>

      {/* Other tools */}
      <div className="border-t border-[var(--border)]">
        <div className="container py-12 sm:py-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">More free tools</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherTools.map(t => (
              <Link key={t.slug} href={t.slug}
                className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--bg-hover)] transition-colors no-underline">
                <span className="text-xl">{t.icon}</span>
                <span className="text-[13px] font-medium text-[var(--text)]">{t.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
