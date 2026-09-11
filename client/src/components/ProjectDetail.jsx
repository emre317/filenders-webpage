import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import projectVideo from '../assets/divisions/project.mp4'
import projectPortVideo from '../assets/divisions/project-port.mp4'
import {
  ArrowRightIcon,
  CheckIcon,
  ClipboardIcon,
  WeightIcon,
  ShipIcon,
  TruckIcon,
  BoxIcon,
  RouteIcon,
  TrailerIcon,
  CompassIcon,
  LinkIcon,
  AnchorIcon,
  BuildingIcon,
  EyeIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]

const categoryIcons = {
  management: ClipboardIcon,
  heavy: WeightIcon,
  breakbulk: ShipIcon,
  roro: TruckIcon,
  oog: BoxIcon,
  multimodal: RouteIcon,
  road: TrailerIcon,
  survey: CompassIcon,
  lifting: LinkIcon,
  port: AnchorIcon,
  industries: BuildingIcon,
  control: EyeIcon,
}

const heroVideos = [projectPortVideo, projectVideo]

function HeroVideoCrossfade({ sources, interval = 8000 }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (sources.length < 2) return undefined
    const id = setInterval(() => setActive((i) => (i + 1) % sources.length), interval)
    return () => clearInterval(id)
  }, [sources, interval])

  return (
    <div className="project-hero-video" aria-hidden="true">
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
  )
}

function CategoryCard({ category, index, open, onToggle }) {
  const Icon = categoryIcons[category.id]
  const isOpen = open === category.id
  const { ref, tiltProps, glowX, glowY } = useTilt3D(4)

  return (
    <motion.div
      ref={ref}
      className={`project-category ${isOpen ? 'is-open' : ''}`}
      initial={{ opacity: 0, y: 18, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: EASE }}
      {...tiltProps}
    >
      <motion.span className="tilt-glow" aria-hidden="true" style={{ left: glowX, top: glowY }} />
      <button type="button" className="project-category-head" onClick={() => onToggle(category.id)}>
        <span className="project-category-icon">
          <Icon width={20} height={20} />
        </span>
        <span className="project-category-titles">
          <span className="project-category-title">{category.title}</span>
          <span className="project-category-teaser">{category.teaser}</span>
        </span>
        <motion.span
          className="project-category-chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-hidden="true"
        >
          <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(90deg)' }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="project-category-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="project-category-body-inner">
              <p>{category.body}</p>
              {category.bullets.length > 0 && (
                <ul className="project-category-bullets">
                  {category.bullets.map((bullet) => (
                    <li key={bullet}>
                      <CheckIcon width={14} height={14} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ProjectDetail({ division, contactCta }) {
  const { t } = useLanguage()
  const detail = t('projectDetail')
  const [open, setOpen] = useState(detail.categories[0]?.id ?? null)

  const toggle = (id) => setOpen((current) => (current === id ? null : id))

  return (
    <div className="project-detail">
      <div className="project-hero">
        <HeroVideoCrossfade sources={heroVideos} />
        <motion.div
          className="project-hero-content"
          initial={{ opacity: 0, y: 24, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ transformPerspective: 1000 }}
        >
          <h2 className="text-gradient">{division.title}</h2>
          <p>{division.tagline}</p>
        </motion.div>
      </div>

      <motion.div
        className="project-intro"
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

      <div className="project-category-list">
        {detail.categories.map((category, i) => (
          <CategoryCard key={category.id} category={category} index={i} open={open} onToggle={toggle} />
        ))}
      </div>

      <motion.div
        className="project-whyus"
        initial={{ opacity: 0, y: 18, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <h3>{detail.whyUs.title}</h3>
        <div className="project-whyus-grid">
          {detail.whyUs.points.map((point) => (
            <span key={point} className="project-whyus-item">
              <CheckIcon width={15} height={15} />
              {point}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="project-closing"
        initial={{ opacity: 0, y: 18, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="project-closing-line">{detail.closing.line1}</p>
        <p className="project-closing-tagline" lang="en">
          {detail.closing.line2}
        </p>
        <a href="#contact" className="btn btn-primary btn-lg">
          {contactCta}
          <ArrowRightIcon width={16} height={16} />
        </a>
      </motion.div>
    </div>
  )
}
