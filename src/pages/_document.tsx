import Meta from '@/components/Meta'
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Meta />
      <body className="transition">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
