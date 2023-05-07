import { Nunito_Sans, Oswald } from 'next/font/google'

export const nunitoSans = Nunito_Sans({
  display: 'swap',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  fallback: ['system-ui', 'arial'],
})

export const oswald = Oswald({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  fallback: ['system-ui', 'arial'],
})
