import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@/configs/icons'

const ThemeChanger: React.FC<{ styles?: string }> = ({ styles }) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <span>
        <SunIcon />
      </span>
    )

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
        <span>
          <MoonIcon />
        </span>
      ) : (
        <span>
          <SunIcon />
        </span>
      )}
    </button>
  )
}

export default ThemeChanger
