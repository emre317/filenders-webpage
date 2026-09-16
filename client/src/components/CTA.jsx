import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, MailIcon, PhoneIcon, MapPinIcon, PlusIcon } from './icons'
import { useLanguage } from '../i18n/LanguageContext'

const DEFAULT_EMAIL = 'info@filenders.com'

const DIVISION_EMAILS = {
  project: 'project@filenders.com',
  ground: 'rfq@filenders.com',
  freight: 'rfq@filenders.com',
  teknoloji: 'technology@filenders.com',
}

function ContactInfoRow({ icon: Icon, label, value, wide }) {
  return (
    <div className={`cta-info-row ${wide ? 'is-wide' : ''}`}>
      <span className="cta-info-icon">
        <Icon width={18} height={18} />
      </span>
      <span className="cta-info-text">
        <span className="cta-info-label">{label}</span>
        <span className="cta-info-value">{value}</span>
      </span>
    </div>
  )
}

export default function CTA({ activeDivision }) {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const contactEmail = DIVISION_EMAILS[activeDivision] ?? DEFAULT_EMAIL

  const handleChange = (field) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `${t('cta.form.subjectPrefix')} — ${form.name}`
    const body = [
      `${t('cta.form.name')}: ${form.name}`,
      `${t('cta.form.email')}: ${form.email}`,
      `${t('cta.form.phone')}: ${form.phone}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" className="cta">
      <motion.div
        className="cta-card"
        initial={{ opacity: 0, y: 24, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <PlusIcon className="cta-plus cta-plus-tl" width={20} height={20} />
        <PlusIcon className="cta-plus cta-plus-tr" width={20} height={20} />
        <PlusIcon className="cta-plus cta-plus-bl" width={20} height={20} />
        <PlusIcon className="cta-plus cta-plus-br" width={20} height={20} />

        <div className="cta-card-content">
          <span className="cta-status">
            <span className="cta-status-dot">
              <span className="cta-status-ping" aria-hidden="true" />
              <span className="cta-status-core" />
            </span>
            {t('cta.statusBadge')}
          </span>

          <h2>{t('cta.form.title')}</h2>
          <p>{t('cta.form.description')}</p>

          <div className="cta-info-grid">
            <ContactInfoRow icon={MailIcon} label={t('cta.form.emailLabel')} value={contactEmail} />
            <ContactInfoRow icon={PhoneIcon} label={t('cta.form.phoneLabel')} value="+90 324 503 8433" />
            <ContactInfoRow
              icon={MapPinIcon}
              label={t('footer.headOffice')}
              value={`${t('footer.rdCenter')} — ${t('footer.address')}`}
              wide
            />
            <ContactInfoRow
              icon={MapPinIcon}
              label={t('footer.branch')}
              value={t('footer.branchAddress')}
              wide
            />
          </div>
        </div>

        <div className="cta-card-form">
          {sent ? (
            <div className="cta-form-success">
              <span className="cta-success-badge">{t('cta.successBadge')}</span>
              <h3>{t('cta.successHeading')}</h3>
              <p>{t('cta.successSubtext')}</p>
            </div>
          ) : (
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="cta-form-field">
                <label htmlFor="cta-name">{t('cta.form.name')}</label>
                <input id="cta-name" type="text" required value={form.name} onChange={handleChange('name')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="cta-email">{t('cta.form.email')}</label>
                <input id="cta-email" type="email" required value={form.email} onChange={handleChange('email')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="cta-phone">{t('cta.form.phone')}</label>
                <input id="cta-phone" type="tel" value={form.phone} onChange={handleChange('phone')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="cta-message">{t('cta.form.message')}</label>
                <textarea id="cta-message" required rows={4} value={form.message} onChange={handleChange('message')} />
              </div>
              <button type="submit" className="btn btn-primary cta-form-submit">
                {t('cta.form.submit')}
                <ArrowRightIcon width={16} height={16} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
