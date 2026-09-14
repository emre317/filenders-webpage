import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { MenuIcon, CloseIcon, ChevronDownIcon, PlaneIcon, CpuIcon, TruckIcon, CraneIcon } from './icons'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'
import { DIVISION_TO_SLUG, LEGAL_SLUGS } from '../routes'

const EASE = [0.16, 1, 0.3, 1]
const divisionOrder = ['project', 'ground', 'freight', 'teknoloji']
const divisionIcons = { freight: PlaneIcon, teknoloji: CpuIcon, ground: TruckIcon, project: CraneIcon }

export default function Navbar({
  onNavigateHome,
  onOpenMemberships,
  onOpenIndustries,
  onOpenAbout,
  onOpenBoardMessage,
  onOpenTrade,
  onOpenLegal,
  onSelectDivision,
}) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileLegalOpen, setMobileLegalOpen] = useState(false)

  const divisionItems = divisionOrder.map((id) => ({
    id,
    href: `#${DIVISION_TO_SLUG[id]}`,
    label: t(`divisions.items.${id}.title`),
    icon: divisionIcons[id],
  }))

  const legalItems = [
    { id: 'notice', label: t('nav.legalNotice') },
    { id: 'privacy', label: t('nav.dataPrivacy') },
    { id: 'conduct', label: t('nav.codeOfConduct') },
  ]

  const aboutItems = [
    { id: 'about', href: '#about', label: t('nav.about'), onClick: onOpenAbout },
    { id: 'board', href: '#board-message', label: t('nav.boardMessage'), onClick: onOpenBoardMessage },
  ]

  const linksAfterServices = [
    { href: '#trade', label: t('nav.trade'), onClick: onOpenTrade },
    { href: '#memberships', label: t('nav.memberships'), onClick: onOpenMemberships },
    { href: '#contact', label: t('nav.contact'), onClick: onNavigateHome },
  ]

  const selectAbout = (item) => {
    item.onClick?.()
    setAboutMenuOpen(false)
    setMobileAboutOpen(false)
    setOpen(false)
  }

  const selectLegal = (id) => {
    onOpenLegal?.(id)
    setLegalOpen(false)
    setMobileLegalOpen(false)
    setOpen(false)
  }

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
        <a
          href="#"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault()
            onNavigateHome?.()
          }}
        >
          <img src={logo} alt="Filenders logo" className="navbar-logo" />
          <span className="navbar-brand-text">Filenders</span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setAboutMenuOpen(true)}
            onMouseLeave={() => setAboutMenuOpen(false)}
          >
            <a
              href="#about"
              className="navbar-dropdown-trigger"
              onClick={(e) => {
                e.preventDefault()
                selectAbout(aboutItems[0])
              }}
            >
              {t('nav.about')}
              <ChevronDownIcon width={15} height={15} className="navbar-dropdown-caret" />
            </a>
            <AnimatePresence>
              {aboutMenuOpen && (
                <motion.div
                  className="navbar-dropdown-panel navbar-dropdown-panel-legal"
                  initial={{ opacity: 0, x: '-50%', y: -6 }}
                  animate={{ opacity: 1, x: '-50%', y: 0 }}
                  exit={{ opacity: 0, x: '-50%', y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {aboutItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="navbar-dropdown-item"
                      onClick={(e) => {
                        e.preventDefault()
                        selectAbout(item)
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#industries" onClick={() => onOpenIndustries?.()}>
            {t('nav.industries')}
          </a>

          <div
            className="navbar-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a
              href="#services"
              className="navbar-dropdown-trigger"
              onClick={() => onNavigateHome?.()}
            >
              {t('nav.services')}
              <ChevronDownIcon width={15} height={15} className="navbar-dropdown-caret" />
            </a>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  className="navbar-dropdown-panel"
                  initial={{ opacity: 0, x: '-50%', y: -6 }}
                  animate={{ opacity: 1, x: '-50%', y: 0 }}
                  exit={{ opacity: 0, x: '-50%', y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {divisionItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
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

          {linksAfterServices.map((link) => (
            <a key={link.href} href={link.href} onClick={() => link.onClick?.()}>
              {link.label}
            </a>
          ))}

          <div
            className="navbar-dropdown"
            onMouseEnter={() => setLegalOpen(true)}
            onMouseLeave={() => setLegalOpen(false)}
          >
            <a
              href={`#${LEGAL_SLUGS.notice}`}
              className="navbar-dropdown-trigger"
              onClick={(e) => {
                e.preventDefault()
                selectLegal('notice')
              }}
            >
              {t('nav.legal')}
              <ChevronDownIcon width={15} height={15} className="navbar-dropdown-caret" />
            </a>
            <AnimatePresence>
              {legalOpen && (
                <motion.div
                  className="navbar-dropdown-panel navbar-dropdown-panel-legal"
                  initial={{ opacity: 0, x: '-50%', y: -6 }}
                  animate={{ opacity: 1, x: '-50%', y: 0 }}
                  exit={{ opacity: 0, x: '-50%', y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {legalItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${LEGAL_SLUGS[item.id]}`}
                      className="navbar-dropdown-item"
                      onClick={(e) => {
                        e.preventDefault()
                        selectLegal(item.id)
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="navbar-actions">
          <ThemeToggle />
          <LanguageToggle />
          <a href="#contact" className="btn btn-primary btn-sm navbar-cta" onClick={onNavigateHome}>
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
              onClick={() => setMobileAboutOpen((v) => !v)}
              aria-expanded={mobileAboutOpen}
            >
              {t('nav.about')}
              <ChevronDownIcon
                width={16}
                height={16}
                style={{ transform: mobileAboutOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence initial={false}>
              {mobileAboutOpen && (
                <motion.div
                  className="navbar-mobile-submenu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  {aboutItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        selectAbout(item)
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#industries"
            onClick={() => {
              onOpenIndustries?.()
              setOpen(false)
            }}
          >
            {t('nav.industries')}
          </a>

          <div className="navbar-mobile-group">
            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
            >
              {t('nav.services')}
              <ChevronDownIcon
                width={16}
                height={16}
                style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
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
                    <a key={item.id} href={item.href} onClick={() => selectDivision(item.id)}>
                      <item.icon width={16} height={16} />
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {linksAfterServices.map((link) => (
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

          <div className="navbar-mobile-group">
            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setMobileLegalOpen((v) => !v)}
              aria-expanded={mobileLegalOpen}
            >
              {t('nav.legal')}
              <ChevronDownIcon
                width={16}
                height={16}
                style={{ transform: mobileLegalOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence initial={false}>
              {mobileLegalOpen && (
                <motion.div
                  className="navbar-mobile-submenu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  {legalItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${LEGAL_SLUGS[item.id]}`}
                      onClick={(e) => {
                        e.preventDefault()
                        selectLegal(item.id)
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="navbar-mobile-lang">
            <span>{t('nav.langLabel')}</span>
            <LanguageToggle />
          </div>
          <div className="navbar-mobile-theme">
            <span>{t('nav.viewLabel')}</span>
            <ThemeToggle />
          </div>
          <a
            href="#contact"
            className="btn btn-primary btn-sm navbar-cta"
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
