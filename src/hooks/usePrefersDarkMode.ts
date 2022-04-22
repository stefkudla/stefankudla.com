import { useEffect, useState } from 'react'

export function usePrefersDarkMode() {
  const [value, setValue] = useState(true)

  useEffect(() => {
    const localMode = window.matchMedia('(prefers-color-scehem: dark)').matches
    console.log(localMode)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setValue(mediaQuery.matches)

    const handler = () => setValue(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return value
}
