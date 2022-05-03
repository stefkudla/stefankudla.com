import '@/styles/globals.css'
import Layout from '../components/Layout'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider attribute="class">
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
