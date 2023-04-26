import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@/configs/icons'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import CarrotDownIcon from '@/components/icons/CarrotDownIcon'

const ThemeChanger: React.FC<{ styles?: string }> = ({ styles }) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isDark: boolean = resolvedTheme === 'dark'

  useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <div className="flex gap-x-3 items-center group min-w-[96px] flex-shrink">
        <span className="md:opacity-0 group-hover:opacity-100 transition-opacity font-oswald font-bold text-gray-500 text-2xs min-w-[40px]">
          Loading
        </span>
        <span className="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1"></span>
      </div>
    )

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }

  return (
    <div className="flex gap-x-3 items-center group min-w-[96px] flex-shrink">
      <span className="md:opacity-0 group-hover:opacity-100 transition-opacity font-oswald font-bold text-gray-500 text-2xs min-w-[40px] text-end">
        {isDark ? 'Dark' : 'Light'}
      </span>
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
    </div>
  )
}

export default ThemeChanger
