import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'

import ReactQuery from '@/app/ReactQuery'
import {
  CANONICAL_URL,
  APPLICATION_NAME,
  DESCRIPTION,
  APPLICATION_SHORT_NAME,
  AUTHOR,
  KEYWORDS,
  CATEGORY,
  THEME_COLOR,
} from '@/common/constants'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: APPLICATION_NAME,
  description: DESCRIPTION,
  applicationName: APPLICATION_SHORT_NAME,
  authors: [{ url: '', name: AUTHOR }],
  generator: null,
  keywords: KEYWORDS,
  referrer: 'strict-origin-when-cross-origin',
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL_URL },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/shortcut-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: APPLICATION_NAME,
    description: DESCRIPTION,
    type: 'website',
    url: CANONICAL_URL,
    siteName: APPLICATION_NAME,
    locale: 'ko_KR',
    images: [{ url: '/images/og-image.webp', alt: `${APPLICATION_SHORT_NAME} 로고` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/images/og-image.webp', alt: `${APPLICATION_SHORT_NAME} 로고` }],
  },
  appleWebApp: { title: APPLICATION_SHORT_NAME, capable: true, statusBarStyle: 'black' },
  formatDetection: { telephone: true, date: true, address: true, email: true, url: true },
  appLinks: { web: { url: CANONICAL_URL } },
  archives: CANONICAL_URL,
  assets: CANONICAL_URL,
  bookmarks: CANONICAL_URL,
  category: CATEGORY,
  classification: CATEGORY,
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
}

export const revalidate = 3600

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color={THEME_COLOR} href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content={THEME_COLOR} name="msapplication-TileColor" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content={DESCRIPTION} name="subject" />
      <meta content="general" name="rating" />
      <meta content="3 days" name="revisit-after" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />

      <body className="font-apple">
        <ReactQuery>
          {children}
          <div id="modal-root" />
          <div id="bottom-sheet-root" />
        </ReactQuery>
        <SpeedInsights />
      </body>

      <Analytics />
    </html>
  )
}
