import Footer from './Footer'
import GhostBlock from './GhostBlock'
import Header from './Header'
import { Meta } from './Meta'
import { nunitoSans, oswald } from '@/fonts'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import cx from 'classnames'

type LayoutProps = {
  children: React.ReactNode
  router: {
    route: string
  }
  classNames?: string
}

const Layout: React.FC<LayoutProps> = ({ children, classNames }) => (
  <>
    <Meta />
    <Header />
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cx(
          `flex flex-col font-sans justify-start items-center flex-grow container px-5 mx-auto md:px-12 lg:px-24`,
          oswald.variable,
          nunitoSans.variable,
          classNames
        )}
      >
        {children}
      </motion.main>
    </AnimatePresence>
    <Footer />
  </>
)
export default Layout
