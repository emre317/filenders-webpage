import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import { ArrowRightIcon, ShipIcon, TruckIcon, CpuIcon, LinkIcon } from './icons'

const EASE = [0.16, 1, 0.3, 1]

const unitIcons = {
  logistics: ShipIcon,
  filtrucks: TruckIcon,
  filentech: CpuIcon,
  filenetwork: LinkIcon,
}

function TimelineEntry({ entry, index }) {
  const reverse = index % 2 === 1

  return (
    <div className={`about-tl-entry ${reverse ? 'is-reverse' : ''}`}>
      <motion.div
        className="about-tl-node"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <span className="about-tl-node-dot" />
      </motion.div>

      <motion.div
        className="about-tl-card"
        initial={{ opacity: 0, y: 24, x: reverse ? 24 : -24 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <span className="about-tl-year">{entry.year}</span>
        <h3>{entry.title}</h3>
        {entry.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </motion.div>
    </div>
  )
}

function UnitCard({ unit, index }) {
  const Icon = unitIcons[unit.id]
  const { ref, tiltProps, glowX, glowY } = useTilt3D(6)

  return (
    <motion.div
      ref={ref}
      className="about-unit-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      {...tiltProps}
      style={{ ...tiltProps.style, transformPerspective: 1000 }}
    >
      <motion.span className="tilt-glow" aria-hidden="true" style={{ left: glowX, top: glowY }} />
      <span className="about-unit-icon">
        <Icon width={22} height={22} />
      </span>
      <h4>{unit.name}</h4>
      <p>{unit.description}</p>
    </motion.div>
  )
}

export default function AboutUs({ onBack }) {
  const { t } = useLanguage()
  const detail = t('aboutUs')

  useEffect(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.section
      id="about"
      className="about-page"
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ transformPerspective: 1400 }}
    >
      <button type="button" className="division-back" onClick={onBack}>
        <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        {detail.back}
      </button>

      <motion.div
        className="about-hero"
        initial={{ opacity: 0, y: 22, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <span className="badge">{detail.badge}</span>
        <h2 className="text-gradient">{detail.title}</h2>
        <p className="about-hero-tagline">{detail.tagline}</p>
        <div className="about-intro">
          {detail.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </motion.div>

      <div className="about-timeline">
        <span className="about-tl-line" aria-hidden="true" />
        {detail.timeline.map((entry, i) => (
          <TimelineEntry key={entry.year} entry={entry} index={i} />
        ))}
      </div>

      <motion.div
        className="about-units-head"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3>{detail.units.title}</h3>
      </motion.div>

      <div className="about-units-grid">
        {detail.units.items.map((unit, i) => (
          <UnitCard key={unit.id} unit={unit} index={i} />
        ))}
      </div>

      <div className="about-outlook-grid">
        <motion.div
          className="about-outlook-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="badge">{detail.today.badge}</span>
          <h3>{detail.today.title}</h3>
          {detail.today.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </motion.div>

        <motion.div
          className="about-outlook-card is-accent"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          <span className="badge">{detail.future.badge}</span>
          <h3>{detail.future.title}</h3>
          {detail.future.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="about-closing"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="about-closing-line" lang="en">
          {detail.closing}
        </p>
      </motion.div>
    </motion.section>
  )
}
