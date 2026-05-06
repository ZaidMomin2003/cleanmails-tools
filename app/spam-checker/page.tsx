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
      seoContent={<SpamCheckerSEO />}
    >
      <SpamCheckerTool />
    </ToolLayout>
    </>
  )
}

function SpamCheckerSEO() {
  return (
    <>
      <h2>What Are Spam Trigger Words?</h2>
      <p>
        Spam trigger words are specific phrases that email providers like Gmail, Outlook, and Yahoo use to flag messages as potential spam. When your cold email contains too many of these words, it gets routed to the spam folder instead of the primary inbox — even if your domain reputation is clean.
      </p>
      <p>
        Common spam trigger words include phrases like "act now," "free," "limited time offer," "click here," and "no obligation." These words are associated with unsolicited marketing emails, and spam filters have been trained to detect them across billions of messages.
      </p>

      <h2>How This Spam Checker Works</h2>
      <p>
        This tool scans your email against a database of 500+ known spam trigger words, each categorized by severity:
      </p>
      <ul>
        <li><strong>High severity</strong> — words that almost always trigger spam filters (e.g., "free money," "act now," "guaranteed")</li>
        <li><strong>Medium severity</strong> — words that raise flags when combined with other triggers (e.g., "click here," "no obligation," "special offer")</li>
        <li><strong>Low severity</strong> — words that are fine alone but contribute to a spammy pattern when overused (e.g., "deal," "offer," "discount")</li>
      </ul>
      <p>
        Your score is calculated based on the number and severity of flagged words. A score of 80+ means your email is likely safe. Below 50, you should rewrite before sending.
      </p>

      <h2>Why Cold Emails Get Flagged as Spam</h2>
      <p>
        Spam filters look at more than just individual words. They analyze patterns: how many trigger words appear together, the ratio of links to text, whether the email uses excessive capitalization, and whether the sending domain has proper authentication (SPF, DKIM, DMARC). This tool focuses on the content side — the words you choose — which is the factor you have the most direct control over.
      </p>

      <h3>Tips to Avoid the Spam Folder</h3>
      <ul>
        <li>Write like a human — short, conversational sentences work best</li>
        <li>Avoid ALL CAPS and excessive punctuation (!!!)</li>
        <li>Don't use more than one link per cold email</li>
        <li>Replace salesy language with specific, value-driven statements</li>
        <li>Keep your email under 150 words for initial outreach</li>
        <li>Personalize the first line — generic openers get flagged more often</li>
      </ul>

      <h2>Who Should Use This Tool?</h2>
      <p>
        This spam word checker is built for cold email marketers, SDRs, agency owners, and anyone sending outbound email at scale. Run every email template through this tool before adding it to your sequence. It takes 5 seconds and can be the difference between landing in the inbox or getting buried in spam.
      </p>
    </>
  )
}
