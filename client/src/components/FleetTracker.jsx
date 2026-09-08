import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TruckIcon } from './icons'
import groundPhoto from '../assets/divisions/ground.jpg'
import PhotoBackdrop from './PhotoBackdrop'
import { useLanguage } from '../i18n/LanguageContext'

const STOP_POSITIONS = [4, 27, 50, 73, 96]

function CountUp({ value, suffix = '', duration = 1.6 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - (1 - t) ** 3
      setDisplay(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

export default function FleetTracker() {
  const { t } = useLanguage()
  const routeDuration = 9
  const STOPS = t('fleet.stops').map((label, i) => ({ label, x: STOP_POSITIONS[i] }))
  const STATS = t('fleet.stats')

  return (
    <div className="fleet-tracker">
      <PhotoBackdrop src={groundPhoto} duration={24} />
      <div className="fleet-road">
        <div className="fleet-road-line" />

        {STOPS.map((stop) => (
          <div key={stop.label} className="fleet-stop" style={{ left: `${stop.x}%` }}>
            <span
              className="fleet-stop-dot"
              style={{
                animationDelay: `${(stop.x / 100) * routeDuration}s`,
                animationDuration: `${routeDuration}s`,
              }}
            />
            <span className="fleet-stop-label">{stop.label}</span>
          </div>
        ))}

        <motion.div
          className="fleet-truck"
          animate={{ left: ['2%', '96%'] }}
          transition={{ duration: routeDuration, repeat: Infinity, ease: 'linear' }}
        >
          <motion.span
            className="fleet-truck-body"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TruckIcon width={22} height={22} />
          </motion.span>
        </motion.div>
      </div>

      <div className="fleet-stats">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="fleet-stat">
            <span className="fleet-stat-value">
              <CountUp value={stat.value} suffix={stat.suffix} duration={1.4 + i * 0.2} />
            </span>
            <span className="fleet-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
