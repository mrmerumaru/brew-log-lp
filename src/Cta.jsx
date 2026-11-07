import { useCopy } from './i18n.js'

const APP_URL = 'https://brew-log-xi.vercel.app/'

// Closing CTA band — echoes the dark hero with a beans bleed on the right, in
// the same slot the Coffea template uses for its newsletter band.
export default function Cta() {
  const copy = useCopy()

  return (
    <section id="get-started" className="relative overflow-hidden" style={{ background: 'var(--espresso)' }}>
      <img
        src="/images/hero-beans.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-40"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--espresso) 0%, color-mix(in srgb, var(--espresso) 75%, transparent) 55%, color-mix(in srgb, var(--espresso) 30%, transparent) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: 'var(--accent-light)' }}
        >
          {copy.cta.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--card)' }}>
          {copy.cta.title}
        </h2>
        <p className="mt-4 text-lg" style={{ color: 'color-mix(in srgb, var(--card) 78%, transparent)' }}>
          {copy.cta.body}
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={APP_URL}
            className="rounded-full px-8 py-3 font-semibold"
            style={{ background: 'var(--card)', color: 'var(--espresso)' }}
          >
            {copy.cta.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
