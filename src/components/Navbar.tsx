import { useEffect, useState } from 'react'
import { CloseIcon, MenuIcon } from '@/configs/icons'
import ThemeChanger from './ThemeChanger'
import Logo from './Logo'
import { routes } from './MenuItems'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, Variants } from 'framer-motion'

const animateNavContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.05,
      type: 'easeInOut',
      delayChildren: 0.05,
      staggerChildren: 0.02,
    },
  },
}

const animateNavItem: Variants = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0 },
}

const Navbar: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false)
  const currentPage = useRouter()

  useEffect(() => {
    const body = document.body

    if (navOpen) {
      body.style.setProperty('touch-action', 'none')
    }

    if (!navOpen) {
      body.style.removeProperty('touch-action')
    }
  }, [navOpen])

  useEffect(() => {
    if (navOpen) {
      setNavOpen(!navOpen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <nav className="fixed top-0 h-12 w-full md:hidden backdrop-filter bg-card-back backdrop-blur-sm bg-opacity-30 z-50">
      <button
        className="absolute top-3 right-2 z-50"
        aria-label={!navOpen ? 'Open Menu' : 'Close Menu'}
        onClick={() => {
          setNavOpen(!navOpen)
        }}
      >
        {!navOpen ? <MenuIcon /> : <CloseIcon />}
      </button>
      {!navOpen ? (
        <div className="absolute top-3 left-2">
          <Logo />
        </div>
      ) : (
        <div className="flex flex-col z-40 h-screen w-full bg-back-primary overflow-hidden px-4 pt-16 mb-12">
          <motion.ul
            variants={animateNavContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-y-12"
          >
            {routes.map(route => (
              <motion.li
                variants={animateNavItem}
                key={route.path}
                className="border-b border-b-back-subtle pb-2"
              >
                <Link href={route.path} className="text-fore-secondary">
                  {route.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            variants={animateNavItem}
            initial="hidden"
            animate="show"
            className="flex justify-between mt-12"
          >
            <ThemeChanger />
          </motion.div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
