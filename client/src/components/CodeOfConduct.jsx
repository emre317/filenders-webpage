import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import {
  ArrowRightIcon,
  ClipboardIcon,
  CheckIcon,
  ShieldIcon,
  FlagIcon,
  UsersIcon,
  ThermometerIcon,
  RouteIcon,
  DatabaseIcon,
  BuildingIcon,
  MailIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]

const pillarIcons = {
  scope: ClipboardIcon,
  principles: CheckIcon,
  anticorruption: ShieldIcon,
  fairtrade: FlagIcon,
  partners: UsersIcon,
  people: ThermometerIcon,
  environment: RouteIcon,
  data: DatabaseIcon,
  assets: BuildingIcon,
  governance: MailIcon,
}

function PillarCard({ pillar, index }) {
  const Icon = pillarIcons[pillar.id]
  const { ref, tiltProps, glowX, glowY } = useTilt3D(6)

  return (
    <motion.div
      ref={ref}
      className="coc-pillar-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.07, ease: EASE }}
      {...tiltProps}
    >
      <motion.span className="tilt-glow" aria-hidden="true" style={{ left: glowX, top: glowY }} />
      <span className="coc-pillar-icon">
        <Icon width={20} height={20} />
      </span>
      <h4>{pillar.title}</h4>
      <p>{pillar.body}</p>
    </motion.div>
  )
}

export default function CodeOfConduct({ onBack }) {
  const { t } = useLanguage()
  const detail = t('codeOfConduct')

  useEffect(() => {
    document.getElementById('code-of-conduct')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.section
      id="code-of-conduct"
      className="legal-page coc-page"
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
        <p className="coc-subtitle">{detail.subtitle}</p>
        <p className="legal-updated">{detail.version}</p>
        {detail.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="legal-intro">
            {paragraph}
          </p>
        ))}

        <a
          className="btn btn-primary btn-lg coc-download-btn"
          href={detail.download.file}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          {detail.download.label}
          <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(90deg)' }} />
        </a>
        <span className="coc-download-meta">{detail.download.meta}</span>
      </motion.div>

      <div className="coc-pillar-grid">
        {detail.pillars.map((pillar, i) => (
          <PillarCard key={pillar.id} pillar={pillar} index={i} />
        ))}
      </div>

      <motion.div
        className="coc-decision-test"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3>{detail.decisionTest.title}</h3>
        <p className="coc-decision-intro">{detail.decisionTest.intro}</p>
        <ul className="coc-decision-questions">
          {detail.decisionTest.questions.map((question, i) => (
            <li key={question}>
              <span className="coc-decision-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{question}</span>
            </li>
          ))}
        </ul>
        <p className="coc-decision-resolution">{detail.decisionTest.resolution}</p>
        <span className="coc-decision-tagline" lang="en">
          {detail.decisionTest.tagline}
        </span>
      </motion.div>

      <motion.p
        className="legal-note coc-closing-quote"
        lang="en"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {detail.closingQuote}
      </motion.p>
    </motion.section>
  )
}
