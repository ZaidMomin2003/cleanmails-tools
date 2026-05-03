# Cleanmails Tools — Project Reference

This file contains all design, brand, technical, and tool specification context needed to build the free tools site at `cleanmails.online/tools`.

---

## Project Overview

- **What:** A standalone Next.js site hosting 4 free cold email tools for Cleanmails
- **URL:** `cleanmails.online/tools` (served via reverse proxy from main site's `vercel.json`)
- **Hosted:** Separate Vercel project, separate GitHub repo
- **Purpose:** Drive organic traffic via SEO, capture cold email users, funnel them to the paid Cleanmails product
- **Main site:** `cleanmails.online` (vanilla HTML/CSS/JS, hosted on Vercel)
- **Blog site:** `cleanmails.online/blog` (separate Next.js project, already built)

---

## Reverse Proxy Setup

Same approach as the blog. The tools site lives at its own Vercel deployment but is accessible at `cleanmails.online/tools` via a rewrite rule added to the main site's `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/tools/:path*", "destination": "https://cleanmails-tools.vercel.app/:path*" }
  ]
}
```

Users always see `cleanmails.online/tools/...` in their browser. Fully independent from the main site and the blog.

---

## Design System (Notion-Themed — matches the blog)

The tools site uses the exact same design system as the Cleanmails blog for visual consistency.

### Color Palette — Light Theme (default)

| CSS Variable | Value | Usage |
|---|---|---|
| `--bg` | `#ffffff` | Page background |
| `--bg-secondary` | `#f7f7f5` | Secondary backgrounds, tool input areas |
| `--bg-hover` | `#f1f1ef` | Hover states |
| `--text` | `#37352f` | Primary text |
| `--text-secondary` | `#787774` | Secondary text, descriptions |
| `--text-tertiary` | `#9b9a97` | Tertiary text, labels |
| `--border` | `#e9e9e7` | Borders, dividers |
| `--border-strong` | `#d3d1cb` | Stronger borders, active states |
| `--gold` | `#FFD700` | CTA buttons, accents, highlights |
| `--code-bg` | `#f7f6f3` | Inline code background |
| `--code-text` | `#eb5757` | Inline code text |
| `--pre-bg` | `#191919` | Code block background |
| `--card-bg` | `#ffffff` | Card backgrounds |
| `--nav-bg` | `rgba(255, 255, 255, 0.92)` | Sticky nav background |
| `--tag-bg` | `#f1f1ef` | Tag/badge backgrounds |
| `--cta-card-bg` | `#37352f` | CTA card dark background |
| `--cta-card-text` | `#ffffff` | CTA card text |

### Color Palette — Dark Theme

| CSS Variable | Value |
|---|---|
| `--bg` | `#191919` |
| `--bg-secondary` | `#202020` |
| `--bg-hover` | `#2a2a2a` |
| `--text` | `#e8e8e6` |
| `--text-secondary` | `#9b9a97` |
| `--text-tertiary` | `#6b6b6b` |
| `--border` | `#2e2e2e` |
| `--border-strong` | `#3a3a3a` |
| `--gold` | `#FFD700` |
| `--code-bg` | `#252525` |
| `--code-text` | `#ff6b6b` |
| `--pre-bg` | `#0d0d0d` |
| `--card-bg` | `#202020` |
| `--nav-bg` | `rgba(25, 25, 25, 0.92)` |
| `--tag-bg` | `#2a2a2a` |
| `--cta-card-bg` | `#252525` |
| `--cta-card-text` | `#e8e8e6` |

### Typography

| Element | Font | Weight | Size | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Body text | Inter | 400-500 | 1rem (16px) | normal | 1.6 |
| UI labels | Inter | 500-600 | 13px-14px | normal | 1.4 |
| Page titles | Lora (serif) | 700 | clamp(1.75rem, 4vw, 2.5rem) | -0.02em to -0.03em | 1.2-1.3 |
| Section headings | Lora (serif) | 700 | 1.4rem | -0.02em | 1.3 |
| Tool names | Lora (serif) | 700 | 1.1rem-1.5rem | -0.02em | 1.3 |
| Tags/badges | Inter | 500-600 | 10px-11px | 0.06em (uppercase) | 1 |
| Buttons | Inter | 600 | 12px-13px | normal | 1 |
| Nav text | Inter | 500-600 | 13px-14px | normal | 1 |

**Font loading:** Use `next/font/google` for both Inter and Lora with CSS variables `--font-inter` and `--font-lora`.

### UI Patterns

- **Sticky nav:** `h-14`, `bg-[var(--nav-bg)]`, `backdrop-blur-md`, `border-b border-[var(--border)]`
- **Logo:** Cleanmails icon (dark square with gold envelope) + "Cleanmails / Tools" breadcrumb text
- **Containers:** `max-width: 720px` for tool content, `max-width: 960px` for wider layouts
- **Cards/panels:** `border border-[var(--border)]`, `rounded-lg`, `bg-[var(--card-bg)]`
- **Hover states:** `hover:bg-[var(--bg-hover)]`, `transition-colors`
- **Buttons (primary):** `bg-[#FFD700]`, `text-[#37352f]`, `font-semibold`, `rounded-md`, `hover:bg-[#f0cc00]`
- **Buttons (secondary):** `border border-[var(--border)]`, `text-[var(--text-secondary)]`, `hover:bg-[var(--bg-hover)]`
- **Tags:** `text-[10px]`, `font-medium`, `bg-[var(--tag-bg)]`, `rounded`, `uppercase`, `tracking-wider`
- **Dividers:** `border-[var(--border)]` or `h-px bg-[var(--border)]`
- **Dark mode toggle:** Sun/moon icon button in the nav, uses `class` strategy on `<html>`, persisted in localStorage, respects system preference on first visit
- **No neumorphism.** Clean, flat, Notion-style. Subtle borders and hover states only.

### Responsive Breakpoints

- Mobile: `< 640px` — single column, `padding: 0 16px`
- Tablet: `640px-1024px` — 2 columns where applicable
- Desktop: `> 1024px` — full layout

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Same as blog, Vercel-native, SSR/SSG |
| Styling | **Tailwind CSS** | Same as blog, utility-first |
| Language | **TypeScript** | Type safety |
| CSV parsing | **PapaParse** (client-side) | Industry standard, handles edge cases |
| DNS lookups | **Vercel API route** using Node.js `dns` module | For SPF/DKIM/DMARC checker |
| Fonts | **Inter + Lora** via `next/font/google` | Matches blog |
| Deployment | **Vercel** | Auto-deploy on GitHub push |
| Analytics | **Google Analytics** `G-QWXBBLS661` | Same as main site and blog |

---

## File/Folder Structure

```
cleanmails-tools/
├── app/
│   ├── layout.tsx                      # Root layout (fonts, metadata, theme script, GA)
│   ├── page.tsx                        # Tools index — lists all 4 tools
│   ├── globals.css                     # Tailwind + CSS variables (light/dark)
│   ├── icon.svg                        # Favicon
│   ├── apple-icon.svg                  # Apple touch icon
│   ├── sitemap.ts                      # Auto-generated sitemap
│   ├── spam-checker/
│   │   └── page.tsx                    # Tool 1: Email Spam Word Checker
│   ├── dns-checker/
│   │   └── page.tsx                    # Tool 2: SPF/DKIM/DMARC Checker
│   ├── email-extractor/
│   │   └── page.tsx                    # Tool 3: Email Extractor from Text
│   ├── csv-cleaner/
│   │   └── page.tsx                    # Tool 4: CSV Email List Cleaner
│   └── api/
│       └── dns-check/
│           └── route.ts                # API route for DNS lookups (Tool 2)
├── components/
│   ├── ThemeToggle.tsx                 # Dark/light mode toggle (client component)
│   ├── CTA.tsx                         # Cleanmails CTA block (reused on every tool page)
│   ├── ToolCard.tsx                    # Card component for tools index page
│   └── Nav.tsx                         # Sticky nav (if extracted as shared component)
├── lib/
│   ├── spam-words.ts                   # Database of 500+ spam trigger words with severity
│   └── disposable-domains.ts           # List of known disposable email domains (for future validator tool)
├── public/
│   └── logo.svg                        # Cleanmails logo
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── package.json
└── .gitignore
```

---

## Route Structure

| Route | Page | Description |
|---|---|---|
| `/` | Tools index | Lists all 4 tools with descriptions |
| `/spam-checker` | Tool 1 | Email Spam Word Checker |
| `/dns-checker` | Tool 2 | SPF/DKIM/DMARC Record Checker |
| `/email-extractor` | Tool 3 | Email Extractor from Text |
| `/csv-cleaner` | Tool 4 | CSV Email List Cleaner |

---

## Tool 1: Email Spam Word Checker

### Purpose
User pastes their cold email draft and the tool instantly highlights every spam trigger word, gives a score out of 100, and suggests safer alternatives.

### Target Keywords
- "spam word checker" — 8,000-12,000/month
- "email spam checker" — 5,000-8,000/month
- "spam trigger words" — 3,000-5,000/month
- "cold email spam test" — 2,000-3,000/month
- "is my email spammy" — 1,000-2,000/month
- **Combined: 15,000-25,000/month**

### How It Works
1. User pastes email text into a textarea
2. Client-side JavaScript scans the text against a database of 500+ spam trigger words
3. Each word has a severity score (low/medium/high)
4. Tool highlights flagged words inline with color coding:
   - Red highlight = high severity (e.g. "free", "act now", "limited time")
   - Orange highlight = medium severity (e.g. "click here", "no obligation")
   - Yellow highlight = low severity (e.g. "deal", "offer")
5. Shows an overall score 0-100 (100 = clean, 0 = very spammy)
6. Lists all flagged words with suggested replacements
7. Shows a breakdown: X high severity, Y medium, Z low

### Technical Details
- **100% client-side** — no API calls, no backend
- Spam word database stored in `lib/spam-words.ts` as a typed array
- Each entry: `{ word: string, severity: 'high' | 'medium' | 'low', suggestion: string }`
- Regex matching with word boundary detection to avoid false positives
- Score formula: `100 - (highCount * 10 + mediumCount * 5 + lowCount * 2)`, clamped to 0-100

### UI Layout
- Large textarea (full width, min-height 200px) with placeholder text showing a sample email
- "Check for Spam Words" button (gold, primary style)
- Results panel below:
  - Score badge (large number, color-coded green/yellow/red)
  - The original text with highlighted spam words (inline, clickable to see suggestion)
  - Table of flagged words with severity and suggested replacement
- CTA at bottom: "Cleanmails has built-in spam detection that checks before every send."

### Running Cost
$0 — pure client-side

---

## Tool 2: SPF, DKIM & DMARC Record Checker

### Purpose
User enters a domain and the tool checks all three email authentication DNS records in one shot, showing what's configured, what's missing, and what needs fixing.

### Target Keywords
- "SPF record checker" — 10,000-15,000/month
- "DKIM checker" — 5,000-8,000/month
- "DMARC lookup" — 5,000-8,000/month
- "email authentication checker" — 2,000-3,000/month
- "check SPF record" — 2,000-3,000/month
- **Combined: 20,000-35,000/month**

### How It Works
1. User enters a domain name (e.g. `example.com`)
2. Frontend sends request to `/api/dns-check?domain=example.com`
3. API route performs DNS TXT record lookups:
   - SPF: looks for TXT record starting with `v=spf1`
   - DKIM: looks for TXT record at `google._domainkey.{domain}` (and common selectors like `default`, `selector1`, `selector2`)
   - DMARC: looks for TXT record at `_dmarc.{domain}`
4. For each record, returns:
   - Status: Found / Not Found / Invalid
   - The raw record value
   - Analysis (e.g. SPF: "includes Google, allows SES, soft fail policy")
   - Issues/warnings (e.g. "DMARC policy is `none` — not enforcing")
   - Recommendations
5. Overall grade: A (all good) / B (minor issues) / C (missing records) / F (nothing configured)

### Technical Details
- **API route** at `app/api/dns-check/route.ts`
- Uses Node.js built-in `dns.promises.resolveTxt()` — no external APIs needed
- DKIM selector detection: tries common selectors (`google`, `default`, `selector1`, `selector2`, `k1`, `mandrill`, `amazonses`)
- Rate limiting: basic IP-based throttle (10 requests/minute) to prevent abuse
- Input validation: strip protocol, www, trailing slashes from domain input

### UI Layout
- Domain input field with placeholder "Enter domain (e.g. example.com)"
- "Check Records" button (gold, primary)
- Results panel with 3 sections (SPF, DKIM, DMARC), each showing:
  - Status icon (green check / red X / yellow warning)
  - Record name and raw value (in a code block)
  - Analysis text explaining what the record does
  - Issues/recommendations if any
- Overall grade badge at the top of results
- CTA: "Cleanmails auto-configures SPF, DKIM, and DMARC during installation."

### Running Cost
$0 — uses Node.js DNS module, no external API

---

## Tool 3: Email Extractor from Text

### Purpose
User pastes any raw text (paragraphs, website copy, scraped content, LinkedIn bios, documents) and the tool instantly extracts all email addresses into a clean, deduplicated list.

### Target Keywords
- "email extractor from text" — 8,000-12,000/month
- "extract emails from text" — 6,000-10,000/month
- "email address extractor" — 5,000-8,000/month
- "email finder from text" — 3,000-5,000/month
- "bulk email extractor" — 2,000-4,000/month
- **Combined: 25,000-40,000/month**

### How It Works
1. User pastes any text into a large textarea
2. Client-side regex extracts all email addresses from the text
3. Results show:
   - Total emails found
   - Duplicates removed
   - Unique count
   - Clean list — one email per line
   - Domain breakdown (e.g. "42 gmail.com, 18 company.com, 7 yahoo.com")
4. Actions:
   - Copy all (one click, copies the clean list to clipboard)
   - Download as CSV (one email per row)
   - Download as TXT

### Technical Details
- **100% client-side** — no API calls
- Email regex: `/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g`
- Deduplication: case-insensitive Set
- Domain extraction: split on `@`, group and count
- Handles emails wrapped in angle brackets (`<john@example.com>`), quoted strings, mixed with random text
- No file upload — text input only (CSV upload is Tool 4)

### UI Layout
- Large textarea (full width, min-height 250px) with placeholder showing sample messy text
- "Extract Emails" button (gold, primary)
- Results panel:
  - Stats row: "Found 47 emails · 5 duplicates removed · 42 unique"
  - Clean email list in a scrollable container (monospace font, one per line)
  - Domain breakdown as a small table or horizontal bar chart
  - Action buttons: Copy All, Download CSV, Download TXT
- CTA: "Got your list? Now validate it. Cleanmails includes free email validation with every license."

### Running Cost
$0 — pure client-side

---

## Tool 4: CSV Email List Cleaner

### Purpose
User uploads a messy CSV file (from scraping tools like Apollo, Hunter, Google Maps scrapers) where businesses have multiple emails crammed into a single cell. The tool splits them into separate rows, preserving all other columns, deduplicates, and exports a clean CSV ready for import into any cold email tool.

### Target Keywords
- "email list cleaner tool" — 3,000-5,000/month
- "clean CSV email list" — 2,000-4,000/month
- "email list cleaning tool free" — 3,000-5,000/month
- "clean email list for cold email" — 2,000-3,000/month
- "CSV email formatter" — 1,000-2,000/month
- "split multiple emails CSV" — 1,000-2,000/month
- **Combined: 12,000-21,000/month**

### How It Works
1. User uploads a CSV file (drag & drop or file picker)
2. Tool parses the CSV using PapaParse (client-side)
3. Auto-detects the email column by:
   - Scanning headers for "email", "e-mail", "mail", "contact"
   - If no header match, scanning cell content for `@` symbols
4. For each row, checks if the email cell contains multiple emails (separated by commas, semicolons, spaces, pipes, or newlines)
5. If multiple emails found in one cell:
   - Creates a separate row for each email
   - Copies all other column values (business name, phone, city, etc.) to each new row
6. Deduplicates exact duplicate rows
7. Shows before/after comparison:
   - "Input: 150 rows → Output: 312 rows (162 emails were split)"
   - "12 duplicate rows removed"
8. Preview table showing first 20 rows of cleaned output
9. Download cleaned CSV

### Example

**Input CSV:**
```csv
Business Name, Email, Phone, City
"Joe's Pizza", "joe@joespizza.com, orders@joespizza.com, info@joespizza.com", "555-1234", "New York"
"Smith Agency", "john@smith.co; sarah@smith.co", "555-5678", "LA"
"TechCorp", "hello@techcorp.com", "555-9999", "Austin"
```

**Output CSV:**
```csv
Business Name, Email, Phone, City
"Joe's Pizza", "joe@joespizza.com", "555-1234", "New York"
"Joe's Pizza", "orders@joespizza.com", "555-1234", "New York"
"Joe's Pizza", "info@joespizza.com", "555-1234", "New York"
"Smith Agency", "john@smith.co", "555-5678", "LA"
"Smith Agency", "sarah@smith.co", "555-5678", "LA"
"TechCorp", "hello@techcorp.com", "555-9999", "Austin"
```

### Technical Details
- **100% client-side** — no file upload to any server, all processing in the browser
- Uses **PapaParse** for CSV parsing (handles quoted fields, escaped commas, different delimiters)
- Email column detection: regex scan for `@` in cell values, header name matching
- Multi-email splitting: split on `,`, `;`, `|`, `\n`, and multiple spaces
- Each split email is trimmed and validated with basic email regex before creating a new row
- Deduplication: hash each row's values, remove exact duplicates
- File size limit: ~50MB (browser memory constraint), show warning for larger files
- Preserves original column order and header names

### UI Layout
- Drag & drop zone with file picker fallback ("Drop your CSV here or click to browse")
- Shows file name and size after upload
- Auto-processing indicator (spinner while parsing)
- Results panel:
  - Stats: input rows, output rows, emails split, duplicates removed
  - Column mapping display: "Detected email column: Email (column 2)"
  - Preview table (first 20 rows, scrollable horizontally for many columns)
  - "Download Cleaned CSV" button (gold, primary, prominent)
- CTA: "List cleaned? Now validate every email before sending. Cleanmails does SMTP handshake validation — built in, no per-lead fees."

### Running Cost
$0 — pure client-side

---

## Tools Index Page (`/`)

The homepage lists all 4 tools in a clean grid layout.

### Layout
- Sticky nav (same as tool pages)
- Page title: "Free Cold Email Tools" (Lora serif, large)
- Subtitle: "Built by Cleanmails — the self-hosted cold email platform."
- 2x2 grid of tool cards (responsive: 1 column on mobile, 2 on tablet+)
- Each card shows:
  - Tool icon/emoji
  - Tool name
  - One-line description
  - "Use tool →" link
- CTA section at bottom (same as blog footer CTA)

### Tool Cards Content

| Tool | Icon | Name | Description |
|---|---|---|---|
| 1 | 🛡️ | Email Spam Word Checker | Paste your cold email and instantly find spam trigger words that hurt deliverability. |
| 2 | 🔍 | SPF / DKIM / DMARC Checker | Check your domain's email authentication records in one click. |
| 3 | 📧 | Email Extractor from Text | Paste any text and extract all email addresses into a clean list. |
| 4 | 🧹 | CSV Email List Cleaner | Upload a messy CSV and split multi-email rows into clean, import-ready format. |

---

## SEO Strategy

### Per-Tool SEO
- Each tool page has unique `<title>`, `<meta description>`, Open Graph tags via `generateMetadata()`
- Schema.org `WebApplication` structured data per tool
- Canonical URLs: `https://cleanmails.online/tools/[tool-slug]`
- H1 is the tool name with primary keyword
- Descriptive paragraphs above and below the tool for on-page SEO content

### Sitemap
Auto-generated at `/sitemap.xml` listing all tool pages.

### Internal Linking
- Each tool page links to the other 3 tools ("More free tools" section)
- Each tool page links to relevant blog posts
- Blog posts link to relevant tools where natural

---

## CTA Strategy

Every tool page ends with a contextual CTA that connects the tool's function to Cleanmails' paid features:

| Tool | CTA Message |
|---|---|
| Spam Checker | "Cleanmails checks every email for spam words before sending — automatically." |
| DNS Checker | "Cleanmails auto-configures SPF, DKIM, and DMARC during installation." |
| Email Extractor | "Got your list? Validate every email with Cleanmails — built-in, no per-lead fees." |
| CSV Cleaner | "List cleaned? Now verify every mailbox exists. Cleanmails does full SMTP validation." |

---

## Traffic Projections

| Tool | Est. monthly traffic (at maturity) |
|---|---|
| Spam Word Checker | 15,000-25,000 |
| SPF/DKIM/DMARC Checker | 20,000-35,000 |
| Email Extractor from Text | 25,000-40,000 |
| CSV Email List Cleaner | 12,000-21,000 |
| **Total** | **72,000-1,21,000** |

### Timeline to Maturity
- Month 1-3: Tools live, Google indexing, minimal traffic (500-2,000/month)
- Month 3-6: Starting to rank for long-tail keywords (5,000-15,000/month)
- Month 6-12: Ranking for primary keywords (20,000-50,000/month)
- Month 12-18: Mature rankings (50,000-1,00,000/month)

---

## Branding & Voice

Same as the blog:
- **Product name:** Cleanmails
- **Tagline:** Self-hosted cold email infrastructure
- **Audience:** Cold email marketers, agency owners, SaaS founders
- **Tone:** Direct, helpful, no fluff. The tools should feel fast, clean, and trustworthy.
- **No signup required.** All tools work instantly without creating an account. This builds trust and reduces friction.

---

## Links & References

- Main site: `https://cleanmails.online`
- Blog site: `https://cleanmails.online/blog`
- Logo: `/logo.svg` (same as blog)
- Favicon: `/icon.svg` (same as blog)
- Google Analytics ID: `G-QWXBBLS661`
- PapaParse docs: `https://www.papaparse.com/docs`

---

## Future Tools (v2)

These can be added later once the first 4 are live and ranking:

1. **Free Email Validator (no SMTP)** — syntax check, MX record, disposable domain detection, typo detection. ~70-80% accuracy. Upsells to Cleanmails' full SMTP validation.
2. **Email Subject Line Tester** — scores subject lines on length, spam risk, power words, personalization. Optional AI-generated alternatives via Claude API.
3. **Email Warmup Calculator** — input mailbox count and target volume, get a week-by-week warmup schedule.
4. **Spintax Generator / Previewer** — write email with `{option1|option2}` syntax, see random previews.
5. **Cold Email ROI Calculator** — input list size, reply rate, deal size → shows expected revenue.
