import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import techGlobeVideo from '../assets/divisions/tech-globe.mp4'
import techCodeVideo from '../assets/divisions/tech-code.mp4'
import techAiVideo from '../assets/divisions/tech-ai.mp4'
import techWorkstationVideo from '../assets/divisions/tech-workstation.mp4'
import techAiBrainVideo from '../assets/divisions/tech-ai-brain.mp4'
import techAnalyticsVideo from '../assets/divisions/tech-analytics.mp4'
import techControlroomVideo from '../assets/divisions/tech-controlroom.mp4'
import techDashboardVideo from '../assets/divisions/tech-dashboard.mp4'
import {
  ArrowRightIcon,
  CheckIcon,
  EyeIcon,
  CodeIcon,
  ClipboardIcon,
  UsersIcon,
  CompassIcon,
  CpuIcon,
  CoinsIcon,
  DatabaseIcon,
  RouteIcon,
  WarehouseIcon,
  LinkIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]
const FILENTECH_URL = 'https://filentech.com/auth/login'

const moduleIcons = {
  'control-tower': EyeIcon,
  tms: CodeIcon,
  rfq: ClipboardIcon,
  portal: UsersIcon,
  tracking: CompassIcon,
  ai: CpuIcon,
  cost: CoinsIcon,
  analytics: DatabaseIcon,
  optimisation: RouteIcon,
  supplychain: WarehouseIcon,
  ecosystem: LinkIcon,
}

const moduleVideos = {
  globe: techGlobeVideo,
  code: techCodeVideo,
  ai: techAiVideo,
  workstation: techWorkstationVideo,
  'ai-brain': techAiBrainVideo,
  analytics: techAnalyticsVideo,
  controlroom: techControlroomVideo,
  dashboard: techDashboardVideo,
}

function DeviceCrossfade({ sources, interval = 6000 }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % sources.length), interval)
    return () => clearInterval(id)
  }, [sources, interval])

  return (
    <div className="tech-device">
      <div className="tech-device-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="tech-device-screen">
        {sources.map((src, i) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={i === active ? 'is-visible' : ''}
          />
        ))}
      </div>
    </div>
  )
}

function ModulePill({ mod, active, onSelect }) {
  const Icon = moduleIcons[mod.id]
  return (
    <button
      type="button"
      className={`tech-pill ${active ? 'is-active' : ''}`}
      onClick={() => onSelect(mod.id)}
    >
      <span className="tech-pill-icon">
        <Icon width={18} height={18} />
      </span>
      <span className="tech-pill-text">
        <span className="tech-pill-title">{mod.title}</span>
        <span className="tech-pill-teaser">{mod.teaser}</span>
      </span>
    </button>
  )
}

function ModulePanel({ mod }) {
  const Icon = moduleIcons[mod.id]
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={mod.id}
        className="tech-panel"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24, position: 'absolute' }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="tech-panel-media">
          <video src={moduleVideos[mod.video]} autoPlay muted loop playsInline preload="metadata" />
        </div>
        <div className="tech-panel-body">
          <span className="tech-panel-icon">
            <Icon width={22} height={22} />
          </span>
          <h3>{mod.title}</h3>
          <p>{mod.body}</p>
          {mod.bullets.length > 0 && (
            <ul className="tech-panel-bullets">
              {mod.bullets.map((bullet) => (
                <li key={bullet}>
                  <CheckIcon width={14} height={14} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function EcosystemNode({ label, index }) {
  const { ref, tiltProps } = useTilt3D(10)
  return (
    <motion.div
      ref={ref}
      className={`tech-eco-node node-${index}`}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: EASE }}
      {...tiltProps}
    >
      {label}
    </motion.div>
  )
}

export default function TechDetail({ division, contactCta }) {
  const { t } = useLanguage()
  const detail = t('techDetail')
  const [active, setActive] = useState(detail.modules[0].id)
  const activeModule = detail.modules.find((m) => m.id === active) ?? detail.modules[0]
  const heroVideos = [
    techGlobeVideo,
    techWorkstationVideo,
    techCodeVideo,
    techAiBrainVideo,
    techControlroomVideo,
    techAiVideo,
    techDashboardVideo,
    techAnalyticsVideo,
  ]

  return (
    <div className="tech-detail">
      <div className="tech-hero">
        <motion.div
          className="tech-hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="badge tech-hero-badge">{detail.badge}</span>
          <h2 className="tech-hero-brand text-gradient">{detail.brandName}</h2>
          <p className="tech-hero-tagline">{division.tagline}</p>
          <div className="tech-hero-actions">
            <a
              href={FILENTECH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              {detail.loginCta}
              <ArrowRightIcon width={16} height={16} />
            </a>
            <a href="#iletisim" className="btn btn-secondary btn-lg">
              {contactCta}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <DeviceCrossfade sources={heroVideos} />
        </motion.div>
      </div>

      <motion.div
        className="tech-intro"
        initial={{ opacity: 0, y: 18, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        {detail.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </motion.div>

      <div className="tech-explorer">
        <div className="tech-pill-list">
          {detail.modules.map((mod) => (
            <ModulePill key={mod.id} mod={mod} active={mod.id === active} onSelect={setActive} />
          ))}
        </div>
        <div className="tech-panel-wrap">
          <ModulePanel mod={activeModule} />
        </div>
      </div>

      <motion.div
        className="tech-ecosystem"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3>{detail.ecosystem.title}</h3>
        <p>{detail.ecosystem.description}</p>
        <div className="tech-eco-diagram">
          <span className="tech-eco-line line-1" aria-hidden="true" />
          <span className="tech-eco-line line-2" aria-hidden="true" />
          <span className="tech-eco-line line-3" aria-hidden="true" />
          <div className="tech-eco-center">{detail.brandName}</div>
          {detail.ecosystem.nodes.map((node, i) => (
            <EcosystemNode key={node} label={node} index={i} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="tech-whyus"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3>{detail.whyUs.title}</h3>
        <div className="tech-whyus-grid">
          {detail.whyUs.points.map((point, i) => (
            <div key={point} className="tech-whyus-item">
              <span className="tech-whyus-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="tech-closing"
        initial={{ opacity: 0, y: 18, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="tech-closing-line">{detail.closing.line1}</p>
        <p className="tech-closing-tagline">{detail.closing.line2}</p>
        <div className="tech-closing-actions">
          <a href={FILENTECH_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            {detail.loginCta}
            <ArrowRightIcon width={16} height={16} />
          </a>
          <a href="#iletisim" className="btn btn-secondary btn-lg">
            {contactCta}
          </a>
        </div>
      </motion.div>
    </div>
  )
}
