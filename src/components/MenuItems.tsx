import Link from 'next/link'
import { useRouter } from 'next/router'
import { oswald } from '@/fonts'
import classNames from 'classnames'
import { useState } from 'react'

export const routes: { path: string; label: string }[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
  {
    path: '/posts',
    label: 'Posts',
  },
  {
    path: '/about',
    label: 'About',
  },
]

const MenuItems: React.FC = () => {
  const currentRoute = useRouter().pathname
  let [activeRoute, setActiveRoute] = useState(currentRoute)

  return (
    <div className="text-base items-center hidden gap-x-8 md:flex">
      {routes.map((route, index) => (
        <Link
          key={route.path + index}
          href={route.path}
          className={classNames(
            `font-mono font-bold  tracking-wide relative transition-all hover:opacity-50 dark:hover:opacity-70 py-1 rounded`
          )}
          onClick={() => setActiveRoute(currentRoute)}
        >
          {activeRoute === route.path && (
            <span
              className="bg-accent"
              style={{
                width: '100%',
                position: 'absolute',
                bottom: '0',
                height: '2px',
              }}
            />
          )}
          {route.label}
        </Link>
      ))}
    </div>
  )
}
export default MenuItems
