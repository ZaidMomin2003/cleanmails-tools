import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Free Cold Email Tools — Cleanmails', template: '%s | Cleanmails Tools' },
  description: 'Free tools for cold email: spam checker, DNS record checker, email extractor, and CSV list cleaner.',
  metadataBase: new URL('https://cleanmails.online'),
  icons: { icon: '/icon.svg', apple: '/apple-icon.svg' },
  openGraph: { type: 'website', siteName: 'Cleanmails Tools', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://cleanmails.online/tools' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-QWXBBLS661" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QWXBBLS661');`}</Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
