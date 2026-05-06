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
      seoContent={<EmailExtractorSEO />}
    >
      <EmailExtractorTool />
    </ToolLayout>
    </>
  )
}

function EmailExtractorSEO() {
  return (
    <>
      <h2>How to Extract Emails from Text</h2>
      <p>
        This tool uses pattern matching to find every valid email address hidden in any block of text. Paste in website copy, scraped content, LinkedIn bios, PDF text, business directories, or any raw document — and get a clean, deduplicated list of email addresses in seconds.
      </p>
      <p>
        The extractor handles emails in all common formats: plain text (john@company.com), angle brackets (&lt;john@company.com&gt;), embedded in sentences, mixed with phone numbers and URLs, or separated by random characters. It catches them all.
      </p>

      <h2>What You Get</h2>
      <ul>
        <li><strong>Deduplicated list</strong> — duplicate emails are automatically removed (case-insensitive matching)</li>
        <li><strong>Domain breakdown</strong> — see which domains appear most frequently in your extracted list</li>
        <li><strong>One-click copy</strong> — copy the entire clean list to your clipboard instantly</li>
        <li><strong>CSV download</strong> — export the list as a CSV file ready for import into any email tool</li>
      </ul>

      <h2>Common Use Cases</h2>
      <h3>Building Prospect Lists</h3>
      <p>
        Scraped a website, directory, or Google Maps listing? Paste the raw text here and extract every email address without manually scanning through paragraphs of content. Works great with output from web scrapers, browser extensions, and copy-pasted web pages.
      </p>

      <h3>Cleaning Up Messy Data</h3>
      <p>
        Got a document, spreadsheet export, or email thread with addresses scattered throughout? This tool pulls them all into one clean list. No more manual copy-pasting individual addresses.
      </p>

      <h3>Processing Bulk Content</h3>
      <p>
        Paste entire web pages, multiple LinkedIn profiles, business card OCR output, or any large text block. The tool handles thousands of lines of text and extracts every valid email address it finds.
      </p>

      <h2>Privacy & Security</h2>
      <p>
        This tool runs entirely in your browser. Your text is never sent to any server — all extraction happens locally using JavaScript. Nothing is stored, logged, or transmitted. Close the tab and it's gone.
      </p>
    </>
  )
}
