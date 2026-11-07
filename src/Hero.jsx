import { useCopy } from './i18n.js'

const APP_URL = 'https://brew-log-xi.vercel.app/'

// Hero copy comes from the i18n bundle (English wording is verbatim from the
// README's opening). The dark full-bleed photo hero is the Coffea template's
// signature move; the share-card mockup stays as the "product shot" on the
// right — it is a genuine render of the app's output, which is English-only,
// so it stays in English in both languages.
export default function Hero() {
  const copy = useCopy()

  return (
    <section id="hero" className="relative overflow-hidden">
      <img
        src="/images/hero-beans.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--espresso) 94%, transparent) 0%, color-mix(in srgb, var(--espresso) 82%, transparent) 50%, color-mix(in srgb, var(--espresso) 60%, transparent) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-28 lg:pb-28 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: 'var(--accent-light)' }}
            >
              {copy.hero.eyebrow}
            </p>
            <h1
              className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
              style={{ color: 'var(--card)' }}
            >
              {copy.hero.title}
            </h1>
            <p
              className="mt-6 text-lg"
              style={{ color: 'color-mix(in srgb, var(--card) 82%, transparent)' }}
            >
              {copy.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={APP_URL}
                className="rounded-full px-7 py-3 font-semibold"
                style={{ background: 'var(--card)', color: 'var(--espresso)' }}
              >
                {copy.hero.cta}
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border px-7 py-3 font-semibold"
                style={{
                  borderColor: 'color-mix(in srgb, var(--card) 60%, transparent)',
                  color: 'var(--card)',
                }}
              >
                {copy.hero.secondary}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[280px] overflow-hidden rounded-[2rem] border-4"
              style={{
                borderColor: 'var(--card)',
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src="/images/share-card-hero.png"
                alt="A Brew Log share card for a hot latte, showing the method, beans, ratio, dose, temperature, time, and a 4-star rating"
                className="block h-auto w-full"
                width={337}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
