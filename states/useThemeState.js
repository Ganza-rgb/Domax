'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeStateContext = createContext(undefined)

const THEME_KEY = 'domax:theme'

export function ThemeStateProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.remove('theme-light', 'theme-dark')
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, theme)
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
    }),
    [theme, toggleTheme]
  )

  return <ThemeStateContext.Provider value={value}>{children}</ThemeStateContext.Provider>
}

export function useThemeState() {
  const context = useContext(ThemeStateContext)
  if (!context) {
    throw new Error('useThemeState must be used within ThemeStateProvider')
  }
  return context
}








