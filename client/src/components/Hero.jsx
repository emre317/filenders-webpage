import { motion, useMotionValue, useSpring } from 'framer-motion'
import logo from '../assets/logo.png'
import { ArrowRightIcon } from './icons'

export default function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const glowX = useSpring(mx, { stiffness: 120, damping: 30, mass: 0.6 })
  const glowY = useSpring(my, { stiffness: 120, damping: 30, mass: 0.6 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <section id="top" className="hero" onMouseMove={handleMouseMove}>
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
          <span className="badge">Lojistik ve Teknolojiyi Bir Araya Getiriyoruz</span>

          <h1>
            Filenders
            <br />
            <span className="text-gradient">Lojistik &amp; Teknoloji</span>
          </h1>

          <p className="hero-lede">
            Yükünüzü güvenle taşıyan lojistik operasyonları ile onu yöneten akıllı
            teknolojiyi tek çatı altında birleştiriyoruz — hızlı, izlenebilir ve
            geleceğe hazır.
          </p>

          <div className="hero-actions">
            <a href="#bolumler" className="btn btn-primary btn-lg">
              Bölümlerimizi Keşfedin
              <ArrowRightIcon width={16} height={16} />
            </a>
            <a href="#iletisim" className="btn btn-secondary btn-lg">
              Bize Ulaşın
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-visual"
        >
          <div className="hero-logo-ring" aria-hidden="true" />
          <motion.img
            src={logo}
            alt="Filenders"
            className="hero-logo"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <span className="hero-tagline">discover the true path</span>
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
