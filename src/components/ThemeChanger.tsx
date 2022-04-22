import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from './icons'

interface StylesProps {
  styles?: string
}

const ThemeChanger = ({ styles }: StylesProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      aria-label={
        resolvedTheme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'
      }
      title={
        resolvedTheme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'
      }
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
      className={styles}
    >
      {resolvedTheme === 'dark' ? (
        <MoonIcon styles="text-2xl sm:text-xl group-hover:-translate-y-1 transition-transform group-hover:rotate-12" />
      ) : (
        <SunIcon styles="text-2xl sm:text-xl group-hover:-translate-y-1 transition-transform group-hover:rotate-12" />
      )}
    </button>
  )
}

export default ThemeChanger
