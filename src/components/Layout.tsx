import Footer from './Footer'
import GhostBlock from './GhostBlock'
import Header from './Header'
import { Meta } from './Meta'
import { nunitoSans, oswald } from '@/fonts'
import { motion, AnimatePresence } from 'framer-motion'
import cx from 'classnames'

type LayoutProps = {
  children: React.ReactNode
  router?: {
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
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        className={cx(
          `flex flex-col font-sans justify-start items-center flex-grow container px-5 mx-auto lg:px-2`,
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
