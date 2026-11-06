// A photo band between Features and How it works — the Coffea "best beans"
// banner treatment, adapted to Brew Log. Cream background, editorial serif
// headline on the left, coffee still on the right.
const APP_URL = 'https://brew-log-xi.vercel.app/'

export default function PhotoBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div
        className="grid items-center gap-8 overflow-hidden rounded-[2rem] sm:grid-cols-2"
        style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}
      >
        <div className="p-8 lg:p-12">
          <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">
            Same beans, same method, better every time.
          </h2>
          <p className="mt-4 text-sm" style={{ color: 'var(--ink-faint)' }}>
            Brew Log keeps the variables where you can see them — so the next
            cup is a decision, not a guess.
          </p>
          <a
            href={APP_URL}
            className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold"
            style={{ background: 'var(--espresso)', color: 'var(--paper)' }}
          >
            Start logging →
          </a>
        </div>
        <div className="relative h-full min-h-[240px]">
          <img
            src="/images/latte-still.jpg"
            alt="A latte with heart-shaped latte art on a wooden table"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
