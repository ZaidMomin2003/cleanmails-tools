import type { Metadata } from 'next'
import ToolLayout from '@/components/ToolLayout'
import EmailExtractorTool from './EmailExtractorTool'

export const metadata: Metadata = {
  title: 'Free Email Extractor from Text',
  description: 'Paste any text and instantly extract all email addresses into a clean, deduplicated list. Copy or download as CSV.',
  alternates: { canonical: 'https://cleanmails.online/tools/email-extractor' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Email Extractor from Text',
  url: 'https://cleanmails.online/tools/email-extractor',
  description: 'Paste any text and instantly extract all email addresses into a clean, deduplicated list. Copy or download as CSV.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Cleanmails', url: 'https://cleanmails.online' },
}

export default function EmailExtractorPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <ToolLayout
      title="Email Extractor from Text"
      description="Paste any text — paragraphs, scraped pages, documents, LinkedIn bios — and we'll pull out every email address."
      ctaMessage="Got your list? Validate every email with Cleanmails — built-in, no per-lead fees."
      currentSlug="/email-extractor"
    >
      <EmailExtractorTool />
    </ToolLayout>
    </>
  )
}
