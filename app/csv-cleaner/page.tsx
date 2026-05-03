import type { Metadata } from 'next'
import ToolLayout from '@/components/ToolLayout'
import CsvCleanerTool from './CsvCleanerTool'

export const metadata: Metadata = {
  title: 'Free CSV Email List Cleaner',
  description: 'Upload a messy CSV with multiple emails per row. Get a clean file with one email per row, all other columns preserved. Free, no signup.',
  alternates: { canonical: 'https://cleanmails.online/tools/csv-cleaner' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CSV Email List Cleaner',
  url: 'https://cleanmails.online/tools/csv-cleaner',
  description: 'Upload a messy CSV with multiple emails per row. Get a clean file with one email per row, all other columns preserved. Free, no signup.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Cleanmails', url: 'https://cleanmails.online' },
}

export default function CsvCleanerPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <ToolLayout
      title="CSV Email List Cleaner"
      description="Upload a CSV where some rows have multiple emails crammed into one cell. We'll split them into separate rows and keep all your other data intact."
      ctaMessage="List cleaned? Now verify every mailbox exists. Cleanmails does full SMTP validation."
      currentSlug="/csv-cleaner"
    >
      <CsvCleanerTool />
    </ToolLayout>
    </>
  )
}
