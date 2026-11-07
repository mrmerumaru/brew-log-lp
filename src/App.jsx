import { useEffect } from 'react'
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
import { useCopy, useLang } from './i18n.js'

/**
 * The page is a client-rendered SPA, so index.html can only ship one static
 * default (English). Anything that lives in the document rather than in React
 * — the lang attribute, the title, the description and social meta — has to be
 * re-pointed here whenever the language changes, or the tab and every shared
 * link keep advertising English.
 */
function useDocumentMetadata() {
  const lang = useLang()
  const copy = useCopy()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = copy.meta.title

    const setMeta = (selector, value) => {
      document.querySelector(selector)?.setAttribute('content', value)
    }
    setMeta('meta[name="description"]', copy.meta.description)
    setMeta('meta[property="og:title"]', copy.meta.title)
    setMeta('meta[property="og:description"]', copy.meta.description)
    setMeta('meta[name="twitter:title"]', copy.meta.title)
    setMeta('meta[name="twitter:description"]', copy.meta.description)
  }, [lang, copy])
}

export default function App() {
  useDocumentMetadata()

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
