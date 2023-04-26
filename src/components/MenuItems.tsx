import { MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { oswald } from '@/fonts'
import classNames from 'classnames'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'

export const routes: { path: string; label: string }[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/services',
    label: 'Services',
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
    path: '/contact',
    label: 'Contact',
  },
]

const MenuItems: React.FC = () => {
  const currentRoute = useRouter().pathname
  let [activeRoute, setActiveRoute] = useState(currentRoute)

  return (
    <motion.div className="text-base items-center hidden gap-x-8 md:flex">
      {routes.map((route, index) => (
        <Link
          key={route.path + index}
          href={route.path}
          className={classNames(
            `${oswald.className} text-lg tracking-wide relative transition-all hover:opacity-50 dark:hover:opacity-70 py-1 rounded`
          )}
          onClick={() => setActiveRoute(currentRoute)}
        >
          {activeRoute === route.path && (
            <motion.span
              layoutId={`underline`}
              layout
              className="bg-accent"
              style={{
                width: '100%',
                position: 'absolute',
                bottom: '0',
                height: '2px',
              }}
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.6,
                ease: 'easeInOut',
              }}
            />
          )}
          {route.label}
        </Link>
      ))}
    </motion.div>
  )
}
export default MenuItems
