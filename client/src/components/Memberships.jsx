import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import { LinkIcon, CompassIcon, WeightIcon, CpuIcon, AnchorIcon, UsersIcon, ArrowRightIcon } from './icons'

const EASE = [0.16, 1, 0.3, 1]

const orgIcons = {
  lojider: LinkIcon,
  utikad: CompassIcon,
  ymb: WeightIcon,
  technoscope: CpuIcon,
  mto: AnchorIcon,
  filenetwork: UsersIcon,
}

function ghostText(shortName) {
  const words = shortName.trim().split(/\s+/)
  if (words.length > 1) return words.map((w) => w[0]).join('').toUpperCase().slice(0, 4)
  return shortName.slice(0, 3).toUpperCase()
}

function OrgCard({ item, index }) {
  const Icon = orgIcons[item.id]
  const { ref, tiltProps, glowX, glowY } = useTilt3D(6)

  return (
    <motion.a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="org-card"
      initial={{ opacity: 0, y: 22, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      {...tiltProps}
      style={{ ...tiltProps.style, transformPerspective: 1000 }}
    >
      <motion.span className="tilt-glow" aria-hidden="true" style={{ left: glowX, top: glowY }} />
      <span className="org-card-ghost" aria-hidden="true">
        {ghostText(item.shortName)}
      </span>
      <span className="org-card-icon">
        <Icon width={22} height={22} />
      </span>
      <span className="org-card-tag">{item.shortName}</span>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span className="org-card-link" aria-hidden="true">
        <LinkIcon width={14} height={14} />
      </span>
    </motion.a>
  )
}

export default function Memberships({ onBack }) {
  const { t } = useLanguage()
  const items = t('memberships.items')
  const loop = [...items, ...items]

  useEffect(() => {
    document.getElementById('uyelikler')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.section
      id="uyelikler"
      className="memberships"
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ transformPerspective: 1400 }}
    >
      <button type="button" className="division-back" onClick={onBack}>
        <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        {t('memberships.back')}
      </button>

      <motion.div
        className="memberships-head"
        initial={{ opacity: 0, y: 22, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <span className="badge">{t('memberships.badge')}</span>
        <h2>{t('memberships.title')}</h2>
        <p>{t('memberships.lede')}</p>
      </motion.div>

      <div className="memberships-marquee" aria-hidden="true">
        <div className="memberships-marquee-track">
          {loop.map((item, i) => {
            const Icon = orgIcons[item.id]
            return (
              <span className="memberships-marquee-item" key={`${item.id}-${i}`}>
                <Icon width={16} height={16} />
                {item.shortName}
              </span>
            )
          })}
        </div>
      </div>

      <div className="org-grid">
        {items.map((item, i) => (
          <OrgCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  )
}
