'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import AboutSheet from '@/components/AboutSheet'

const SiteChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aboutSheetOpen, setAboutSheetOpen] = useState(false)

  return (
    <ThemeProvider
      defaultTheme="dark"
      enableSystem={false}
      attribute="class"
      disableTransitionOnChange
    >
      <Header onAboutOpen={() => setAboutSheetOpen(true)} />
      {children}
      <AboutSheet
        isOpen={aboutSheetOpen}
        onClose={() => setAboutSheetOpen(false)}
      />
      <Analytics />
    </ThemeProvider>
  )
}

export default SiteChrome
