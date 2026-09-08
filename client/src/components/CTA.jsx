import { motion } from 'framer-motion'
import { ArrowRightIcon, MailIcon } from './icons'
import { useLanguage } from '../i18n/LanguageContext'

export default function CTA() {
  const { t } = useLanguage()

  return (
    <section id="iletisim" className="cta">
      <motion.div
        className="cta-inner"
        initial={{ opacity: 0, y: 24, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <h2>
          {t('cta.titlePrefix')} <span className="text-gradient">{t('cta.titleHighlight')}</span>{' '}
          {t('cta.titleSuffix')}
        </h2>
        <p>{t('cta.lede')}</p>

        <div className="cta-actions">
          <a href="mailto:info@filenders.com" className="btn btn-primary btn-lg">
            <MailIcon width={16} height={16} />
            info@filenders.com
            <ArrowRightIcon width={16} height={16} />
          </a>
          <a href="tel:+903245038433" className="btn btn-secondary btn-lg">
            +90 324 503 8433
          </a>
        </div>
      </motion.div>
    </section>
  )
}
