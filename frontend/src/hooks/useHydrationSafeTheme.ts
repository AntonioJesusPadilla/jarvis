'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useHydrationSafeTheme() {
  // Inicializar siempre con light
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Función para aplicar tema
  const applyTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    // Forzar modo claro inicialmente
    document.documentElement.classList.remove('dark')
    setTheme('light')
    
    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      try {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        
        if (savedTheme === 'dark') {
          applyTheme('dark')
        } else if (savedTheme === 'light') {
          applyTheme('light')
        } else {
          // Sin tema guardado - usar SIEMPRE claro como default
          applyTheme('light')
        }
      } catch (error) {
        applyTheme('light')
      }
      
      setMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    if (!mounted) return
    
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    // Aplicar tema inmediatamente
    applyTheme(newTheme)
    
    // Guardar en localStorage
    try {
      localStorage.setItem('theme', newTheme)
    } catch (error) {
      console.warn('Cannot save theme preference:', error)
    }
  }

  return { theme, toggleTheme, mounted }
}
