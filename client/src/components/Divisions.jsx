import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import logo from '../assets/logo.png'
import RouteMap from './RouteMap'
import FleetTracker from './FleetTracker'
import ProjectDetail from './ProjectDetail'
import TechDetail from './TechDetail'
import freightPhoto from '../assets/divisions/freight.jpg'
import groundPhoto from '../assets/divisions/ground.jpg'
import projectPhoto from '../assets/divisions/project.jpg'
import projectVideo from '../assets/divisions/project.mp4'
import teknolojiVideo from '../assets/divisions/teknoloji.mp4'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import useOrbitRotation from '../hooks/useOrbitRotation'
import {
  PlaneIcon,
  CpuIcon,
  TruckIcon,
  CraneIcon,
  ShieldIcon,
  RouteIcon,
  WarehouseIcon,
  CodeIcon,
  DatabaseIcon,
  ArrowRightIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]

const divisionMeta = {
  freight: {
    icon: PlaneIcon,
    photo: freightPhoto,
    fx: 'wave',
    featureIcons: [PlaneIcon, WarehouseIcon, ShieldIcon, RouteIcon],
  },
  teknoloji: {
    icon: CpuIcon,
    photo: null,
    video: teknolojiVideo,
    featureIcons: [CodeIcon, CpuIcon, DatabaseIcon, ShieldIcon],
  },
  ground: {
    icon: TruckIcon,
    photo: groundPhoto,
    fx: 'speed',
    featureIcons: [TruckIcon, WarehouseIcon, RouteIcon, ShieldIcon],
  },
  project: {
    icon: CraneIcon,
    photo: projectPhoto,
    video: projectVideo,
    fx: 'cargo',
    featureIcons: [CraneIcon, RouteIcon, WarehouseIcon, ShieldIcon],
  },
}

const order = ['freight', 'teknoloji', 'ground', 'project']

function useDivision(id) {
  const { t } = useLanguage()
  const meta = divisionMeta[id]
  const text = t(`divisions.items.${id}`)
  return {
    ...meta,
    ...text,
    features: text.features.map((feature, i) => ({ ...feature, icon: meta.featureIcons[i] })),
  }
}

function SpeedFx() {
  return (
    <span className="fx-speed" aria-hidden="true">
      {[18, 38, 58, 74].map((top, i) => (
        <span key={i} style={{ top: `${top}%`, animationDelay: `${i * 0.45}s` }} />
      ))}
    </span>
  )
}

function CargoFx() {
  return (
    <span className="fx-cargo" aria-hidden="true">
      {[12, 34, 58, 78].map((left, i) => (
        <span key={i} style={{ left: `${left}%`, animationDelay: `${i * 0.9}s` }} />
      ))}
    </span>
  )
}

function WaveFx() {
  return (
    <span className="fx-wave" aria-hidden="true">
      <span />
    </span>
  )
}

function DivisionMedia({ division }) {
  if (division.video) {
    return (
      <span className="compass-node-media">
        <video src={division.video} autoPlay muted loop playsInline preload="metadata" />
      </span>
    )
  }

  return (
    <span className="compass-node-media">
      <img src={division.photo} alt="" loading="lazy" />
      {division.fx === 'speed' && <SpeedFx />}
      {division.fx === 'cargo' && <CargoFx />}
      {division.fx === 'wave' && <WaveFx />}
    </span>
  )
}

function FeatureCard({ feature, index }) {
  const { ref, tiltProps, glowX, glowY } = useTilt3D(7)

  return (
    <motion.div
      ref={ref}
      className="division-feature-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.07, ease: EASE }}
      {...tiltProps}
    >
      <motion.span className="tilt-glow" aria-hidden="true" style={{ left: glowX, top: glowY }} />
      <span className="division-feature-icon">
        <feature.icon width={18} height={18} />
      </span>
      <h4>{feature.label}</h4>
      <p>{feature.desc}</p>
    </motion.div>
  )
}

function DetailPanel({ id, onBack }) {
  const { t } = useLanguage()
  const division = useDivision(id)
  const contactCta = t('divisions.contactCtaTemplate').replace('{title}', division.title)

  return (
    <motion.div
      key={id}
      className="division-detail"
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -24, rotateX: -8 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ transformPerspective: 1400 }}
    >
      <button type="button" className="division-back" onClick={onBack}>
        <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        {t('divisions.back')}
      </button>

      {id === 'project' ? (
        <ProjectDetail division={division} contactCta={contactCta} />
      ) : id === 'teknoloji' ? (
        <TechDetail division={division} contactCta={contactCta} />
      ) : (
        <>
          {id === 'freight' && <RouteMap />}
          {id === 'ground' && <FleetTracker />}

          <div className="division-detail-head">
            <span className="division-detail-icon">
              <division.icon width={30} height={30} />
            </span>
            <div>
              <h2>{division.title}</h2>
            </div>
          </div>

          <p className="division-desc">{division.description}</p>

          <div className="division-feature-grid">
            {division.features.map((feature, i) => (
              <FeatureCard key={feature.label} feature={feature} index={i} />
            ))}
          </div>

          <a href="#iletisim" className="btn btn-primary btn-lg">
            {contactCta}
            <ArrowRightIcon width={16} height={16} />
          </a>
        </>
      )}
    </motion.div>
  )
}

function CompassNode({ id, position, onSelect, counterRotate }) {
  const { t } = useLanguage()
  const division = useDivision(id)
  const ref = useRef(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  })
  const glowX = useTransform(mx, [-0.5, 0.5], ['20%', '80%'])
  const glowY = useTransform(my, [-0.5, 0.5], ['20%', '80%'])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      id={id}
      className={`compass-node node-${position}`}
      onClick={() => onSelect(id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ rotateX, rotateY, rotate: counterRotate, transformPerspective: 900 }}
    >
      <DivisionMedia division={division} />
      <span className="compass-node-overlay" aria-hidden="true" />
      <span className="compass-node-live" aria-hidden="true" />
      <motion.span
        className="compass-node-glow"
        aria-hidden="true"
        style={{ left: glowX, top: glowY }}
      />

      <span className="compass-node-content">
        <span className="compass-node-icon">
          <division.icon width={24} height={24} />
        </span>
        <h3>{division.title}</h3>
        <p>{division.tagline}</p>
        <span className="compass-node-cta">
          {t('divisions.viewDetails')}
          <ArrowRightIcon width={14} height={14} />
        </span>
      </span>
    </motion.button>
  )
}

export default function Divisions({ active, onActiveChange }) {
  const { t } = useLanguage()
  const setActive = onActiveChange
  const [orbitEnabled, setOrbitEnabled] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 880px)')
    const update = () => setOrbitEnabled(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const ringRotateRaw = useOrbitRotation(130)
  const ringRotate = useTransform(ringRotateRaw, (r) => (orbitEnabled ? r : 0))
  const counterRotate = useTransform(ringRotate, (r) => -r)
  const logoSpin = useOrbitRotation(50)
  const logoRotate = useTransform([logoSpin, ringRotate], ([spin, ring]) => spin - ring)

  return (
    <section id="bolumler" className="divisions">
      {!active && (
        <motion.div
          className="divisions-head"
          initial={{ opacity: 0, y: 20, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ transformPerspective: 1000 }}
        >
          <span className="badge">{t('divisions.badge')}</span>
          <h2>{t('divisions.title')}</h2>
          <p>{t('divisions.subtitle')}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {!active ? (
          <motion.div
            key="compass"
            className="compass"
            initial={{ opacity: 0, rotateY: -12 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 12, position: 'absolute' }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ transformPerspective: 1600 }}
          >
            <motion.div className="compass-ring" style={{ rotate: ringRotate }}>
              <CompassNode id={order[0]} position="north" onSelect={setActive} counterRotate={counterRotate} />
              <CompassNode id={order[3]} position="west" onSelect={setActive} counterRotate={counterRotate} />

              <motion.div
                className="compass-hub"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="compass-line compass-line-n" />
                <span className="compass-line compass-line-s" />
                <span className="compass-line compass-line-e" />
                <span className="compass-line compass-line-w" />

                <span className="compass-orbit" aria-hidden="true">
                  <span className="compass-orbit-dot dot-1" />
                  <span className="compass-orbit-dot dot-2" />
                  <span className="compass-orbit-dot dot-3" />
                </span>

                <span className="compass-glow" aria-hidden="true" />
                <span className="compass-ping ping-1" aria-hidden="true" />
                <span className="compass-ping ping-2" aria-hidden="true" />

                <motion.img
                  src={logo}
                  alt="Filenders"
                  className="compass-logo"
                  style={{ rotate: logoRotate }}
                />
              </motion.div>

              <CompassNode id={order[1]} position="east" onSelect={setActive} counterRotate={counterRotate} />
              <CompassNode id={order[2]} position="south" onSelect={setActive} counterRotate={counterRotate} />
            </motion.div>
          </motion.div>
        ) : (
          <DetailPanel key={active} id={active} onBack={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
