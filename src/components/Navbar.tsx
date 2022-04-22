import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeChanger from './ThemeChanger'

const routes = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/blog',
    label: 'Blog',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
]

const Navbar: React.VFC = () => {
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const body = document.body
    if (typeof body !== 'undefined') {
      if (navOpen) {
        body.style.setProperty('overflow', 'hidden')
      } else {
        body.style.removeProperty('overflow')
      }
    }
  }, [navOpen])

  return (
    <div className="text-xl sm:hidden" aria-hidden={!navOpen}>
      <button
        type="button"
        className="fixed right-0 z-50 px-5 py-6 md:hidden focus:outline-none"
        onClick={() => {
          setNavOpen(!navOpen)
        }}
      >
        {navOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        )}
      </button>
      {navOpen && (
        <div className="relative z-10">
          <div className="fixed w-full h-screen bg-back-primary"></div>
          <button
            type="button"
            className="fixed w-full h-screen cursor-auto"
            onClick={e => {
              setNavOpen(!navOpen)
            }}
          ></button>
          <nav className="fixed flex flex-col items-center w-full h-screen px-6 py-48 mt-auto text-base tracking-widest text-fore-primary">
            {routes.map(route => (
              <MobileNavLink
                key={route.path}
                to={route.path}
                title={route.label}
              />
            ))}
            <ThemeChanger />
          </nav>
        </div>
      )}
    </div>
  )
}

function MobileNavLink({ to, title }) {
  return (
    <div className="flex-grow">
      <Link href={to}>
        <a className="text-fore-primary">{title}</a>
      </Link>
    </div>
  )
}

export default Navbar
