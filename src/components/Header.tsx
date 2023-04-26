import { useEffect } from 'react'
import MenuItems from './MenuItems'
import ThemeChanger from './ThemeChanger'
import Logo from './Logo'
import Navbar from './Navbar'
import Link from 'next/link'
import {
  useScroll,
  motion,
  useInView,
  useAnimate,
  AnimatePresence,
} from 'framer-motion'
import useScrollCounter from '@/hooks/useScrollCounter'
import classNames from 'classnames'

const Header: React.FC = () => {
  const reached = useScrollCounter(100 / 2)

  const headerVariants = {
    open: {
      height: 100,
      transition: { ease: 'easeInOut', duration: 0.3 },
      innerWidth: '800px',
    },
    collapsed: {
      height: 60,
      transition: { ease: 'easeInOut', duration: 0.3, delayChildren: 0.5 },
    },
  }

  return (
    <AnimatePresence>
      <motion.header
        className={classNames(
          'md:py-6 md:px-12 lg:px-20 w-screen font-sans mx-auto bg-back-primary border-b border-transparent transition-colors'
          // reached
          //   ? 'md:border-gray-200 md:dark:border-dark-gray-300 '
          //   : 'md:border-transparent'
        )}
      >
        <nav
          className={classNames(
            'hidden md:flex justify-between items-center h-full w-full mt-auto max-w-7xl text-sm  mx-auto'
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
