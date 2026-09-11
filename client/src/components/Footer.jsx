import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { MailIcon, MapPinIcon } from './icons'
import { useLanguage } from '../i18n/LanguageContext'

const divisionIds = ['freight', 'teknoloji', 'ground', 'project']

export default function Footer({ onSelectDivision, onOpenMemberships }) {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const links = divisionIds.map((id) => ({
    id,
    label: t(`divisions.items.${id}.title`),
  }))

  return (
    <footer className="footer">
      <motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 20, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <div className="footer-brand">
          <a href="#top" className="navbar-brand">
            <img src={logo} alt="Filenders logo" className="navbar-logo" />
            <span className="navbar-brand-text">
              Filenders
              <small>{t('hero.subtitle')}</small>
            </span>
          </a>
          <p>{t('footer.brandDesc')}</p>
        </div>

        <div className="footer-column">
          <h4>{t('footer.servicesTitle')}</h4>
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a href="#bolumler" onClick={() => onSelectDivision?.(link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#uyelikler" onClick={() => onOpenMemberships?.()}>
                {t('nav.memberships')}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-contact-col">
          <h4>{t('footer.contactTitle')}</h4>
          <ul>
            <li>
              <a href="mailto:info@filenders.com" className="footer-contact">
                <MailIcon width={16} height={16} />
                info@filenders.com
              </a>
            </li>
            <li>
              <a href="tel:+903245038433" className="footer-contact">
                +90 324 503 8433
              </a>
            </li>
            <li className="footer-address">
              <MapPinIcon width={16} height={16} />
              <span>
                {t('footer.rdCenter')} — {t('footer.address')}
              </span>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="footer-bottom">
        <p>
          © {year} Filentech. {t('footer.rights')}
        </p>
        <p className="footer-duns">D-U-N-S® No: 751133530</p>
      </div>
    </footer>
  )
}
