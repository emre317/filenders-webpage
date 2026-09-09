import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, MailIcon } from './icons'
import { useLanguage } from '../i18n/LanguageContext'

export default function CTA() {
  const { t } = useLanguage()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  return (
    <section id="iletisim" className="cta">
      <motion.div
        className="cta-inner cta-inner-interactive"
        initial={{ opacity: 0, y: 24, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <div className={`cta-success ${clicked ? 'is-visible' : ''}`}>
          <span className="cta-success-badge">{t('cta.successBadge')}</span>
          <h3>{t('cta.successHeading')}</h3>
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
          <span className="cta-success-note">{t('cta.successSubtext')}</span>
        </div>

        <div className={`cta-pre ${clicked ? 'is-hidden' : ''}`}>
          <span className="cta-status">
            <span className="cta-status-dot">
              <span className="cta-status-ping" aria-hidden="true" />
              <span className="cta-status-core" />
            </span>
            {t('cta.statusBadge')}
          </span>

          <a
            href="mailto:info@filenders.com"
            className="cta-headline"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setClicked(true)}
          >
            <span className="cta-headline-deco left" aria-hidden="true" />
            <h2>
              <span className="cta-line-mask">
                <span className={`cta-line ${hovered ? 'is-lifted' : ''}`}>
                  {t('cta.titlePrefix')} <span className="text-gradient">{t('cta.titleHighlight')}</span>
                </span>
              </span>
              <span className="cta-line-mask">
                <span className={`cta-line cta-line-muted ${hovered ? 'is-lifted' : ''}`}>
                  {t('cta.titleSuffix')}
                </span>
              </span>
            </h2>
            <span className="cta-circle">
              <span className="cta-circle-ring" />
              <ArrowRightIcon width={22} height={22} className="cta-circle-arrow" />
            </span>
            <span className="cta-headline-deco right" aria-hidden="true" />
          </a>

          <p>{t('cta.lede')}</p>
        </div>
      </motion.div>
    </section>
  )
}
