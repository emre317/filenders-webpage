import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { MailIcon, MapPinIcon, PhoneIcon, LinkedinIcon, InstagramIcon, CpuIcon } from './icons'
import { useLanguage } from '../i18n/LanguageContext'
import { DIVISION_TO_SLUG } from '../routes'

const divisionIds = ['project', 'ground', 'freight', 'teknoloji']

const socialLinks = [
  { href: 'https://www.linkedin.com/company/filenders/', name: 'Linkedin', icon: LinkedinIcon },
  { href: 'https://www.instagram.com/filenders.co/', name: 'Instagram', icon: InstagramIcon },
  { href: 'https://filentech.com/auth/login', name: 'Filentech', icon: CpuIcon },
]

export default function Footer({
  onSelectDivision,
  onOpenMemberships,
  onOpenIndustries,
  onOpenAbout,
  onOpenBoardMessage,
  onOpenTrade,
  onOpenLegal,
  onOpenGlobalPartner,
  onNavigateHome,
}) {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const serviceLinks = divisionIds.map((id) => ({
    id,
    href: `#${DIVISION_TO_SLUG[id]}`,
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
          <a
            href="#"
            className="footer-logo"
            onClick={(e) => {
              e.preventDefault()
              onNavigateHome?.()
            }}
          >
            <img src={logo} alt="Filenders" className="footer-logo-icon" />
            <span className="footer-logo-text">Filenders</span>
          </a>
          <span className="footer-logo-tagline">{t('hero.tagline')}</span>
          <p>{t('footer.brandDesc')}</p>

          <div className="footer-social">
            {socialLinks.map(({ href, name, icon: Icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} data-tooltip={name}>
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h4>{t('footer.servicesTitle')}</h4>
          <ul>
            {serviceLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} onClick={() => onSelectDivision?.(link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t('footer.companyTitle')}</h4>
          <ul>
            <li>
              <a href="#about" onClick={() => onOpenAbout?.()}>
                {t('nav.about')}
              </a>
            </li>
            <li>
              <a href="#board-message" onClick={() => onOpenBoardMessage?.()}>
                {t('nav.boardMessage')}
              </a>
            </li>
            <li>
              <a href="#industries" onClick={() => onOpenIndustries?.()}>
                {t('nav.industries')}
              </a>
            </li>
            <li>
              <a href="#trade" onClick={() => onOpenTrade?.()}>
                {t('nav.trade')}
              </a>
            </li>
            <li>
              <a href="#memberships" onClick={() => onOpenMemberships?.()}>
                {t('nav.memberships')}
              </a>
            </li>
            <li>
              <a href="#global-partner" onClick={() => onOpenGlobalPartner?.()}>
                {t('nav.globalPartner')}
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => onNavigateHome?.()}>
                {t('nav.contact')}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t('footer.legalTitle')}</h4>
          <ul>
            <li>
              <a href="#legal-notice" onClick={() => onOpenLegal?.('notice')}>
                {t('nav.legalNotice')}
              </a>
            </li>
            <li>
              <a href="#data-privacy" onClick={() => onOpenLegal?.('privacy')}>
                {t('nav.dataPrivacy')}
              </a>
            </li>
            <li>
              <a href="#code-of-conduct" onClick={() => onOpenLegal?.('conduct')}>
                {t('nav.codeOfConduct')}
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
                <PhoneIcon width={16} height={16} />
                +90 324 503 8433
              </a>
            </li>
            <li className="footer-address">
              <MapPinIcon width={16} height={16} />
              <span>
                {t('footer.headOffice')}: {t('footer.rdCenter')} — {t('footer.address')}
              </span>
            </li>
            <li className="footer-address">
              <MapPinIcon width={16} height={16} />
              <span>
                {t('footer.branch')}: {t('footer.branchAddress')}
              </span>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <p>
          © {year} Filentech. {t('footer.rights')}
        </p>
        <p className="footer-duns">D-U-N-S® No: 751133530</p>
      </div>
    </footer>
  )
}
