import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from './icons'
import { useLanguage } from '../i18n/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

const FILENTECH_API_URL = import.meta.env.VITE_FILENTECH_API_URL || 'https://filentech.com/api'
const GLOBAL_PARTNER_ENDPOINT = `${FILENTECH_API_URL}/public/global-partner-applications`

const emptyForm = {
  name: '',
  globalAgentCountry: '',
  servicesCountry: '',
  taxID: '',
  taxOffice: '',
  billingAddress: '',
  phone: '',
  email: '',
  website: '',
  contactPersonName: '',
  companyUrl: '', // honeypot — left empty by real visitors
}

export default function GlobalPartner({ onBack }) {
  const { t } = useLanguage()
  const detail = t('globalPartner')
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [error, setError] = useState(null)

  useEffect(() => {
    document.getElementById('global-partner')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleChange = (field) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setStatus('submitting')

    try {
      const res = await fetch(GLOBAL_PARTNER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.status === 409) {
        setError(detail.form.errorDuplicate)
        setStatus('idle')
        return
      }

      if (!res.ok) {
        setError(detail.form.errorGeneric)
        setStatus('idle')
        return
      }

      setStatus('success')
    } catch {
      setError(detail.form.errorGeneric)
      setStatus('idle')
    }
  }

  return (
    <motion.section
      id="global-partner"
      className="legal-page global-partner-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <button type="button" className="division-back" onClick={onBack}>
        <ArrowRightIcon width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        {detail.back}
      </button>

      <motion.div
        className="legal-hero"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="badge">{detail.badge}</span>
        <h2 className="text-gradient">{detail.title}</h2>
        <p className="legal-intro">{detail.subtitle}</p>
      </motion.div>

      <div className="gp-form-card">
        {status === 'success' ? (
          <div className="cta-form-success">
            <span className="cta-success-badge">{detail.success.badge}</span>
            <h3>{detail.success.heading}</h3>
            <p>{detail.success.subtext}</p>
          </div>
        ) : (
          <form className="gp-form" onSubmit={handleSubmit}>
            <div className="gp-form-grid">
              <div className="cta-form-field">
                <label htmlFor="gp-name">{detail.form.name}</label>
                <input id="gp-name" type="text" required value={form.name} onChange={handleChange('name')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-country">{detail.form.country}</label>
                <input
                  id="gp-country"
                  type="text"
                  required
                  value={form.globalAgentCountry}
                  onChange={handleChange('globalAgentCountry')}
                />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-services-country">{detail.form.servicesCountry}</label>
                <input
                  id="gp-services-country"
                  type="text"
                  required
                  placeholder={detail.form.servicesCountryHint}
                  value={form.servicesCountry}
                  onChange={handleChange('servicesCountry')}
                />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-tax-id">{detail.form.taxId}</label>
                <input id="gp-tax-id" type="text" required value={form.taxID} onChange={handleChange('taxID')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-tax-office">{detail.form.taxOffice}</label>
                <input
                  id="gp-tax-office"
                  type="text"
                  required
                  value={form.taxOffice}
                  onChange={handleChange('taxOffice')}
                />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-phone">{detail.form.phone}</label>
                <input id="gp-phone" type="tel" required value={form.phone} onChange={handleChange('phone')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-email">{detail.form.email}</label>
                <input id="gp-email" type="email" required value={form.email} onChange={handleChange('email')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-website">{detail.form.website}</label>
                <input id="gp-website" type="text" required value={form.website} onChange={handleChange('website')} />
              </div>
              <div className="cta-form-field">
                <label htmlFor="gp-contact-person">{detail.form.contactPerson}</label>
                <input
                  id="gp-contact-person"
                  type="text"
                  required
                  value={form.contactPersonName}
                  onChange={handleChange('contactPersonName')}
                />
              </div>
              <div className="cta-form-field gp-form-field-wide">
                <label htmlFor="gp-billing-address">{detail.form.billingAddress}</label>
                <textarea
                  id="gp-billing-address"
                  required
                  rows={3}
                  value={form.billingAddress}
                  onChange={handleChange('billingAddress')}
                />
              </div>
            </div>

            <input
              type="text"
              name="companyUrl"
              value={form.companyUrl}
              onChange={handleChange('companyUrl')}
              className="gp-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {error && <p className="gp-form-error">{error}</p>}

            <button type="submit" className="btn btn-primary cta-form-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? detail.form.submitting : detail.form.submit}
              <ArrowRightIcon width={16} height={16} />
            </button>
          </form>
        )}
      </div>
    </motion.section>
  )
}
