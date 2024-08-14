import { IBM_Plex_Sans, IBM_Plex_Mono, PT_Sans } from 'next/font/google'

export const nunitoSans = PT_Sans({
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  fallback: ['system-ui', 'arial'],
})

export const oswald = IBM_Plex_Sans({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  fallback: ['system-ui', 'arial'],
})

export const ibmPlexMono = IBM_Plex_Mono({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  fallback: ['system-ui', 'arial'],
})
