import logo from '../assets/logo.png'
import { MailIcon, MapPinIcon } from './icons'

const columns = [
  {
    title: 'Bölümlerimiz',
    links: [
      { href: '#freight', label: 'Deniz & Hava Taşımacılığı' },
      { href: '#teknoloji', label: 'Teknoloji' },
      { href: '#ground', label: 'Kara Hizmetleri' },
      { href: '#project', label: 'Proje & Multimodal Taşımacılık' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#top" className="navbar-brand">
            <img src={logo} alt="Filenders logo" className="navbar-logo" />
            <span className="navbar-brand-text">
              Filenders
              <small>Lojistik &amp; Teknoloji</small>
            </span>
          </a>
          <p>Lojistik ve teknolojiyi tek çatı altında birleştiren güvenilir çözüm ortağınız.</p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="footer-column">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-column footer-contact-col">
          <h4>İletişim</h4>
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
                Ar-Ge Merkezi — Mersin Üniversitesi Çiftlikköy Kampüsü Teknopark,
                1. Kuluçka Binası 35B/B02, Yenişehir/Mersin
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Filenders Lojistik ve Teknoloji. Tüm hakları saklıdır.</p>
        <p className="footer-duns">D-U-N-S® No: 751133530</p>
      </div>
    </footer>
  )
}
