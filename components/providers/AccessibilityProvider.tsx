import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

type AccessibilityContextType = {
  reduceMotion: boolean
  toggleReduceMotion: () => void
  highContrast: boolean
  toggleHighContrast: () => void
  fontSize: 'default' | 'large' | 'larger'
  setFontSize: (size: 'default' | 'large' | 'larger') => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [reduceMotion, setReduceMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSizeState] = useState<'default' | 'large' | 'larger'>('default')

  // Handle system preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply font size to document
  useEffect(() => {
    const htmlElement = document.documentElement
    const sizes = {
      default: '16px',
      large: '18px',
      larger: '20px',
    }
    htmlElement.style.fontSize = sizes[fontSize]
  }, [fontSize])

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [highContrast])

  const toggleReduceMotion = () => {
    setReduceMotion((prev) => !prev)
  }

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
  }

  const setFontSize = (size: 'default' | 'large' | 'larger') => {
    setFontSizeState(size)
    localStorage.setItem('preferred-font-size', size)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        reduceMotion,
        toggleReduceMotion,
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
      }}
    >
      <div
        className={cn(
          'min-h-screen',
          reduceMotion && 'motion-reduce',
          highContrast && 'contrast-more',
          fontSize === 'large' && 'text-lg',
          fontSize === 'larger' && 'text-xl'
        )}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
} 