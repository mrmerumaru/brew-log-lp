import SectionBand from './SectionBand.jsx'

const PLATFORMS = [
  {
    name: 'iOS',
    steps: ['Open brew-log-xi.vercel.app in Safari.', 'Tap the Share icon.', 'Tap "Add to Home Screen".'],
  },
  {
    name: 'Android',
    steps: ['Open brew-log-xi.vercel.app in Chrome.', 'Tap the ⋮ menu.', 'Tap "Install app".'],
  },
]

export default function Install() {
  return (
    <section id="install" className="mx-auto max-w-5xl px-4 py-16">
      <SectionBand letter="D" label="Install" />

      <div className="grid gap-10 sm:grid-cols-2">
        {PLATFORMS.map((platform) => (
          <div key={platform.name}>
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
        Installed, it opens in its own window, with its own icon, no browser
        chrome. The brew data still lives in your Supabase account — sign in
        once and the install is personal to you.
      </p>
    </section>
  )
}
