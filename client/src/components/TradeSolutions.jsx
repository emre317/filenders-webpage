import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  BuildingIcon,
  RouteIcon,
  FlagIcon,
  CoinsIcon,
  ShieldIcon,
  BoxIcon,
  CompassIcon,
  WarehouseIcon,
  MapPinIcon,
  CraneIcon,
  TrailerIcon,
  UsersIcon,
  PlaneIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]

const sectionIcons = {
  'ior-eor': BuildingIcon,
  'transit-customs': RouteIcon,
  'turkish-customs': FlagIcon,
  'eu-fiscal': CoinsIcon,
  'trade-compliance': ShieldIcon,
  'white-glove': BoxIcon,
  'network-design': CompassIcon,
  'regional-hub': WarehouseIcon,
  'difficult-area': MapPinIcon,
  'site-delivery': CraneIcon,
  'temporary-import': TrailerIcon,
  'exhibition-event': UsersIcon,
  emergency: PlaneIcon,
}

function TradeTab({ section, index, active, onSelect }) {
  const Icon = sectionIcons[section.id]
  return (
    <button
      type="button"
      role="tab"
      className={`ind-tab ${active ? 'is-active' : ''}`}
      onClick={() => onSelect(section.id)}
    >
      <span className="ind-tab-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="ind-tab-icon">
        <Icon width={17} height={17} />
      </span>
      <span className="ind-tab-title">{section.title}</span>
      <ArrowRightIcon width={14} height={14} className="ind-tab-arrow" />
    </button>
  )
}

function TradePanel({ section }) {
  const Icon = sectionIcons[section.id]
  return (
    <motion.div
      key={section.id}
      className="ind-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <span className="ind-panel-icon">
        <Icon width={26} height={26} />
      </span>
      <span className="ind-panel-eyebrow">{section.title}</span>
      <h3>{section.tagline}</h3>
      {section.body.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
      {section.bullets.length > 0 && (
        <ul className="ind-panel-bullets trade-panel-bullets">
          {section.bullets.map((bullet) => (
            <li key={bullet}>
              <CheckIcon width={13} height={13} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {section.note && <p className="trade-panel-note">{section.note}</p>}
    </motion.div>
  )
}

function ContactCard({ card, index }) {
  return (
    <motion.a
      href={`mailto:${card.email}`}
      className="trade-contact-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
    >
      <span className="trade-contact-icon">
        <MailIcon width={20} height={20} />
      </span>
      <h4>{card.title}</h4>
      <span className="trade-contact-email">{card.email}</span>
      <p>{card.description}</p>
    </motion.a>
  )
}

export default function TradeSolutions({ onBack }) {
  const { t } = useLanguage()
  const detail = t('trade')
  const [active, setActive] = useState(detail.sections[0].id)
  const activeSection = detail.sections.find((s) => s.id === active) ?? detail.sections[0]

  useEffect(() => {
    document.getElementById('trade')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.section
      id="trade"
      className="trade-page"
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

      <div className="ind-explorer trade-explorer">
        <div className="ind-tabs" role="tablist">
          {detail.sections.map((section, i) => (
            <TradeTab
              key={section.id}
              section={section}
              index={i}
              active={section.id === active}
              onSelect={setActive}
            />
          ))}
        </div>
        <div className="ind-panel-wrap">
          <TradePanel section={activeSection} />
        </div>
      </div>

      <motion.div
        className="trade-contact"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3>{detail.contact.title}</h3>
        <div className="trade-contact-grid">
          {detail.contact.cards.map((card, i) => (
            <ContactCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="industries-closing"
        initial={{ opacity: 0, y: 18, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="industries-closing-line">{detail.closing.line1}</p>
        <p className="industries-closing-tagline" lang="en">
          {detail.closing.line2}
        </p>
        <a href="#contact" className="btn btn-primary btn-lg">
          {t('nav.contactCta')}
          <ArrowRightIcon width={16} height={16} />
        </a>
      </motion.div>
    </motion.section>
  )
}
