import Alert from './alert'
import Footer from './Footer'
import Meta from './meta'
import Navbar from './Navbar'
import Header from './Header'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <Alert preview={preview} />
        <Header />
        <main className="container flex-grow max-w-screen-lg px-5 m-auto mt-16 sm:px-12 md:px-20">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
