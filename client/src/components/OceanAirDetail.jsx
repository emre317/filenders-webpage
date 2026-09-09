import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import oceanCraneVideo from '../assets/divisions/ocean-crane-load.mp4'
import oceanShipSeaVideo from '../assets/divisions/ocean-ship-sea.mp4'
import oceanSunsetVideo from '../assets/divisions/ocean-port-sunset.mp4'
import oceanBulkVideo from '../assets/divisions/ocean-bulk-ship.mp4'
import oceanTerminalVideo from '../assets/divisions/ocean-terminal.mp4'
import oceanAerialVideo from '../assets/divisions/ocean-ship-aerial.mp4'
import airTarmacVideo from '../assets/divisions/air-tarmac.mp4'
import {
  ArrowRightIcon,
  CheckIcon,
  ShipIcon,
  PlaneIcon,
  BoxIcon,
  WarehouseIcon,
  FlagIcon,
  MapPinIcon,
  LinkIcon,
  BuildingIcon,
  CompassIcon,
  RouteIcon,
  EyeIcon,
  ShieldIcon,
  CpuIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]
const whyUsIcons = [CompassIcon, ShieldIcon, RouteIcon, CpuIcon, BoxIcon]

const serviceIcons = {
  doorToDoor: MapPinIcon,
  crossTrade: LinkIcon,
  nvocc: BuildingIcon,
  importExport: CompassIcon,
  optimisation: RouteIcon,
  visibility: EyeIcon,
}

const serviceVideos = {
  doorToDoor: oceanCraneVideo,
  crossTrade: oceanShipSeaVideo,
  nvocc: oceanTerminalVideo,
  importExport: oceanBulkVideo,
  optimisation: oceanAerialVideo,
  visibility: airTarmacVideo,
}

function HeroSplit({ title, tagline }) {
  return (
    <div className="oa-hero">
      <div className="oa-hero-half oa-hero-ocean">
        <video src={oceanSunsetVideo} autoPlay muted loop playsInline preload="metadata" />
      </div>
      <div className="oa-hero-half oa-hero-air">
        <video src={airTarmacVideo} autoPlay muted loop playsInline preload="metadata" />
      </div>
      <div className="oa-hero-seam" aria-hidden="true" />
      <motion.div
        className="oa-hero-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      >
        <h2>{title}</h2>
        <p>{tagline}</p>
      </motion.div>
    </div>
  )
}

function BulletList({ bullets }) {
  return (
    <ul className="oa-bullets">
      {bullets.map((bullet) => (
        <li key={bullet}>
          <CheckIcon width={13} height={13} />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
}

function CargoSlider({ fcl, lcl, badgeLabel }) {
  const [active, setActive] = useState('fcl')
  const tabs = [
    { id: 'fcl', title: fcl.title, icon: BoxIcon },
    { id: 'lcl', title: lcl.title, icon: WarehouseIcon },
  ]
  const items = {
    fcl: { title: fcl.title, body: fcl.body, bullets: fcl.bullets, video: oceanCraneVideo },
    lcl: { title: lcl.title, body: lcl.body, bullets: [], video: oceanShipSeaVideo },
  }
  const current = items[active]

  return (
    <div className="oa-cargo-slider">
      <div className="oa-cargo-copy">
        <div className="oa-cargo-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              className={`oa-cargo-tab ${tab.id === active ? 'is-active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              <span className="oa-cargo-tab-icon">
                <tab.icon width={16} height={16} />
              </span>
              {tab.title}
            </button>
          ))}
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="oa-cargo-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p>{current.body}</p>
            {current.bullets.length > 0 && <BulletList bullets={current.bullets} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="oa-cargo-stack">
        <span className="oa-cargo-ghost" aria-hidden="true" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="oa-cargo-card"
            initial={{ opacity: 0, y: 46, rotate: -5, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: -36, rotate: 5, scale: 0.94 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <video src={current.video} autoPlay muted loop playsInline preload="metadata" />
            <span className="oa-cargo-shade" aria-hidden="true" />
            <span className="oa-cargo-live">
              <span className="oa-cargo-dot" aria-hidden="true" />
              {badgeLabel}
            </span>
            <span className="oa-cargo-caption">{current.title}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function OceanPanel({ data }) {
  return (
    <div className="oa-panel">
      <p className="oa-panel-intro">{data.intro}</p>
      <CargoSlider fcl={data.fcl} lcl={data.lcl} badgeLabel={data.cargoBadge} />
      <div className="oa-mode-strip">
        {[oceanBulkVideo, oceanTerminalVideo, oceanAerialVideo].map((src) => (
          <div className="oa-mode-strip-tile" key={src}>
            <video src={src} autoPlay muted loop playsInline preload="metadata" />
          </div>
        ))}
      </div>
    </div>
  )
}

function AirPanel({ data }) {
  return (
    <div className="oa-panel">
      <p className="oa-panel-intro">{data.intro}</p>
      <div className="oa-mode-grid oa-mode-grid-single">
        <div className="oa-mode-card is-wide">
          <div className="oa-mode-media">
            <video src={airTarmacVideo} autoPlay muted loop playsInline preload="metadata" />
          </div>
          <div className="oa-mode-body">
            <span className="oa-mode-icon">
              <FlagIcon width={20} height={20} />
            </span>
            <h4>{data.priority.title}</h4>
            <p>{data.priority.body}</p>
            <BulletList bullets={data.priority.bullets} />
          </div>
        </div>
      </div>
    </div>
  )
}

function NetworkHub({ network }) {
  return (
    <div className="oa-network">
      <div className="oa-network-radial">
        <span className="oa-network-hub" aria-hidden="true">
          <CompassIcon width={22} height={22} />
        </span>
        {network.regions.map((region, i) => {
          const angle = (360 / network.regions.length) * i
          return (
            <span
              key={region}
              className="oa-network-node"
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translate(130px) rotate(-${angle}deg)` }}
            >
              {region}
            </span>
          )
        })}
      </div>
      <div className="oa-network-copy">
        <h3>{network.title}</h3>
        <p>{network.lede}</p>
      </div>
    </div>
  )
}

function NetworkServiceSlider({ services, badgeLabel }) {
  const [active, setActive] = useState(services[0].id)
  const currentIndex = services.findIndex((s) => s.id === active)
  const current = services[currentIndex]
  const ghost1 = services[(currentIndex + 1) % services.length]
  const CurrentIcon = serviceIcons[current.id]
  const Ghost1Icon = serviceIcons[ghost1.id]

  return (
    <div className="oa-service-slider">
      <div className="oa-service-tabs" role="tablist">
        {services.map((item) => {
          const TabIcon = serviceIcons[item.id]
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`oa-service-tab ${item.id === active ? 'is-active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <span className="oa-service-tab-icon">
                <TabIcon width={16} height={16} />
              </span>
              {item.title}
            </button>
          )
        })}
      </div>

      <div className="oa-service-stack">
        <span className="oa-service-ghost ghost-2" aria-hidden="true" />
        <span className="oa-service-ghost ghost-1" aria-hidden="true">
          <span className="oa-service-ghost-icon">
            <Ghost1Icon width={16} height={16} />
          </span>
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="oa-service-stack-card"
            initial={{ opacity: 0, y: 46, rotate: -5, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: -36, rotate: 5, scale: 0.94 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <video src={serviceVideos[current.id]} autoPlay muted loop playsInline preload="metadata" />
            <span className="oa-service-shade" aria-hidden="true" />
            <span className="oa-service-live">
              <span className="oa-service-dot" aria-hidden="true" />
              {badgeLabel}
            </span>
            <span className="oa-service-stack-icon">
              <CurrentIcon width={22} height={22} />
            </span>
            <div className="oa-service-caption">
              <h4>{current.title}</h4>
              <p>{current.body}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function OceanAirDetail({ division, contactCta }) {
  const { t } = useLanguage()
  const detail = t('oceanAirDetail')
  const [mode, setMode] = useState('ocean')

  return (
    <div className="oa-detail">
      <HeroSplit title={division.title} tagline={division.tagline} />

      <div className="oa-hero-actions">
        <span className="badge">{detail.badge}</span>
        <a href="#iletisim" className="btn btn-primary btn-lg">
          {contactCta}
          <ArrowRightIcon width={16} height={16} />
        </a>
      </div>

      <motion.div
        className="oa-intro"
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

      <div className="oa-toggle-wrap">
        <div className="oa-toggle" role="tablist">
          <motion.span
            className="oa-toggle-thumb"
            animate={{ x: mode === 'ocean' ? '0%' : '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
          />
          <button
            type="button"
            role="tab"
            className={mode === 'ocean' ? 'is-active' : ''}
            onClick={() => setMode('ocean')}
          >
            <ShipIcon width={16} height={16} />
            {detail.modeLabels.ocean}
          </button>
          <button
            type="button"
            role="tab"
            className={mode === 'air' ? 'is-active' : ''}
            onClick={() => setMode('air')}
          >
            <PlaneIcon width={16} height={16} />
            {detail.modeLabels.air}
          </button>
        </div>
      </div>

      <div className="oa-flip-stage">
        <AnimatePresence mode="wait">
          {mode === 'ocean' ? (
            <motion.div
              key="ocean"
              initial={{ opacity: 0, rotateX: -12 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ transformPerspective: 1200 }}
            >
              <OceanPanel data={detail.ocean} />
            </motion.div>
          ) : (
            <motion.div
              key="air"
              initial={{ opacity: 0, rotateX: -12 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ transformPerspective: 1200 }}
            >
              <AirPanel data={detail.air} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <NetworkHub network={detail.network} />

        <NetworkServiceSlider services={detail.network.services} badgeLabel={detail.network.stackBadge} />
      </motion.div>

      <motion.div
        className="oa-whyus"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3>{detail.whyUs.title}</h3>
        <div className="oa-whyus-marquee">
          <div className="oa-whyus-track">
            {[...detail.whyUs.points, ...detail.whyUs.points].map((point, i) => {
              const Icon = whyUsIcons[i % detail.whyUs.points.length]
              return (
                <span className="oa-whyus-pill" key={`${point}-${i}`}>
                  <span className="oa-whyus-pill-icon">
                    <Icon width={16} height={16} />
                  </span>
                  {point}
                </span>
              )
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="oa-closing"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <video
          className="oa-closing-video"
          src={oceanSunsetVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className="oa-closing-overlay" aria-hidden="true" />
        <div className="oa-closing-content">
          <p className="oa-closing-line">{detail.closing.line1}</p>
          <p className="oa-closing-tagline">{detail.closing.line2}</p>
          <a href="#iletisim" className="btn btn-primary btn-lg">
            {contactCta}
            <ArrowRightIcon width={16} height={16} />
          </a>
        </div>
      </motion.div>
    </div>
  )
}
