import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle({ className = '' }) {
  const { lang, toggle } = useLanguage()
  const isEn = lang === 'en'

  return (
    <button
      type="button"
      className={`lang-toggle ${className}`}
      onClick={toggle}
      aria-label={isEn ? 'Türkçeye geç' : 'Switch to English'}
      aria-pressed={isEn}
    >
      <motion.span
        className="lang-toggle-thumb"
        animate={{ x: isEn ? 26 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        {lang.toUpperCase()}
      </motion.span>
    </button>
  )
}
