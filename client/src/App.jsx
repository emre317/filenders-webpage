import { useEffect, useState } from 'react'
import './styles/landing.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Divisions from './components/Divisions'
import WhyUs from './components/WhyUs'
import Memberships from './components/Memberships'
import Industries from './components/Industries'
import AboutUs from './components/AboutUs'
import LegalNotice from './components/LegalNotice'
import DataPrivacy from './components/DataPrivacy'
import CodeOfConduct from './components/CodeOfConduct'
import CTA from './components/CTA'
import Footer from './components/Footer'
import PageIntro from './components/PageIntro'
import CursorFx from './components/CursorFx'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { DIVISION_TO_SLUG, LEGAL_SLUGS, getRouteFromHash, pushRoute } from './routes'

function DocumentMeta() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('meta.title')
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t('meta.description'))
  })

  return null
}

function initialRouteState() {
  const route = getRouteFromHash()
  return {
    activeDivision: route.view === 'division' ? route.id : null,
    membershipsOpen: route.view === 'memberships',
    industriesOpen: route.view === 'industries',
    aboutOpen: route.view === 'about',
    legalView: route.view === 'legal' ? route.id : null,
  }
}

function App() {
  const [{ activeDivision, membershipsOpen, industriesOpen, aboutOpen, legalView }, setRoute] =
    useState(initialRouteState)

  useEffect(() => {
    const onPopState = () => setRoute(initialRouteState())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const goHome = () => {
    setRoute({ activeDivision: null, membershipsOpen: false, industriesOpen: false, aboutOpen: false, legalView: null })
    pushRoute('')
  }

  const selectDivision = (id) => {
    setRoute({ activeDivision: id, membershipsOpen: false, industriesOpen: false, aboutOpen: false, legalView: null })
    pushRoute(DIVISION_TO_SLUG[id] ?? id)
  }

  const openMemberships = () => {
    setRoute({ activeDivision: null, membershipsOpen: true, industriesOpen: false, aboutOpen: false, legalView: null })
    pushRoute('memberships')
  }

  const openIndustries = () => {
    setRoute({ activeDivision: null, membershipsOpen: false, industriesOpen: true, aboutOpen: false, legalView: null })
    pushRoute('industries')
  }

  const openAbout = () => {
    setRoute({ activeDivision: null, membershipsOpen: false, industriesOpen: false, aboutOpen: true, legalView: null })
    pushRoute('about')
  }

  const openLegal = (view) => {
    setRoute({ activeDivision: null, membershipsOpen: false, industriesOpen: false, aboutOpen: false, legalView: view })
    pushRoute(LEGAL_SLUGS[view])
  }

  const showHomeChrome = !activeDivision && !membershipsOpen && !industriesOpen && !aboutOpen && !legalView

  return (
    <LanguageProvider>
      <DocumentMeta />
      <PageIntro />
      <CursorFx />
      <Navbar
        onNavigateHome={goHome}
        onOpenMemberships={openMemberships}
        onOpenIndustries={openIndustries}
        onOpenAbout={openAbout}
        onOpenLegal={openLegal}
        onSelectDivision={selectDivision}
      />
      <main id="top">
        {showHomeChrome && <Hero onOpenIndustries={openIndustries} />}
        {!membershipsOpen && !industriesOpen && !aboutOpen && !legalView && (
          <Divisions active={activeDivision} onActiveChange={selectDivision} />
        )}
        {showHomeChrome && <WhyUs />}
        {membershipsOpen && <Memberships onBack={goHome} />}
        {industriesOpen && <Industries onBack={goHome} />}
        {aboutOpen && <AboutUs onBack={goHome} />}
        {legalView === 'notice' && <LegalNotice onBack={goHome} />}
        {legalView === 'privacy' && <DataPrivacy onBack={goHome} />}
        {legalView === 'conduct' && <CodeOfConduct onBack={goHome} />}
        <CTA activeDivision={activeDivision} />
      </main>
      <Footer
        onSelectDivision={selectDivision}
        onOpenMemberships={openMemberships}
        onOpenIndustries={openIndustries}
        onOpenAbout={openAbout}
        onOpenLegal={openLegal}
        onNavigateHome={goHome}
      />
    </LanguageProvider>
  )
}

export default App
