import './styles/landing.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Divisions from './components/Divisions'
import WhyUs from './components/WhyUs'
import CTA from './components/CTA'
import Footer from './components/Footer'
import PageIntro from './components/PageIntro'
import CursorFx from './components/CursorFx'

function App() {
  return (
    <>
      <PageIntro />
      <CursorFx />
      <Navbar />
      <main>
        <Hero />
        <Divisions />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
