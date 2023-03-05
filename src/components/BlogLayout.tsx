import Footer from './Footer'
import Header from './Header'
import { Meta } from './Meta'

type LayoutProps = {
  children: React.ReactNode
  router: {
    route: string
  }
}

const BlogLayout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Meta />
    <Header />
    <main className="flex flex-col min-h-screen m-auto mt-16 w-full">
      {children}
    </main>
    <Footer />
  </>
)
export default BlogLayout
