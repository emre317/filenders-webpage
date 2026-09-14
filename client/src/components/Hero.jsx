import { motion, useMotionValue, useSpring } from 'framer-motion'
import logo from '../assets/logo.png'
import { ArrowRightIcon } from './icons'
import PathDrawingText from './PathDrawingText'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'

export default function Hero({ onOpenIndustries }) {
  const { t, lang } = useLanguage()
  const sectors = t('industries.sectors')
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const glowX = useSpring(mx, { stiffness: 120, damping: 30, mass: 0.6 })
  const glowY = useSpring(my, { stiffness: 120, damping: 30, mass: 0.6 })
  const { ref: visualRef, tiltProps: visualTilt } = useTilt3D(10)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <section className="hero" onMouseMove={handleMouseMove}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <motion.div
        className="hero-cursor-glow"
        aria-hidden="true"
        style={{ left: glowX, top: glowY }}
      />

      <div className="hero-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy"
        >
          <span className="badge">{t('hero.badge')}</span>

          <h1>
            <PathDrawingText
              key={`brand-${lang}`}
              text={t('hero.brand')}
              className="hero-title-draw"
              fontSize={104}
              viewBoxWidth={560}
              viewBoxHeight={130}
              filled
              fromColor="var(--color-accent)"
              toColor="var(--color-danger)"
              fontFamily="'Poppins', 'Inter', system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="0.03em"
              lowercase
            />
          </h1>

          <p className="hero-lede">{t('hero.lede')}</p>

          <div className="hero-actions">
            <a href="#services" className="btn btn-primary btn-lg">
              {t('hero.exploreCta')}
              <ArrowRightIcon width={16} height={16} />
            </a>
            <a href="#contact" className="btn btn-secondary btn-lg">
              {t('hero.contactCta')}
            </a>
          </div>
        </motion.div>

        <motion.div
          ref={visualRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-visual"
          {...visualTilt}
        >
          <div className="hero-logo-ring" aria-hidden="true" />
          <span className="hero-spark-field" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="hero-spark"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-135%)`,
                  transitionDelay: `${i * 35}ms`,
                }}
              />
            ))}
          </span>
          <div className="hero-orbit" aria-hidden="false">
            {sectors.map((sector, i) => {
              const angle = (360 / sectors.length) * i
              return (
                <div key={sector.id} className="hero-orbit-slot" style={{ transform: `rotate(${angle}deg)` }}>
                  <div className="hero-orbit-counter">
                    <a
                      href="#industries"
                      className="hero-orbit-item"
                      style={{ transform: `rotate(${-angle}deg)` }}
                      onClick={(e) => {
                        e.preventDefault()
                        onOpenIndustries?.(sector.id)
                      }}
                    >
                      {sector.key}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
          <motion.img
            src={logo}
            alt="Filenders"
            className="hero-logo"
            animate={{ rotate: 360 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
              scale: { type: 'spring', stiffness: 260, damping: 16 },
            }}
          />
          <span className="hero-tagline">{t('hero.tagline')}</span>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span />
      </motion.div>
    </section>
  )
}
