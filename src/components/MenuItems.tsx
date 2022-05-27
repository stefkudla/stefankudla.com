import { MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const routes: { path: string; label: string }[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/posts',
    label: 'Posts',
  },
  {
    path: '/works',
    label: 'Works',
  },
  {
    path: '/about',
    label: 'About',
  },
]

const MenuItems: React.FC = () => {
  const removeFocus = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur()
  }
  const currentRoute = useRouter().pathname
  return (
    <>
      <div className="relative items-center justify-start flex-grow hidden space-x-6 md:flex">
        {routes.map(route => (
          <Link key={route.path} href={route.path} scroll={false}>
            <a
              className={
                route.path === currentRoute
                  ? 'text-fore-primary transition-colors font-bold tracking-wide'
                  : 'text-fore-subtle transition-colors tracking-wide nav--item'
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
