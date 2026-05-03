import type { Metadata } from 'next'
import ToolLayout from '@/components/ToolLayout'
import DnsCheckerTool from './DnsCheckerTool'

export const metadata: Metadata = {
  title: 'Free SPF, DKIM & DMARC Record Checker',
  description: 'Check your domain\'s SPF, DKIM, and DMARC email authentication records in one click. See what\'s configured and what needs fixing.',
  alternates: { canonical: 'https://cleanmails.online/tools/dns-checker' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SPF, DKIM & DMARC Record Checker',
  url: 'https://cleanmails.online/tools/dns-checker',
  description: 'Check your domain\'s SPF, DKIM, and DMARC email authentication records in one click. See what\'s configured and what needs fixing.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Cleanmails', url: 'https://cleanmails.online' },
}

export default function DnsCheckerPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <ToolLayout
      title="SPF / DKIM / DMARC Checker"
      description="Enter a domain to check all three email authentication records at once. See what's configured, what's missing, and how to fix it."
      ctaMessage="Cleanmails auto-configures SPF, DKIM, and DMARC during installation."
      currentSlug="/dns-checker"
    >
      <DnsCheckerTool />
    </ToolLayout>
    </>
  )
}
