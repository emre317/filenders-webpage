import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { MenuIcon, CloseIcon } from './icons'

const links = [
  { href: '#bolumler', label: 'Bölümlerimiz' },
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#iletisim', label: 'İletişim' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="navbar-inner">
        <a href="#top" className="navbar-brand">
          <img src={logo} alt="Filenders logo" className="navbar-logo" />
          <span className="navbar-brand-text">
            Filenders
            <small>Lojistik &amp; Teknoloji</small>
          </span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <a href="#iletisim" className="btn btn-primary btn-sm">
            İletişime Geç
          </a>
        </div>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav className="navbar-mobile" aria-label="Mobile">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#iletisim" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
            İletişime Geç
          </a>
        </nav>
      )}
    </motion.header>
  )
}
