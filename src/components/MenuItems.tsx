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
    path: '/projects',
    label: 'Projects',
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
      <div className="text-base relative items-center justify-start flex-grow hidden space-x-6 md:flex">
        {routes.map(route => (
          <Link
            key={route.path}
            href={route.path}
            className={
              route.path === currentRoute
                ? 'text-accent transition-colors font-extrabold tracking-wide'
                : 'text-fore-subtle transition-colors font-semibold tracking-wide nav--item'
            }
            onClick={removeFocus}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </>
  )
}
export default MenuItems
