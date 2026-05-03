import type { Metadata } from 'next'
import ToolLayout from '@/components/ToolLayout'
import SpamCheckerTool from './SpamCheckerTool'

export const metadata: Metadata = {
  title: 'Free Email Spam Word Checker',
  description: 'Paste your cold email and instantly find spam trigger words. Get a deliverability score and safer alternatives for every flagged word.',
  alternates: { canonical: 'https://cleanmails.online/tools/spam-checker' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Email Spam Word Checker',
  url: 'https://cleanmails.online/tools/spam-checker',
  description: 'Paste your cold email and instantly find spam trigger words. Get a deliverability score and safer alternatives for every flagged word.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Cleanmails', url: 'https://cleanmails.online' },
}

export default function SpamCheckerPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <ToolLayout
      title="Email Spam Word Checker"
      description="Paste your cold email draft below. We'll scan it for spam trigger words and score your email's deliverability risk."
      ctaMessage="Cleanmails checks every email for spam words before sending — automatically."
      currentSlug="/spam-checker"
    >
      <SpamCheckerTool />
    </ToolLayout>
    </>
  )
}
