import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

function resolve(dict, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const value = useMemo(() => {
    const t = (path) => {
      const hit = resolve(translations[lang], path)
      if (hit !== undefined) return hit
      const fallback = resolve(translations.tr, path)
      return fallback !== undefined ? fallback : path
    }
    const toggle = () => setLang((l) => (l === 'tr' ? 'en' : 'tr'))
    return { lang, setLang, toggle, t }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
