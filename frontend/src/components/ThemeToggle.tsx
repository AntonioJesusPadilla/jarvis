'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleToggle = () => {
    toggleTheme()
  }

  // No renderizar hasta que esté completamente hidratado
  if (!mounted || !isClient) {
    return (
      <div 
        className="p-2 rounded-lg bg-gray-200 transition-colors duration-200"
        suppressHydrationWarning
      >
        <div className="h-5 w-5" />
      </div>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      suppressHydrationWarning
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
      )}
    </button>
  )
}
