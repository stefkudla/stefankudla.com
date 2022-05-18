import React from 'react'
import MenuItems from './MenuItems'
import ThemeChanger from './ThemeChanger'
import Logo from './Logo'
import Navbar from './Navbar'
import CurrentlyPlaying from './CurrentlyPlaying'

const Header: React.VFC = () => {
  return (
    <>
      <header className="sm:pt-4 container max-w-screen-lg m-auto sm:px-12 md:px-20">
        <nav
          className="hidden sm:flex justify-start items-center h-full mt-auto space-x-6 text-sm md:justify-start backdrop-filter backdrop-blur-sm  bg-opacity-30"
          aria-label="Main Navigation"
        >
          <Logo />
          <MenuItems />
          <CurrentlyPlaying />
          <ThemeChanger
            styles={
              'hidden transition-transform ease-in-out focus:outline-none sm:block hover:text-accent group focus-visible:outline-accent'
            }
          />
        </nav>
        <Navbar />
      </header>
    </>
  )
}

export default Header
