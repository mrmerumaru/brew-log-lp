import SectionBand from './SectionBand.jsx'

const STEPS = [
  {
    title: 'Sign in',
    description: 'Google only. Your brews are scoped to your account from the first row.',
    image: '/images/screenshots/01-sign-in.png',
    alt: 'Brew Log sign-in screen with a Continue with Google button',
  },
  {
    title: 'Log a brew',
    description: "Fill the fields, hit Save. Under 60 seconds once you've done it twice.",
    image: '/images/screenshots/02-log-a-brew.png',
    alt: 'Brew Log form with drink and method fields, Espresso selected',
  },
  {
    title: 'Attach a photo',
    description: 'Pick the cup photo in the same flow. It rides along with the row.',
    image: '/images/screenshots/03-attach-a-photo.png',
    alt: 'Brew Log tasting notes screen with an arrow pointing at the photo-attach button',
  },
  {
    title: 'Look back',
    description: 'Every brew lands in History — filter by method, bean or rating to compare.',
    image: '/images/screenshots/04-history.png',
    alt: 'Brew Log history list showing past brews with photos and ratings',
  },
  {
    title: 'Share it',
    description: 'Generate the share card and post it to Instagram.',
    // Reuses the exported card itself rather than a Share-editor screenshot —
    // showing the output is a more honest answer to "what does sharing
    // produce?" than the editor chrome would be (see PRD §4.2.4).
    image: '/images/screenshots/05-share.png',
    alt: 'An exported Brew Log share card for a hot latte',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-16">
      <SectionBand letter="C" label="How it works" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, index) => (
          <div key={step.title}>
            <div
              className="overflow-hidden rounded border"
              style={{ borderColor: 'var(--rule)' }}
            >
              <img src={step.image} alt={step.alt} className="block h-auto w-full" loading="lazy" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className="font-mono-band flex h-6 w-6 shrink-0 items-center justify-center text-xs font-semibold"
                style={{ border: '1px solid var(--amber)', color: 'var(--ink)' }}
              >
                {index + 1}
              </span>
              <h3 className="font-semibold">{step.title}</h3>
            </div>
            <p className="mt-1 text-sm" style={{ color: 'var(--ink-faint)' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm italic" style={{ color: 'var(--ink-faint)' }}>
        Setups carry forward. Tasting notes, ratings and photos don't — every
        cup is logged on its own terms.
      </p>
    </section>
  )
}
