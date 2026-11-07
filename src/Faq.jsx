import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionBand from './SectionBand.jsx'
import { useCopy } from './i18n.js'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)
  const copy = useCopy()

  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
      <SectionBand letter="E" label={copy.faq.label} />

      <div style={{ borderTop: '1px solid var(--rule)' }}>
        {copy.faq.items.map((item, index) => {
          const isOpen = openIndex === index
          // Keyed by position so switching language keeps whichever answer is
          // open rather than collapsing the list.
          return (
            <div key={index} style={{ borderBottom: '1px solid var(--rule)' }}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.q}
                <ChevronDown
                  size={18}
                  className="shrink-0"
                  style={{
                    color: 'var(--accent)',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 150ms',
                  }}
                />
              </button>
              {isOpen && (
                <p className="pb-4 text-sm" style={{ color: 'var(--ink-faint)' }}>
                  {item.a}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
