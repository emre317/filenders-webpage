import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt3D from '../hooks/useTilt3D'
import warehouseVideo from '../assets/divisions/road-warehouse.mp4'
import aerialVideo from '../assets/divisions/road-aerial-sunset.mp4'
import mountainVideo from '../assets/divisions/road-mountain.mp4'
import truckPortraitVideo from '../assets/divisions/road-truck-portrait.mp4'
import interchangeVideo from '../assets/divisions/road-interchange.mp4'
import truckFogVideo from '../assets/divisions/road-truck-fog.mp4'
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  TruckIcon,
  BoxIcon,
  ThermometerIcon,
  RouteIcon,
  TrainIcon,
  AnchorIcon,
  ClipboardIcon,
  CraneIcon,
  MapPinIcon,
  EyeIcon,
} from './icons'

const EASE = [0.16, 1, 0.3, 1]

const capabilityIcons = {
  ftl: TruckIcon,
  ltl: BoxIcon,
  reefer: ThermometerIcon,
  transit: RouteIcon,
  roadRail: TrainIcon,
  roroRoad: AnchorIcon,
  crossBorder: ClipboardIcon,
  specialTransport: CraneIcon,
  distribution: MapPinIcon,
  visibility: EyeIcon,
}

const channelVideos = {
  warehouse: warehouseVideo,
  aerial: aerialVideo,
  mountain: mountainVideo,
  interchange: interchangeVideo,
  truckFog: truckFogVideo,
  truckPortrait: truckPortraitVideo,
}

const mosaicTiles = [
  { id: 'a', src: warehouseVideo },
  { id: 'b', src: aerialVideo },
  { id: 'c', src: mountainVideo },
  { id: 'd', src: interchangeVideo },
]

function HeroMosaic() {
  return (
    <div className="road-mosaic">
      {mosaicTiles.map((tile, i) => (
        <motion.div
          key={tile.id}
          className={`road-mosaic-tile tile-${tile.id}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
        >
          <video src={tile.src} autoPlay muted loop playsInline preload="metadata" />
        </motion.div>
      ))}
    </div>
  )
}

function CorridorMap({ corridor }) {
  return (
    <motion.div
      className="road-corridor"
      initial={{ opacity: 0, y: 20, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ transformPerspective: 1000 }}
    >
      <div className="road-corridor-copy">
        <h3>{corridor.title}</h3>
        <p>{corridor.europeText}</p>
        <p>{corridor.eastText}</p>
      </div>
      <div className="road-corridor-visual">
        <div className="road-corridor-route">
          <span className="road-corridor-line" aria-hidden="true" />
          <motion.span
            className="road-corridor-pulse"
            aria-hidden="true"
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          {corridor.nodes.map((node, i) => (
            <div key={node} className={`road-corridor-node ${i === 1 ? 'is-hub' : ''}`}>
              <span className="road-corridor-dot" />
              <span className="road-corridor-label">{node}</span>
            </div>
          ))}
        </div>
        <div className="road-corridor-media">
          <video src={truckPortraitVideo} autoPlay muted loop playsInline preload="metadata" />
        </div>
      </div>
    </motion.div>
  )
}

function SpotlightCard({ item, reverse }) {
  const Icon = capabilityIcons[item.id]
  const { ref, tiltProps, glowX, glowY } = useTilt3D(3)

  return (
    <motion.div
      className={`road-spotlight ${reverse ? 'is-reverse' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="road-spotlight-media">
        <video src={channelVideos[item.video]} autoPlay muted loop playsInline preload="metadata" />
      </div>
      <motion.div ref={ref} className="road-spotlight-body" {...tiltProps}>
        <motion.span className="tilt-glow" aria-hidden="true" style={{ left: glowX, top: glowY }} />
        <span className="road-spotlight-icon">
          <Icon width={22} height={22} />
        </span>
        <h4>{item.title}</h4>
        <p>{item.body}</p>
        <ul className="road-spotlight-bullets">
          {item.bullets.map((bullet) => (
            <li key={bullet}>
              <CheckIcon width={13} height={13} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

function ChannelItem({ item, isOpen, onToggle }) {
  const Icon = capabilityIcons[item.id]

  return (
    <div className="road-channel-item">
      <button type="button" className="road-channel-item-head" onClick={onToggle}>
        <span className="road-channel-item-icon">
          <Icon width={16} height={16} />
        </span>
        <span className="road-channel-item-titles">
          <span className="road-channel-item-title">{item.title}</span>
          <span className="road-channel-item-teaser">{item.teaser}</span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-hidden="true"
        >
          <ChevronDownIcon width={15} height={15} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="road-channel-item-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p>{item.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ChannelTile({ video, items, index }) {
  const [openId, setOpenId] = useState(null)

  return (
    <motion.div
      className="road-channel"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: EASE }}
    >
      <video className="road-channel-video" src={channelVideos[video]} autoPlay muted loop playsInline preload="metadata" />
      <span className="road-channel-overlay" aria-hidden="true" />
      <div className="road-channel-body">
        {items.map((item) => (
          <ChannelItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function GroundDetail({ division, contactCta }) {
  const { t } = useLanguage()
  const detail = t('groundDetail')

  const spotlightItems = detail.capabilities.filter((item) => item.bullets.length > 0)
  const channelEntries = []
  detail.capabilities
    .filter((item) => item.bullets.length === 0)
    .forEach((item) => {
      let entry = channelEntries.find((c) => c.video === item.video)
      if (!entry) {
        entry = { video: item.video, items: [] }
        channelEntries.push(entry)
      }
      entry.items.push(item)
    })

  return (
    <div className="road-detail">
      <div className="road-hero">
        <motion.div
          className="road-hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="badge">{detail.badge}</span>
          <h2 className="text-gradient">{division.title}</h2>
          <p className="road-hero-tagline">{division.tagline}</p>
          <div className="road-hero-actions">
            <a href="#contact" className="btn btn-primary btn-lg">
              {contactCta}
              <ArrowRightIcon width={16} height={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <HeroMosaic />
        </motion.div>
      </div>

      <motion.div
        className="road-intro"
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

      <CorridorMap corridor={detail.corridor} />

      <div className="road-spotlight-list">
        {spotlightItems.map((item, i) => (
          <SpotlightCard key={item.id} item={item} reverse={i % 2 === 1} />
        ))}
      </div>

      <div className="road-channel-grid">
        {channelEntries.map((entry, i) => (
          <ChannelTile key={entry.video} video={entry.video} items={entry.items} index={i} />
        ))}
      </div>

      <motion.div
        className="road-whyus"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3>{detail.whyUs.title}</h3>
        <div className="road-whyus-list">
          {detail.whyUs.points.map((point) => (
            <div key={point} className="road-whyus-item">
              <span className="road-whyus-dot" aria-hidden="true" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="road-closing"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <video
          className="road-closing-video"
          src={truckFogVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className="road-closing-overlay" aria-hidden="true" />
        <div className="road-closing-content">
          <p className="road-closing-line">{detail.closing.line1}</p>
          <p className="road-closing-tagline">{detail.closing.line2}</p>
          <a href="#contact" className="btn btn-primary btn-lg">
            {contactCta}
            <ArrowRightIcon width={16} height={16} />
          </a>
        </div>
      </motion.div>
    </div>
  )
}
