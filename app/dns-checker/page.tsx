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
      seoContent={<DnsCheckerSEO />}
    >
      <DnsCheckerTool />
    </ToolLayout>
    </>
  )
}

function DnsCheckerSEO() {
  return (
    <>
      <h2>What Are SPF, DKIM, and DMARC?</h2>
      <p>
        SPF, DKIM, and DMARC are three DNS-based email authentication protocols that prove your emails are legitimate. Without them, inbox providers like Gmail and Outlook have no way to verify that an email claiming to be from your domain was actually sent by you — and they'll treat it as suspicious.
      </p>
      <ul>
        <li><strong>SPF (Sender Policy Framework)</strong> — a DNS TXT record that lists which mail servers are authorized to send email on behalf of your domain. If an email comes from a server not in your SPF record, it fails authentication.</li>
        <li><strong>DKIM (DomainKeys Identified Mail)</strong> — adds a cryptographic signature to every outgoing email. The receiving server checks this signature against a public key in your DNS to verify the message wasn't tampered with in transit.</li>
        <li><strong>DMARC (Domain-based Message Authentication, Reporting & Conformance)</strong> — tells inbox providers what to do when an email fails SPF or DKIM checks: accept it, quarantine it, or reject it outright. It also enables reporting so you can monitor authentication failures.</li>
      </ul>

      <h2>Why Email Authentication Matters for Cold Email</h2>
      <p>
        If you're sending cold emails without proper SPF, DKIM, and DMARC records, you're almost certainly landing in spam. Google and Microsoft now require all three for bulk senders, and even low-volume senders see significantly better inbox placement when all records are properly configured.
      </p>
      <p>
        Beyond deliverability, these records protect your domain from being spoofed. Without DMARC enforcement, anyone can send emails pretending to be from your domain — damaging your reputation and potentially getting your domain blacklisted.
      </p>

      <h2>How This Tool Works</h2>
      <p>
        Enter any domain and this tool performs real-time DNS lookups to check all three records:
      </p>
      <ul>
        <li>Looks for a TXT record starting with <strong>v=spf1</strong> on your root domain</li>
        <li>Checks common DKIM selectors (google, default, selector1, selector2, and others) for a valid DKIM public key</li>
        <li>Queries <strong>_dmarc.yourdomain.com</strong> for a DMARC policy record</li>
      </ul>
      <p>
        You get an overall grade (A through F) based on how many records are properly configured, plus specific details about what each record contains and what might need fixing.
      </p>

      <h3>Common Issues This Tool Detects</h3>
      <ul>
        <li>Missing SPF record entirely — emails will fail authentication at most providers</li>
        <li>SPF record with too many DNS lookups (limit is 10)</li>
        <li>DMARC policy set to "none" — monitoring only, not enforcing</li>
        <li>Missing DKIM record — emails can't be cryptographically verified</li>
        <li>Multiple SPF records on the same domain (invalid per RFC)</li>
      </ul>

      <h2>Who Should Use This Tool?</h2>
      <p>
        Anyone sending email from a custom domain should check their authentication records regularly. This is especially critical for cold email senders, email marketers, SaaS companies, and agencies managing multiple client domains. Run this check after any DNS change, new email provider setup, or if you notice a sudden drop in deliverability.
      </p>
    </>
  )
}
