import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { MenuIcon, CloseIcon, ArrowRightIcon, PlaneIcon, CpuIcon, TruckIcon, CraneIcon } from './icons'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]
const divisionOrder = ['freight', 'teknoloji', 'ground', 'project']
const divisionIcons = { freight: PlaneIcon, teknoloji: CpuIcon, ground: TruckIcon, project: CraneIcon }

export default function Navbar({ onNavigateHome, onOpenMemberships, onSelectDivision }) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const divisionItems = divisionOrder.map((id) => ({
    id,
    label: t(`divisions.items.${id}.title`),
    icon: divisionIcons[id],
  }))

  const links = [
    { href: '#hakkimizda', label: t('nav.about'), onClick: onNavigateHome },
    { href: '#uyelikler', label: t('nav.memberships'), onClick: onOpenMemberships },
    { href: '#iletisim', label: t('nav.contact'), onClick: onNavigateHome },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const selectDivision = (id) => {
    onSelectDivision?.(id)
    setServicesOpen(false)
    setMobileServicesOpen(false)
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="navbar-inner">
        <a href="#top" className="navbar-brand" onClick={onNavigateHome}>
          <img src={logo} alt="Filenders logo" className="navbar-logo" />
          <span className="navbar-brand-text">
            Filenders
            <small>Lojistik &amp; Teknoloji</small>
          </span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a
              href="#bolumler"
              className="navbar-dropdown-trigger"
              onClick={() => onNavigateHome?.()}
            >
              {t('nav.services')}
              <ArrowRightIcon width={11} height={11} style={{ transform: 'rotate(90deg)' }} />
            </a>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  className="navbar-dropdown-panel"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {divisionItems.map((item) => (
                    <a
                      key={item.id}
                      href="#bolumler"
                      className="navbar-dropdown-item"
                      onClick={() => selectDivision(item.id)}
                    >
                      <span className="navbar-dropdown-item-icon">
                        <item.icon width={16} height={16} />
                      </span>
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => link.onClick?.()}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <LanguageToggle />
          <ThemeToggle />
          <a href="#iletisim" className="btn btn-primary btn-sm" onClick={onNavigateHome}>
            {t('nav.contactCta')}
          </a>
        </div>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav className="navbar-mobile" aria-label="Mobile">
          <div className="navbar-mobile-group">
            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
            >
              {t('nav.services')}
              <ArrowRightIcon
                width={13}
                height={13}
                style={{ transform: mobileServicesOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence initial={false}>
              {mobileServicesOpen && (
                <motion.div
                  className="navbar-mobile-submenu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  {divisionItems.map((item) => (
                    <a key={item.id} href="#bolumler" onClick={() => selectDivision(item.id)}>
                      <item.icon width={16} height={16} />
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                link.onClick?.()
                setOpen(false)
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="navbar-mobile-lang">
            <span>{t('nav.langLabel')}</span>
            <LanguageToggle />
          </div>
          <div className="navbar-mobile-theme">
            <span>{t('nav.viewLabel')}</span>
            <ThemeToggle />
          </div>
          <a
            href="#iletisim"
            className="btn btn-primary btn-sm"
            onClick={() => {
              onNavigateHome?.()
              setOpen(false)
            }}
          >
            {t('nav.contactCta')}
          </a>
        </nav>
      )}
    </motion.header>
  )
}
