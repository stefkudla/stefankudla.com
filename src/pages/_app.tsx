import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { AppProps } from 'next/app'

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
