import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@/configs/icons'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { oswald } from '@/fonts'

const ThemeChanger: React.FC<{ styles?: string }> = ({ styles }) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isDark: boolean = resolvedTheme === 'dark'

  useEffect(() => setMounted(true), [])

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }

  return (
    <div
      className={`flex flex-row-reverse md:flex-row  items-center justify-end w-fit group flex-shrink ${oswald.className}`}
    >
      {mounted ? (
        <button
          aria-label={
            resolvedTheme === 'dark'
              ? 'Activate Light Mode'
              : 'Activate Dark Mode'
          }
          title={
            resolvedTheme === 'dark'
              ? 'Activate Light Mode'
              : 'Activate Dark Mode'
          }
          className={classNames(
            'w-10 h-5 flex items-center bg-gray-300 rounded-full p-1',
            isDark ? 'justify-end' : 'justify-start'
          )}
          onClick={() => {
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
          }}
        >
          <motion.div
            className="bg-blue-400 w-4 h-4 rounded-full flex justify-center items-center"
            layout
            transition={spring}
          >
            {isDark ? (
              <MoonIcon className="rounded-full w-2 h-2 text-black" />
            ) : (
              <SunIcon className="rounded-full w-2 h-2 text-black" />
            )}
          </motion.div>
        </button>
      ) : (
        <div
          className={classNames(
            'w-10 h-5 flex items-center bg-gray-300 rounded-full p-1'
          )}
        >
          <div className="bg-transparent w-4 h-4 rounded-full flex justify-center items-center">
            <span className="rounded-full w-2 h-2 text-black" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeChanger
