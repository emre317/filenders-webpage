import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import {
  ArrowRightIcon,
  CheckIcon,
  TrailerIcon,
  CraneIcon,
  AnchorIcon,
  BuildingIcon,
  WeightIcon,
  TruckIcon,
  ClipboardIcon,
  ShieldIcon,
  ShipIcon,
  FlagIcon,
  UsersIcon,
  ThermometerIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]

export const sectorIcons = {
  automotive: TrailerIcon,
  energy: CraneIcon,
  oilgas: AnchorIcon,
  industrial: BuildingIcon,
  construction: WeightIcon,
  machinery: TruckIcon,
  chemicals: ClipboardIcon,
  healthcare: ShieldIcon,
  marine: ShipIcon,
  defense: FlagIcon,
  humanitarian: UsersIcon,
  food: ThermometerIcon,
}

function SectorTab({ sector, index, active, onSelect }) {
  const Icon = sectorIcons[sector.id]
  return (
    <button
      type="button"
      role="tab"
      className={`ind-tab ${active ? 'is-active' : ''}`}
      onClick={() => onSelect(sector.id)}
    >
      <span className="ind-tab-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="ind-tab-icon">
        <Icon width={17} height={17} />
      </span>
      <span className="ind-tab-title">{sector.title}</span>
      <ArrowRightIcon width={14} height={14} className="ind-tab-arrow" />
    </button>
  )
}

function SectorPanel({ sector }) {
  const Icon = sectorIcons[sector.id]
  return (
    <motion.div
      key={sector.id}
      className="ind-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <span className="ind-panel-icon">
        <Icon width={26} height={26} />
      </span>
      <span className="ind-panel-eyebrow">{sector.title}</span>
      <h3>{sector.tagline}</h3>
      {sector.body.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
      {sector.bullets.length > 0 && (
        <ul className="ind-panel-bullets">
          {sector.bullets.map((bullet) => (
            <li key={bullet}>
              <CheckIcon width={13} height={13} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default function Industries({ onBack, initialSector }) {
  const { t } = useLanguage()
  const detail = t('industries')
  const contactCta = t('divisions.contactCtaTemplate').replace('{title}', detail.title)
  const [active, setActive] = useState(() =>
    detail.sectors.some((s) => s.id === initialSector) ? initialSector : detail.sectors[0].id,
  )
  const activeSector = detail.sectors.find((s) => s.id === active) ?? detail.sectors[0]

  useEffect(() => {
    document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.section
      id="industries"
      className="industries"
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
        className="industries-head"
        initial={{ opacity: 0, y: 22, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <span className="badge">{detail.badge}</span>
        <h2 className="text-gradient">{detail.title}</h2>
        <p className="industries-tagline">{detail.tagline}</p>
        <div className="industries-intro">
          {detail.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </motion.div>

      <div className="ind-explorer">
        <div className="ind-tabs" role="tablist">
          {detail.sectors.map((sector, i) => (
            <SectorTab
              key={sector.id}
              sector={sector}
              index={i}
              active={sector.id === active}
              onSelect={setActive}
            />
          ))}
        </div>
        <div className="ind-panel-wrap">
          <SectorPanel sector={activeSector} />
        </div>
      </div>

      <motion.div
        className="industries-closing"
        initial={{ opacity: 0, y: 18, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="industries-closing-line">{detail.closing.line1}</p>
        <p className="industries-closing-tagline">{detail.closing.line2}</p>
        <a href="#contact" className="btn btn-primary btn-lg">
          {contactCta}
          <ArrowRightIcon width={16} height={16} />
        </a>
      </motion.div>
    </motion.section>
  )
}
