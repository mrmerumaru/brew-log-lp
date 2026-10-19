const APP_URL = 'https://brew-log-xi.vercel.app/'

// Hero copy is verbatim from the README's opening (PRD §4.2.1) — the app's
// voice has already committed to this wording.
export default function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-5xl px-4 py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            A coffee consistency tracker.
          </h1>
          <p className="mt-6 text-lg" style={{ color: 'var(--ink-faint)' }}>
            Log every variable of a brew, attach a photo of the cup, and look
            back at what produced your best results.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={APP_URL}
              className="rounded px-6 py-3 font-semibold"
              style={{ background: 'var(--green)', color: 'var(--paper)' }}
            >
              Open the app →
            </a>
            <a
              href="#how-it-works"
              className="rounded border px-6 py-3 font-semibold"
              style={{ borderColor: 'var(--rule)', color: 'var(--ink)' }}
            >
              How it works
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div
            className="w-full max-w-[280px] overflow-hidden rounded-[2rem] border-4"
            style={{
              borderColor: 'var(--ink)',
              boxShadow: '0 20px 40px -12px rgba(32, 29, 26, 0.35)',
            }}
          >
            <img
              src="/images/share-card.png"
              alt="A Brew Log share card for a hot latte, showing the method, beans, ratio, dose, temperature, time, and a 4-star rating"
              className="block h-auto w-full"
              width={899}
              height={1599}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
