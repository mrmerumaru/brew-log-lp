import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import WhatWhy from './WhatWhy.jsx'
import Features from './Features.jsx'
import HowItWorks from './HowItWorks.jsx'
import Install from './Install.jsx'
import Faq from './Faq.jsx'
import Footer from './Footer.jsx'

export default function App() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <WhatWhy />
        <Features />
        <HowItWorks />
        <Install />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
