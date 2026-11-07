import { Camera, ClipboardList, TrendingUp } from 'lucide-react'
import SectionBand from './SectionBand.jsx'
import { useCopy } from './i18n.js'

// Positional, like the Features grid: the copy bundle carries three points per
// language and these pair with them by index. They deliberately reuse the
// Features icons for the same concepts, so a glyph means one thing across the
// page. Caramel is icon-only here, per the contrast note in tokens.js.
const ICONS = [ClipboardList, Camera, TrendingUp]

export default function WhatWhy() {
  const copy = useCopy()

  return (
    <section id="what-why" className="mx-auto max-w-6xl px-4 py-16">
      <SectionBand letter="A" label={copy.whatWhy.label} />

      <div className="grid gap-6 sm:grid-cols-2">
        <p>{copy.whatWhy.p1}</p>
        <p>{copy.whatWhy.p2}</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {copy.whatWhy.points.map((point, index) => {
          const Icon = ICONS[index]
          return (
            <div key={point} className="flex items-start gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}
              >
                <Icon size={22} style={{ color: 'var(--accent)' }} aria-hidden="true" />
              </span>
              <p className="text-sm" style={{ color: 'var(--ink-faint)' }}>
                {point}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
