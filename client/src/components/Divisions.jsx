import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import logo from '../assets/logo.png'
import freightPhoto from '../assets/divisions/freight.jpg'
import groundPhoto from '../assets/divisions/ground.jpg'
import projectPhoto from '../assets/divisions/project.jpg'
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

const codeLines = [
  'const shipment = await track(orderId);',
  'function optimizeRoute(stops) {',
  '  return dijkstra(graph, stops);',
  '}',
  'class FleetTracker extends EventEmitter {',
  "  onLocationUpdate(vehicleId, geo) {",
  "    this.emit('update', { vehicleId, geo });",
  '  }',
  '}',
  "SELECT * FROM shipments WHERE status = 'in_transit';",
  "await api.post('/webhooks/eta', payload);",
  'export function predictETA(route, traffic) {',
  '  const base = route.distance / avgSpeed;',
  '  return base * trafficFactor(traffic);',
  '}',
  "if (temp > threshold) alert.trigger('cold-chain');",
  'docker compose up -d fleet-service',
  "git commit -m 'feat: realtime geofencing'",
  '> Deploying to production... done',
]

const divisions = {
  freight: {
    dir: 'Kuzey',
    letter: 'K',
    icon: PlaneIcon,
    title: 'Deniz & Hava Taşımacılığı',
    tagline: 'Global bağlantılarla, hassasiyetle teslim.',
    photo: freightPhoto,
    fx: 'wave',
    description:
      'Dünyanın her noktasına deniz ve hava yoluyla güvenilir, uçtan uca navlun çözümleri sunuyoruz.',
    features: [
      { icon: PlaneIcon, label: 'Hava Kargo', desc: 'Zamana duyarlı sevkiyatlarda hızlı hava taşımacılığı.' },
      { icon: WarehouseIcon, label: 'Deniz Taşımacılığı', desc: 'Konteyner ve parsiyel yüklerde global liman ağı.' },
      { icon: ShieldIcon, label: 'Gümrükleme', desc: 'Sorunsuz gümrük süreçleri ve doküman yönetimi.' },
      { icon: RouteIcon, label: 'Uçtan Uca Takip', desc: 'Sevkiyatın her aşamasında şeffaf görünürlük.' },
    ],
  },
  teknoloji: {
    dir: 'Doğu',
    letter: 'D',
    icon: CpuIcon,
    title: 'Teknoloji',
    tagline: 'Operasyonu yöneten zeka, arka planda çalışır.',
    photo: null,
    fx: 'code',
    description:
      'Lojistik operasyonlarını akıllı hale getiren yazılım, filo takip ve veri analitiği çözümleri geliştiriyoruz.',
    features: [
      { icon: CodeIcon, label: 'Yazılım Geliştirme', desc: 'Lojistik süreçlerine özel uçtan uca yazılım çözümleri.' },
      { icon: CpuIcon, label: 'Filo Takip Sistemleri', desc: 'Gerçek zamanlı konum ve performans izleme.' },
      { icon: DatabaseIcon, label: 'Veri Analitiği', desc: 'Operasyonel verilerden anlık, aksiyon alınabilir içgörüler.' },
      { icon: ShieldIcon, label: 'Süreç Otomasyonu', desc: 'Manuel iş yükünü azaltan akıllı otomasyon akışları.' },
    ],
  },
  ground: {
    dir: 'Güney',
    letter: 'G',
    icon: TruckIcon,
    title: 'Kara Hizmetleri',
    tagline: 'Yerel uzmanlık, güvenilir operasyon.',
    photo: groundPhoto,
    fx: 'speed',
    description:
      'Depodan kapıya, sahada güvenilir kara taşımacılığı ve operasyonel destek sağlıyoruz.',
    features: [
      { icon: TruckIcon, label: 'Karayolu Taşımacılığı', desc: 'Esnek filo kapasitesiyle yurt içi dağıtım.' },
      { icon: WarehouseIcon, label: 'Depolama & Elleçleme', desc: 'Modern depo altyapısı ile güvenli stok yönetimi.' },
      { icon: RouteIcon, label: 'Son Kilometre Teslimat', desc: 'Şehir içi hızlı ve izlenebilir teslimat.' },
      { icon: ShieldIcon, label: 'Saha Operasyon Desteği', desc: '7/24 yerel operasyonel destek ekibi.' },
    ],
  },
  project: {
    dir: 'Batı',
    letter: 'B',
    icon: CraneIcon,
    title: 'Proje & Multimodal Taşımacılık',
    tagline: 'Karmaşık yük. Zorlu güzergah. Teslim edildi.',
    photo: projectPhoto,
    fx: 'cargo',
    description:
      'Ağır ve gabari dışı yükleri, birden fazla taşıma modunu birleştirerek güvenle hedefine ulaştırıyoruz.',
    features: [
      { icon: CraneIcon, label: 'Proje Kargo', desc: 'Ağır ve gabari dışı ekipman taşımacılığı.' },
      { icon: RouteIcon, label: 'Multimodal Çözümler', desc: 'Kara, deniz ve demiryolunu birleştiren entegre taşıma planı.' },
      { icon: WarehouseIcon, label: 'Rota Mühendisliği', desc: 'Zorlu güzergahlar için özel planlama.' },
      { icon: ShieldIcon, label: 'Sahada Koordinasyon', desc: 'Yükleme ve montaj noktasında uzman ekip desteği.' },
    ],
  },
}

const order = ['freight', 'teknoloji', 'ground', 'project']

function CodeRain({ className = '' }) {
  const lines = [...codeLines, ...codeLines]

  return (
    <div className={`code-rain ${className}`}>
      <div className="code-rain-track">
        {lines.map((line, i) => (
          <span key={i} style={{ opacity: i % codeLines.length % 3 === 0 ? 0.9 : 0.55 }}>
            {line}
          </span>
        ))}
      </div>
    </div>
  )
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
  if (division.fx === 'code') {
    return <CodeRain />
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

function DetailPanel({ id, onBack }) {
  const division = divisions[id]

  return (
    <motion.div
      key={id}
      className="division-detail"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <button type="button" className="division-back" onClick={onBack}>
        <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        Tüm Bölümler
      </button>

      <div className="division-detail-photo">
        {division.fx === 'code' ? (
          <CodeRain />
        ) : (
          <>
            <img src={division.photo} alt="" />
            {division.fx === 'speed' && <SpeedFx />}
            {division.fx === 'cargo' && <CargoFx />}
            {division.fx === 'wave' && <WaveFx />}
          </>
        )}
        <div className="division-detail-photo-overlay" />
      </div>

      <div className="division-detail-head">
        <span className="division-detail-icon">
          <division.icon width={30} height={30} />
        </span>
        <div>
          <span className="division-kicker">Yön: {division.dir}</span>
          <h2>{division.title}</h2>
        </div>
      </div>

      <p className="division-desc">{division.description}</p>

      <div className="division-feature-grid">
        {division.features.map((feature, i) => (
          <motion.div
            key={feature.label}
            className="division-feature-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: EASE }}
          >
            <span className="division-feature-icon">
              <feature.icon width={18} height={18} />
            </span>
            <h4>{feature.label}</h4>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <a href="#iletisim" className="btn btn-primary btn-lg">
        {division.title} ekibimizle görüşün
        <ArrowRightIcon width={16} height={16} />
      </a>
    </motion.div>
  )
}

function CompassNode({ id, position, onSelect }) {
  const division = divisions[id]
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
      style={{ rotateX, rotateY, transformPerspective: 900 }}
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
          Detayları Gör
          <ArrowRightIcon width={14} height={14} />
        </span>
      </span>
    </motion.button>
  )
}

export default function Divisions() {
  const [active, setActive] = useState(null)

  return (
    <section id="bolumler" className="divisions">
      <div className="divisions-head">
        <span className="badge">Dört Yön, Tek Sorumluluk</span>
        <h2>Bölümlerimiz</h2>
        <p>Detayları görmek istediğiniz alanı seçin.</p>
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="compass"
            className="compass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <CompassNode id={order[0]} position="north" onSelect={setActive} />
            <CompassNode id={order[3]} position="west" onSelect={setActive} />

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
              <span className="compass-badge badge-n">K</span>
              <span className="compass-badge badge-s">G</span>
              <span className="compass-badge badge-e">D</span>
              <span className="compass-badge badge-w">B</span>

              <motion.img
                src={logo}
                alt="Filenders"
                className="compass-logo"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <CompassNode id={order[1]} position="east" onSelect={setActive} />
            <CompassNode id={order[2]} position="south" onSelect={setActive} />
          </motion.div>
        ) : (
          <DetailPanel id={active} onBack={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
