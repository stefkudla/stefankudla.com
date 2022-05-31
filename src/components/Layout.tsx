import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
  router: {
    route: string
  }
}

const Layout: React.FC<LayoutProps> = ({ children, router }) => (
  <>
    <Meta />
    <Header />
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="container flex-grow max-w-screen-lg px-5 m-auto mt-16 sm:px-12 md:px-20">
          {children}
        </div>
      </div>
    </div>
    <Footer />
  </>
)
export default Layout
