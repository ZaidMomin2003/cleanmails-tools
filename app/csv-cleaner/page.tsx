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
      seoContent={<CsvCleanerSEO />}
    >
      <CsvCleanerTool />
    </ToolLayout>
    </>
  )
}

function CsvCleanerSEO() {
  return (
    <>
      <h2>Why You Need to Clean Your CSV Email Lists</h2>
      <p>
        If you've ever exported leads from Apollo, Hunter, Google Maps scrapers, or any business directory, you've seen the problem: multiple email addresses crammed into a single cell, separated by commas, semicolons, or random characters. Cold email tools like Instantly, Smartlead, and Lemlist need one email per row to work properly. This tool fixes that.
      </p>

      <h2>What This Tool Does</h2>
      <ul>
        <li><strong>Splits multi-email cells</strong> — if a row has "joe@co.com, sales@co.com, info@co.com" in one cell, it creates three separate rows</li>
        <li><strong>Preserves all other columns</strong> — business name, phone, city, and every other field gets copied to each new row</li>
        <li><strong>Removes exact duplicates</strong> — if splitting creates identical rows, they're automatically deduplicated</li>
        <li><strong>Auto-detects the email column</strong> — no manual configuration needed, works with any column name</li>
      </ul>

      <h2>Supported Formats</h2>
      <p>
        The tool handles emails separated by any common delimiter:
      </p>
      <ul>
        <li>Commas: <strong>joe@co.com, sales@co.com</strong></li>
        <li>Semicolons: <strong>joe@co.com; sales@co.com</strong></li>
        <li>Pipes: <strong>joe@co.com | sales@co.com</strong></li>
        <li>Newlines within cells (common in Excel exports)</li>
        <li>Mixed separators in the same file</li>
      </ul>
      <p>
        It also handles quoted fields, escaped commas, and other CSV edge cases using industry-standard parsing.
      </p>

      <h2>How to Use It</h2>
      <ol>
        <li>Export your leads as a CSV from whatever tool you're using</li>
        <li>Drag and drop the file onto this page (or click to browse)</li>
        <li>The tool auto-detects the email column and processes everything instantly</li>
        <li>Review the preview table to confirm it looks right</li>
        <li>Download your cleaned CSV — ready to import into your cold email platform</li>
      </ol>

      <h2>Privacy & Security</h2>
      <p>
        Your CSV file never leaves your browser. All parsing and cleaning happens locally using JavaScript. No data is uploaded to any server, no files are stored, and nothing is logged. This is important when you're working with prospect data that may contain personal information.
      </p>

      <h2>File Size & Limits</h2>
      <p>
        The tool handles CSV files up to 50MB, which covers most lead lists (typically 100,000+ rows). Processing happens in real-time — most files complete in under 2 seconds. For extremely large files, processing time scales linearly with row count.
      </p>
    </>
  )
}
