import MenuItems from './MenuItems'
import ThemeChanger from './ThemeChanger'
import Logo from './Logo'
import Navbar from './Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollCounter from '@/hooks/useScrollCounter'
import classNames from 'classnames'

const Header: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.header
        className={classNames('md:py-6 md:px-0 font-sans mx-auto')}
      >
        <nav
          className={classNames(
            'hidden md:flex justify-between items-center h-full w-full mt-auto text-sm  mx-auto container'
          )}
          aria-label="Main Navigation"
        >
          <Logo />

          <motion.div>
            <MenuItems />
          </motion.div>
          <ThemeChanger
            styles={
              'hidden transition-transform ease-in-out focus:outline-none sm:block hover:text-accent group focus-visible:outline-accent'
            }
          />
        </nav>
        <Navbar />
      </motion.header>
    </AnimatePresence>
  )
}
export default Header
