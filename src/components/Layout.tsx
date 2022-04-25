import React from 'react'
import Alert from './alert'
import Footer from './Footer'
import Meta from './meta'
import Header from './Header'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import Navbar from './Navbar'

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
        <Alert preview={preview} />
        <main className="container flex-grow max-w-screen-lg px-5 m-auto mt-16 sm:px-12 md:px-20">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
export default Layout
