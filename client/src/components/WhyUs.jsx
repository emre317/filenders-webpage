import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldIcon, RouteIcon, CpuIcon, TruckIcon } from './icons'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import freightPhoto from '../assets/divisions/freight.jpg'
import groundPhoto from '../assets/divisions/ground.jpg'
import techPhoto from '../assets/divisions/tech.jpg'
import projectPhoto from '../assets/divisions/project.jpg'

const pointIcons = [ShieldIcon, RouteIcon, CpuIcon, TruckIcon]
const pointPhotos = [freightPhoto, groundPhoto, techPhoto, projectPhoto]
const EASE = [0.16, 1, 0.3, 1]

function WhyUsRow({ point, index, reverse }) {
  const rowRef = useRef(null)
  const { ref: photoRef, tiltProps, glowX, glowY } = useTilt3D(8)

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 90%', 'center center'],
  })

  const reveal = useTransform(
    scrollYProgress,
    [0, 0.75],
    reverse ? ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'] : ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  )
  const photoOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const photoScale = useTransform(scrollYProgress, [0, 0.75], [1.12, 1])
  const textX = useTransform(scrollYProgress, [0, 1], [reverse ? 32 : -32, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const numOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.5])

  return (
    <div ref={rowRef} className={`whyus-row ${reverse ? 'is-reverse' : ''}`}>
      <motion.div className="whyus-row-copy" style={{ x: textX, opacity: textOpacity }}>
        <span className="whyus-row-num" aria-hidden="true">
          <motion.span style={{ opacity: numOpacity }}>{String(index + 1).padStart(2, '0')}</motion.span>
        </span>
        <span className="whyus-row-icon">
          <point.icon width={24} height={24} />
        </span>
        <h3>{point.title}</h3>
        <p>{point.description}</p>
      </motion.div>

      <motion.div
        ref={photoRef}
        className="whyus-row-media"
        style={{ ...tiltProps.style, clipPath: reveal }}
        onMouseMove={tiltProps.onMouseMove}
        onMouseLeave={tiltProps.onMouseLeave}
      >
        <motion.span className="tilt-glow" aria-hidden="true" style={{ left: glowX, top: glowY }} />
        <motion.img
          src={pointPhotos[index]}
          alt=""
          loading="lazy"
          style={{ opacity: photoOpacity, scale: photoScale }}
        />
        <span className="whyus-row-media-frame" aria-hidden="true" />
      </motion.div>
    </div>
  )
}

export default function WhyUs() {
  const { t } = useLanguage()
  const points = t('whyus.points').map((point, i) => ({ ...point, icon: pointIcons[i] }))

  return (
    <section id="hakkimizda" className="whyus">
      <motion.div
        className="whyus-head"
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ transformPerspective: 1000 }}
      >
        <span className="badge">{t('whyus.badge')}</span>
        <h2>{t('whyus.title')}</h2>
        <p>{t('whyus.lede')}</p>
      </motion.div>

      <div className="whyus-rows">
        {points.map((point, i) => (
          <WhyUsRow key={point.title} point={point} index={i} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
