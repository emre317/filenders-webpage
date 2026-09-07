import { motion } from 'framer-motion'
import { ShieldIcon, RouteIcon, CpuIcon, TruckIcon } from './icons'

const points = [
  {
    icon: ShieldIcon,
    title: 'Güvenilirlik',
    description: 'Her sevkiyatı, sözünü tutan bir operasyon anlayışıyla teslim ediyoruz.',
  },
  {
    icon: RouteIcon,
    title: 'İzlenebilirlik',
    description: 'Yükünüzün nerede olduğunu her an şeffaf şekilde görebiliyorsunuz.',
  },
  {
    icon: CpuIcon,
    title: 'Teknoloji Odaklı',
    description: 'Operasyonu kendi geliştirdiğimiz yazılımlarla akıllı hale getiriyoruz.',
  },
  {
    icon: TruckIcon,
    title: 'Uçtan Uca Hizmet',
    description: 'Taşımadan depolamaya, tek muhatapla eksiksiz bir tedarik zinciri.',
  },
]

export default function WhyUs() {
  return (
    <section id="hakkimizda" className="whyus">
      <motion.div
        className="whyus-head"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="badge">Neden Filenders</span>
        <h2>Dört yön, tek güç</h2>
        <p>
          Taşımacılık, teknoloji, saha operasyonları ve proje lojistiğini aynı çatı
          altında geliştirerek, sektörün ihtiyaç duyduğu hızı ve öngörüyü birlikte
          sunuyoruz.
        </p>
      </motion.div>

      <div className="whyus-grid">
        {points.map((point, i) => (
          <motion.div
            key={point.title}
            className="whyus-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="whyus-card-icon">
              <point.icon width={22} height={22} />
            </span>
            <h3>{point.title}</h3>
            <p>{point.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
