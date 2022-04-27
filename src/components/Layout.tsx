import React from 'react'
import Alert from './AlertPreview'
import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

interface LayoutProps {
  children: React.ReactNode
  preview?: any
}

const Layout = ({ preview, children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="container flex-grow max-w-screen-lg px-5 m-auto mt-16 sm:px-12 md:px-20">
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Layout
