import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import WhatWhy from './WhatWhy.jsx'
import Features from './Features.jsx'
import PhotoBand from './PhotoBand.jsx'
import HowItWorks from './HowItWorks.jsx'
import Install from './Install.jsx'
import Faq from './Faq.jsx'
import Cta from './Cta.jsx'
import Footer from './Footer.jsx'

export default function App() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <WhatWhy />
        <Features />
        <PhotoBand />
        <HowItWorks />
        <Install />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
