import { useContext, useState } from 'react'

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem('color-mode')
  const hasPersistedPreference = typeof persistedColorPreference === 'string'

  if (hasPersistedPreference) {
    return persistedColorPreference
  }

  const mql = window.matchMedia('prefers-color-scheme: dark')
  const hasMediaQueryPreference = typeof mql.matches === 'boolean'

  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return 'light'
}

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(getInitialColorMode)
}
