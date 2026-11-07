import SectionBand from './SectionBand.jsx'
import { useCopy } from './i18n.js'

export default function HowItWorks() {
  const copy = useCopy()

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16">
      <SectionBand letter="C" label={copy.how.label} />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {copy.how.steps.map((step, index) => {
          // Only the newest step is flagged; the 'new' badge only renders when
          // the copy bundle marks the step, so it drops off once it isn't new.
          const isNew = index === copy.how.steps.length - 1
          return (
            <div key={step.title}>
              <div
                className="relative overflow-hidden rounded-2xl border"
                style={{ borderColor: 'var(--rule)' }}
              >
                <img src={step.image} alt={step.alt} className="block h-auto w-full" loading="lazy" />
                {isNew && (
                  <span
                    className="font-mono-band absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                    style={{ background: 'var(--accent)', color: 'var(--paper)' }}
                  >
                    {copy.how.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className="font-mono-band flex h-6 w-6 shrink-0 items-center justify-center text-xs font-semibold"
                  style={{ border: '1px solid var(--accent)', color: 'var(--ink)' }}
                >
                  {index + 1}
                </span>
                <h3 className="font-semibold">{step.title}</h3>
              </div>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-faint)' }}>
                {step.description}
              </p>
            </div>
          )
        })}
      </div>

      <p className="mt-10 text-sm italic" style={{ color: 'var(--ink-faint)' }}>
        {copy.how.note}
      </p>
    </section>
  )
}
