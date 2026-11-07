import SectionBand from './SectionBand.jsx'
import { useCopy } from './i18n.js'

export default function Install() {
  const copy = useCopy()

  return (
    <section id="install" className="mx-auto max-w-6xl px-4 py-16">
      <SectionBand letter="D" label={copy.install.label} />

      <div className="grid gap-6 sm:grid-cols-2">
        {copy.install.platforms.map((platform) => (
          <div
            key={platform.name}
            className="rounded-2xl p-6"
            style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}
          >
            <h3 className="font-semibold">{platform.name}</h3>
            <ol
              className="mt-3 flex list-inside list-decimal flex-col gap-2 text-sm"
              style={{ color: 'var(--ink-faint)' }}
            >
              {platform.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm" style={{ color: 'var(--ink-faint)' }}>
        {copy.install.note}
      </p>
    </section>
  )
}
