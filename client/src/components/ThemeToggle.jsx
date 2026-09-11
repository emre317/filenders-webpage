import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from './icons'

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggle}
      aria-label={isLight ? 'Koyu temaya geç' : 'Açık temaya geç'}
      aria-pressed={isLight}
    >
      <motion.span
        className="theme-toggle-thumb"
        animate={{ x: isLight ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        {isLight ? <SunIcon width={13} height={13} /> : <MoonIcon width={13} height={13} />}
      </motion.span>
    </button>
  )
}
