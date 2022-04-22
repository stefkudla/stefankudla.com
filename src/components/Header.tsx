import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuItems from './MenuItems'
import ThemeChanger from './ThemeChanger'

const Header: React.VFC = () => {
  return (
    <>
      <header className="sticky sm:static top-0 container h-16 max-w-screen-lg m-auto overflow-hidden sm:px-12 md:px-20">
        <nav
          className="flex items-center justify-start h-full mt-auto space-x-6 text-sm md:justify-start backdrop-filter backdrop-blur-sm  bg-opacity-30"
          aria-label="Main Navigation"
        >
          <Link href="/">
            <a
              aria-label="Website logo, go back to homepage."
              className="flex items-center border-white group focus-visible:outline-accent"
            >
              <div className="overflow-hidden transition-transform ease-in-out rounded-full  group-hover:-translate-y-1">
                <div className="inline ml-3 text-base font-semibold">
                  <span className="text-fore-subtle">stefankudla</span>
                  <span className="text-accent">.com</span>
                </div>
              </div>
            </a>
          </Link>
          <MenuItems />
          <ThemeChanger
            styles={
              'hidden mt-1 transition-transform ease-in-out focus:outline-none sm:block hover:text-accent group focus-visible:outline-accent'
            }
          />
        </nav>
      </header>
    </>
  )
}

export default Header
