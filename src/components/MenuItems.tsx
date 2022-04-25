import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface RouteTypes {
  path: string
  label: string
}

export const routes: RouteTypes[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/posts',
    label: 'Posts',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
]

const MenuItems: React.VFC = () => {
  const removeFocus = e => {
    e.target.classList.remove('nav--item')
    e.target.blur()
  }
  const currentRoute = useRouter().pathname
  return (
    <>
      <div className="relative items-center justify-start flex-grow hidden space-x-6 sm:flex">
        {routes.map(route => (
          <Link key={route.path} href={route.path}>
            <a
              className={
                route.path === currentRoute
                  ? 'text-fore-primary transition-colors font-extrabold'
                  : 'text-fore-subtle transition-colors font-semibold nav--item'
              }
              onClick={removeFocus}
            >
              {route.label}
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default MenuItems

// className="text-fore-subtle hover:text-accent transition-colors font-bold"
