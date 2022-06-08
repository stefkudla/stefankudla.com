import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
  router: {
    route: string
  }
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Meta />
    <Header />
    <main className="flex flex-col min-h-screen container flex-grow max-w-screen-lg px-5 m-auto mt-16 md:px-12 lg:px-24">
      {children}
    </main>
    <Footer />
  </>
)
export default Layout
