import Meta from '@/components/Meta'
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <Meta />
      </Head>
      <body className="transition">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
