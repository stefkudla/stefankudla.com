import { Html, Head, Main, NextScript } from 'next/document'
import { nunitoSans } from '@/fonts'

const Document = () => {
  return (
    <Html lang="en" className={`${nunitoSans.className}`}>
      <Head />
      <Main />
      <NextScript />
    </Html>
  )
}

export default Document
