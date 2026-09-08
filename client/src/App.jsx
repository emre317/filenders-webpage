import { useEffect, useState } from 'react'
import './styles/landing.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Divisions from './components/Divisions'
import WhyUs from './components/WhyUs'
import Memberships from './components/Memberships'
import CTA from './components/CTA'
import Footer from './components/Footer'
import PageIntro from './components/PageIntro'
import CursorFx from './components/CursorFx'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'

function DocumentMeta() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('meta.title')
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t('meta.description'))
  })

  return null
}

function App() {
  const [activeDivision, setActiveDivision] = useState(null)
  const [membershipsOpen, setMembershipsOpen] = useState(false)

  const goHome = () => {
    setActiveDivision(null)
    setMembershipsOpen(false)
  }

  const selectDivision = (id) => {
    setMembershipsOpen(false)
    setActiveDivision(id)
  }

  const openMemberships = () => {
    setActiveDivision(null)
    setMembershipsOpen(true)
  }

  const showHomeChrome = !activeDivision && !membershipsOpen

  return (
    <LanguageProvider>
      <DocumentMeta />
      <PageIntro />
      <CursorFx />
      <Navbar onNavigateHome={goHome} onOpenMemberships={openMemberships} onSelectDivision={selectDivision} />
      <main id="top">
        {showHomeChrome && <Hero />}
        {!membershipsOpen && <Divisions active={activeDivision} onActiveChange={selectDivision} />}
        {showHomeChrome && <WhyUs />}
        {membershipsOpen && <Memberships onBack={goHome} />}
        <CTA />
      </main>
      <Footer onSelectDivision={selectDivision} onOpenMemberships={openMemberships} />
    </LanguageProvider>
  )
}

export default App
