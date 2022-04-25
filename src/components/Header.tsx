import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuItems from './MenuItems'
import ThemeChanger from './ThemeChanger'
import Logo from './Logo'
import Navbar from './Navbar'

const Header: React.VFC = () => {
  return (
    <>
      <header className="sm:pt-4 container max-w-screen-lg m-auto sm:px-12 md:px-20">
        <nav
          className="hidden sm:flex items-center justify-start h-full mt-auto space-x-6 text-sm md:justify-start backdrop-filter backdrop-blur-sm  bg-opacity-30"
          aria-label="Main Navigation"
        >
          <Logo />
          <MenuItems />
          <ThemeChanger
            styles={
              'hidden mt-1 transition-transform ease-in-out focus:outline-none sm:block hover:text-accent group focus-visible:outline-accent'
            }
          />
        </nav>

        <Navbar />
      </header>
    </>
  )
}

export default Header
