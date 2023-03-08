import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
