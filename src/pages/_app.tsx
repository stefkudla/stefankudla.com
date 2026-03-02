import '@/styles/globals.css'
import '@/styles/code-theme.css'
import { useState } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import AboutSheet from '@/components/AboutSheet'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [aboutSheetOpen, setAboutSheetOpen] = useState(false)

  return (
    <ThemeProvider
      defaultTheme="dark"
      enableSystem={false}
      attribute="class"
      disableTransitionOnChange
    >
      <Header onAboutOpen={() => setAboutSheetOpen(true)} />
      <Component {...pageProps} />
      <AboutSheet
        isOpen={aboutSheetOpen}
        onClose={() => setAboutSheetOpen(false)}
      />
      <Analytics />
    </ThemeProvider>
  )
}

export default MyApp
