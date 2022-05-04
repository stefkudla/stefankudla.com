import React, { useEffect, useState } from 'react'
import { CloseIcon, MenuIcon } from './icons'
import ThemeChanger from './ThemeChanger'
import Logo from './Logo'
import { routes } from './MenuItems'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Navbar: React.VFC = () => {
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
  }, [currentPage])

  return (
    <>
      <nav className="fixed top-0 h-12 w-full sm:hidden backdrop-filter backdrop-blur-sm bg-opacity-30">
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
          <ul className="flex flex-col gap-y-28 h-screen w-full justify-center items-center bg-back-primary bg-opacity-70 overflow-hidden z-40">
            {routes.map(route => (
              <li key={route.path}>
                <Link href={route.path} scroll={false}>
                  <a className="text-xl tracking-widest text-fore-secondary">
                    {route.label}
                  </a>
                </Link>
              </li>
            ))}
            <ThemeChanger />
          </ul>
        )}
      </nav>
    </>
  )
}

export default Navbar
