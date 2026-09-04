import '@/styles/globals.css'
import '@/styles/code-theme.css'
import type { Metadata, Viewport } from 'next'
import { nunitoSans } from '@/fonts'
import SiteChrome from './site-chrome'

export const metadata: Metadata = {
  metadataBase: new URL('https://stefankudla.com'),
  icons: {
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    icon: [
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: ['/favicon/favicon.ico'],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
  },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/favicon/browserconfig.xml',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={`${nunitoSans.className}`}
    suppressHydrationWarning
  >
    <body>
      <SiteChrome>{children}</SiteChrome>
    </body>
  </html>
)

export default RootLayout
