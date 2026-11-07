import { Camera, ClipboardList, History, Repeat, Share2, TrendingUp } from 'lucide-react'
import SectionBand from './SectionBand.jsx'
import { useCopy } from './i18n.js'

// Icons are positional — they pair with the copy bundle's items by index, so
// both languages must keep the same six features in the same order.
const ICONS = [ClipboardList, Camera, History, Repeat, TrendingUp, Share2]

export default function Features() {
  const copy = useCopy()

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16">
      <SectionBand letter="B" label={copy.features.label} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {copy.features.items.map((item, index) => {
          const Icon = ICONS[index]
          return (
            <div
              key={item.title}
              className="rounded-2xl p-6"
              style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}
            >
              <Icon size={24} style={{ color: 'var(--accent)' }} />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
