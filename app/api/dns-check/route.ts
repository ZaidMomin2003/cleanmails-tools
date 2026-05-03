import { NextRequest, NextResponse } from 'next/server'
import dns from 'dns'
import { promisify } from 'util'

const resolveTxt = promisify(dns.resolveTxt)

async function getTxtRecords(hostname: string): Promise<string[]> {
  try {
    const records = await resolveTxt(hostname)
    return records.map(r => r.join(''))
  } catch {
    return []
  }
}

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain')
  if (!domain || !domain.includes('.')) {
    return NextResponse.json({ error: 'Invalid domain' }, { status: 400 })
  }

  const clean = domain.toLowerCase().replace(/^www\./, '')

  // SPF
  const txtRecords = await getTxtRecords(clean)
  const spfRecord = txtRecords.find(r => r.startsWith('v=spf1'))

  // DMARC
  const dmarcRecords = await getTxtRecords(`_dmarc.${clean}`)
  const dmarcRecord = dmarcRecords.find(r => r.startsWith('v=DMARC1'))

  // DKIM — try common selectors
  const selectors = ['google', 'default', 'selector1', 'selector2', 'k1', 'mandrill', 'amazonses', 'dkim', 'mail']
  let dkimRecord: string | null = null
  let dkimSelector = ''
  for (const sel of selectors) {
    const recs = await getTxtRecords(`${sel}._domainkey.${clean}`)
    const found = recs.find(r => r.includes('v=DKIM1') || r.includes('k=rsa'))
    if (found) {
      dkimRecord = found
      dkimSelector = sel
      break
    }
  }

  const results = [
    {
      type: 'SPF' as const,
      status: spfRecord ? 'found' as const : 'not_found' as const,
      value: spfRecord || undefined,
      details: spfRecord
        ? `SPF record is configured. ${spfRecord.includes('~all') ? 'Using soft fail (~all).' : spfRecord.includes('-all') ? 'Using hard fail (-all) — strict.' : 'Review your SPF policy.'}`
        : 'Add a TXT record with v=spf1 to authorize your sending servers.',
    },
    {
      type: 'DKIM' as const,
      status: dkimRecord ? 'found' as const : 'not_found' as const,
      value: dkimRecord || undefined,
      details: dkimRecord
        ? `DKIM found with selector "${dkimSelector}". Emails from this domain are cryptographically signed.`
        : `No DKIM record found. Checked selectors: ${selectors.join(', ')}. Your email provider should give you a DKIM key to add.`,
    },
    {
      type: 'DMARC' as const,
      status: dmarcRecord ? 'found' as const : 'not_found' as const,
      value: dmarcRecord || undefined,
      details: dmarcRecord
        ? `DMARC is configured. ${dmarcRecord.includes('p=reject') ? 'Policy: reject — strictest enforcement.' : dmarcRecord.includes('p=quarantine') ? 'Policy: quarantine — moderate enforcement.' : 'Policy: none — monitoring only. Consider tightening to quarantine or reject.'}`
        : 'Add a TXT record at _dmarc.yourdomain.com with v=DMARC1; p=none; to start monitoring.',
    },
  ]

  return NextResponse.json({ results })
}
