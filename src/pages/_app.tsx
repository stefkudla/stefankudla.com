import '@/styles/globals.css'
import '@/styles/code-theme.css'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      enableSystem={false}
      attribute="class"
      disableTransitionOnChange
    >
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default MyApp
