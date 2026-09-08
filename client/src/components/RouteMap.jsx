import { motion } from 'framer-motion'
import worldMap from '../assets/world-map.svg'
import shipPhoto from '../assets/divisions/freight.jpg'
import PhotoBackdrop from './PhotoBackdrop'

const EASE = [0.16, 1, 0.3, 1]

const HUBS = {
  mersin: { x: 59.6, y: 29.6, label: 'Mersin' },
  rotterdam: { x: 51.25, y: 21.2, label: 'Rotterdam' },
  shanghai: { x: 83.75, y: 32.7, label: 'Shanghai' },
  dubai: { x: 65.4, y: 35.9, label: 'Dubai' },
  newyork: { x: 29.4, y: 27.4, label: 'New York' },
}

const ROUTES = [
  { d: 'M59.6 29.6 Q55.4 17.4 51.25 21.2', hub: HUBS.rotterdam, flowDuration: 4.5, delay: 0 },
  { d: 'M59.6 29.6 Q71.7 21.15 83.75 32.7', hub: HUBS.shanghai, flowDuration: 6.5, delay: 0.9 },
  { d: 'M59.6 29.6 Q62.5 26.75 65.4 35.9', hub: HUBS.dubai, flowDuration: 3.6, delay: 1.6 },
  { d: 'M59.6 29.6 Q44.5 14.5 29.4 27.4', hub: HUBS.newyork, flowDuration: 5.8, delay: 2.3 },
]

export default function RouteMap() {
  return (
    <div className="route-map">
      <PhotoBackdrop src={shipPhoto} duration={26} />
      <img src={worldMap} alt="" className="route-map-bg" />
      <div className="route-map-shade" aria-hidden="true" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="route-map-svg"
        aria-hidden="true"
      >
        {ROUTES.map((route, i) => (
          <motion.path
            key={route.hub.label}
            d={route.d}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 + i * 0.18, ease: EASE }}
          />
        ))}

        {ROUTES.map((route) => (
          <polygon
            key={`arrow-${route.hub.label}`}
            points="-3,-2.2 3,0 -3,2.2"
            fill="var(--color-accent)"
          >
            <animateMotion
              dur={`${route.flowDuration}s`}
              begin={`${route.delay}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={route.d}
            />
          </polygon>
        ))}
      </svg>

      {Object.entries(HUBS).map(([key, hub], i) => (
        <motion.div
          key={key}
          className={`route-map-hub ${key === 'mersin' ? 'is-origin' : ''}`}
          style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}
        >
          <span className="route-map-hub-dot" />
          <span className="route-map-hub-label">{hub.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
