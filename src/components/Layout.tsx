import Footer from './Footer'
import { nunitoSans, oswald, ibmPlexMono } from '@/fonts'
import cx from 'classnames'

type LayoutProps = {
  children: React.ReactNode
  classNames?: string
}

const Layout: React.FC<LayoutProps> = ({ children, classNames }) => (
  <div className="flex flex-col min-h-screen">
    <main
      className={cx(
        `flex flex-col font-sans justify-start items-center flex-grow w-full max-w-3xl px-5 mx-auto lg:px-2 pt-20 md:pt-6 pb-24`,
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
