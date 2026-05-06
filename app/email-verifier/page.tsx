import type { Metadata } from 'next'
import ToolLayout from '@/components/ToolLayout'
import EmailVerifierTool from './EmailVerifierTool'

export const metadata: Metadata = {
  title: 'Free Bulk Email Verifier — Validate Your Email List',
  description: 'Upload your CSV email list and verify every address against 126,000+ disposable domains, MX records, and syntax checks. Free, no signup required.',
  alternates: { canonical: 'https://cleanmails.online/tools/email-verifier' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Bulk Email Verifier',
  url: 'https://cleanmails.online/tools/email-verifier',
  description: 'Upload your CSV email list and verify every address against 126,000+ disposable domains, MX records, and syntax checks. Free, no signup.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Cleanmails', url: 'https://cleanmails.online' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is this email verifier free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no signup. You can verify up to 2,000 emails per upload. The tool checks syntax, MX records, and disposable domain databases.' } },
    { '@type': 'Question', name: 'How accurate is this free email verifier?', acceptedAnswer: { '@type': 'Answer', text: 'This tool achieves approximately 80% accuracy by checking syntax, MX records, and 126,000+ known disposable domains. For 100% accuracy with full SMTP Port 25 handshake verification, use Cleanmails which includes unlimited validation.' } },
    { '@type': 'Question', name: 'What does the email verifier check?', acceptedAnswer: { '@type': 'Answer', text: 'The tool validates email syntax, checks if the domain has valid MX records (can receive email), detects disposable/temporary email addresses, and identifies role-based accounts like info@ or admin@.' } },
    { '@type': 'Question', name: 'Is my email list data stored or shared?', acceptedAnswer: { '@type': 'Answer', text: 'Your file is parsed in your browser. Individual emails are sent to our verification API for checking, but no data is stored permanently. Results are generated in real-time and discarded after your session.' } },
    { '@type': 'Question', name: 'What is the difference between this and Cleanmails full validation?', acceptedAnswer: { '@type': 'Answer', text: 'This free tool checks syntax, MX records, and disposable domains (80% accuracy). Cleanmails full validation adds SMTP handshake verification (Port 25), catch-all detection, and mailbox existence checks for near-100% accuracy — with no per-email limits.' } },
  ],
}

export default function EmailVerifierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolLayout
        title="Bulk Email Verifier"
        description="Upload a CSV with email addresses. We'll check each one against 126,000+ disposable domains, MX records, and syntax rules."
        ctaMessage="Need 100% accuracy? Cleanmails does full SMTP handshake validation — unlimited, no per-email fees."
        currentSlug="/email-verifier"
        seoContent={<EmailVerifierSEO />}
      >
        <EmailVerifierTool />
      </ToolLayout>
    </>
  )
}

function EmailVerifierSEO() {
  return (
    <>
      <h2>Why You Need to Verify Your Email List</h2>
      <p>
        Sending cold emails to invalid addresses destroys your sender reputation. A bounce rate above 5% signals to Gmail and Outlook that your list is scraped or low-quality — and they'll start routing all your emails to spam, even the ones going to valid addresses.
      </p>
      <p>
        Email verification catches bad addresses before you send. This tool checks your list against multiple validation layers: syntax rules, MX record lookups, and a database of 126,000+ known disposable email domains.
      </p>

      <h2>What This Tool Checks</h2>
      <ul>
        <li><strong>Syntax validation</strong> — catches typos, missing @ symbols, invalid characters, and malformed addresses</li>
        <li><strong>MX record lookup</strong> — verifies the domain actually accepts email (has mail servers configured)</li>
        <li><strong>Disposable domain detection</strong> — flags temporary email services like Guerrilla Mail, Temp Mail, and 126,000+ others</li>
        <li><strong>Role account detection</strong> — identifies generic addresses (info@, admin@, support@) that rarely convert</li>
      </ul>

      <h2>How to Use It</h2>
      <ol>
        <li>Export your lead list as a CSV file from whatever tool you use (Apollo, LinkedIn, scrapers, etc.)</li>
        <li>Upload the file — the tool auto-detects the email column</li>
        <li>Wait for verification to complete (processes 50 emails concurrently)</li>
        <li>Download the cleaned CSV with a status column showing which emails are safe to send</li>
      </ol>

      <h2>Free vs Full Verification</h2>
      <p>
        This free tool achieves approximately 80% accuracy. It catches the obvious problems — invalid syntax, dead domains, and disposable addresses. But it cannot verify whether a specific mailbox actually exists on the server.
      </p>
      <p>
        For that, you need SMTP handshake verification (Port 25). This is what Cleanmails does: it connects directly to the recipient's mail server and asks "does this mailbox exist?" — without actually sending an email. This catches soft bounces, full mailboxes, and disabled accounts that MX-only checks miss.
      </p>
      <p>
        Cleanmails includes unlimited SMTP validation with every license — no per-email fees, no credit systems. Verify millions of addresses at no additional cost.
      </p>

      <h2>Limits</h2>
      <p>
        This free tool processes up to 2,000 emails per upload. For larger lists, split your CSV into batches or use Cleanmails for unlimited bulk validation with higher accuracy.
      </p>

      <h2>Who Should Use This Tool?</h2>
      <p>
        Anyone sending cold email should validate their list first. This tool is especially useful for agencies, SDRs, and marketers who scrape leads from directories, LinkedIn, or purchased lists. Run every new list through verification before importing it into your sending tool — it takes minutes and can save your domain reputation.
      </p>
    </>
  )
}
