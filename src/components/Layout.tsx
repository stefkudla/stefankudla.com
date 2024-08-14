import Footer from './Footer'
import Header from './Header'
import { Meta } from './Meta'
import { nunitoSans, oswald, ibmPlexMono } from '@/fonts'
import cx from 'classnames'

type LayoutProps = {
  children: React.ReactNode
  router?: {
    route: string
  }
  classNames?: string
}

const Layout: React.FC<LayoutProps> = ({ children, classNames }) => (
  <div className="flex flex-col min-h-screen">
    <Meta />
    <Header />

    <main
      className={cx(
        `flex flex-col font-sans justify-start items-center flex-grow max-w-3xl px-5 mx-auto lg:px-2 pt-20`,
        oswald.variable,
        nunitoSans.variable,
        ibmPlexMono.variable,
        classNames
      )}
    >
      {children}
    </main>
    <Footer />
  </div>
)
export default Layout
