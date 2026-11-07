import { LANGS, LANG_LABELS, LANG_NAMES, setLang, useCopy, useLang } from './i18n.js'

// The EN | ID switch, styled as a segmented pill to match the app's own
// language control so the site and the product read as the same thing.
//
// It sits in the nav, which is the one element on the page that is always on
// screen — over the dark hero it paints in light tones, and once the nav goes
// solid cream it flips to ink, matching the nav links either way.
export default function LanguageToggle({ dark = false }) {
  const active = useLang()
  const copy = useCopy()

  const border = dark
    ? 'color-mix(in srgb, var(--card) 45%, transparent)'
    : 'var(--rule)'
  const idleFg = dark
    ? 'color-mix(in srgb, var(--card) 72%, transparent)'
    : 'var(--ink-faint)'

  // The selected segment is always a solid fill in the opposite tone — ivory
  // on the dark hero, espresso on the cream bar — mirroring the nav's own
  // button. A sand-on-cream fill (and caramel text, at ~3.6:1) both read as
  // "not actually selected" at 10px; see the contrast note in tokens.js.
  const onBg = dark ? 'var(--card)' : 'var(--espresso)'
  const onFg = dark ? 'var(--espresso)' : 'var(--paper)'

  return (
    <div
      role="group"
      aria-label={copy.nav.language}
      className="flex shrink-0 overflow-hidden rounded-full"
      style={{ border: `1px solid ${border}` }}
    >
      {LANGS.map((code) => {
        const isActive = code === active
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            aria-label={LANG_NAMES[code]}
            title={LANG_NAMES[code]}
            className="font-mono-band px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
            style={{
              background: isActive ? onBg : 'transparent',
              color: isActive ? onFg : idleFg,
            }}
          >
            {LANG_LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
