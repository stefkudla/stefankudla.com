import React from 'react'
import Link from 'next/link'

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
    path: '/blog',
    label: 'Blog',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
]

const MenuItems: React.VFC = () => {
  return (
    <>
      <div className="items-center justify-start flex-grow hidden space-x-6 sm:flex">
        {routes.map(route => (
          <Link key={route.path} href={route.path}>
            <a className="text-fore-subtle hover:text-accent transition-colors font-bold">
              {route.label}
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default MenuItems
