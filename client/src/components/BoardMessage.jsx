import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { ArrowRightIcon } from './icons'

const EASE = [0.16, 1, 0.3, 1]

export default function BoardMessage({ onBack }) {
  const { t } = useLanguage()
  const detail = t('boardMessage')

  useEffect(() => {
    document.getElementById('board-message')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.section
      id="board-message"
      className="board-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <button type="button" className="division-back" onClick={onBack}>
        <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        {detail.back}
      </button>

      <motion.div
        className="board-hero"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="badge">{detail.badge}</span>
        <h2 className="text-gradient">{detail.title}</h2>
        <p className="board-subtitle">{detail.subtitle}</p>
      </motion.div>

      <motion.div
        className="board-body"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="board-quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        {detail.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </motion.div>

      <motion.div
        className="board-closing"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {detail.closingLines.map((line) => (
          <p key={line} className="board-closing-line">
            {line}
          </p>
        ))}
        <p className="board-closing-tagline" lang="en">
          {detail.closingTagline}
        </p>
        <p className="board-signature">— {detail.signature}</p>
      </motion.div>
    </motion.section>
  )
}
