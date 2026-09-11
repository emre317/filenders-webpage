import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { ArrowRightIcon } from './icons'

const EASE = [0.16, 1, 0.3, 1]

function LegalSection({ section, index }) {
  return (
    <motion.div
      className="legal-section"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: EASE }}
    >
      <h3>{section.title}</h3>
      {section.body.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
    </motion.div>
  )
}

export default function DataPrivacy({ onBack }) {
  const { t } = useLanguage()
  const detail = t('dataPrivacy')

  useEffect(() => {
    document.getElementById('data-privacy')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.section
      id="data-privacy"
      className="legal-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <button type="button" className="division-back" onClick={onBack}>
        <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        {detail.back}
      </button>

      <motion.div
        className="legal-hero"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="badge">{detail.badge}</span>
        <h2 className="text-gradient">{detail.title}</h2>
        <p className="legal-updated">{detail.updated}</p>
        <p className="legal-intro">{detail.intro}</p>
      </motion.div>

      <div className="legal-section-list">
        {detail.sections.map((section, i) => (
          <LegalSection key={section.title} section={section} index={i} />
        ))}
      </div>

      <motion.p
        className="legal-note"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {detail.note}
      </motion.p>
    </motion.section>
  )
}
