'use client'

import React, { createContext, useContext } from 'react'
import { useHydrationSafeTheme } from '@/hooks/useHydrationSafeTheme'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeState = useHydrationSafeTheme()

  return (
    <div suppressHydrationWarning>
      <ThemeContext.Provider value={themeState}>
        {children}
      </ThemeContext.Provider>
    </div>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
