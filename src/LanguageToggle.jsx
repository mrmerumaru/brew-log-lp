import { LANGS, LANG_LABELS, LANG_NAMES, setLang, useCopy, useLang } from './i18n.js'

// The EN | ID switch, styled as a segmented pill to match the app's own
// language control so the site and the product read as the same thing.
//
// It sits in the nav, which is the one element on the page that is always on
// screen — over the dark hero it paints in light tones, and once the nav goes
// solid cream it flips to ink, matching the nav links either way.
//
// Two details are load-bearing rather than decorative:
//
// 1. Each segment is a fixed width and both labels carry the same weight. The
//    nav labels around this control change length with the language, and the
//    cluster they sit in is right-anchored, so anything that changes the
//    control's own width would drag it sideways on every tap.
// 2. The flags are drawn inline so the control reads as a language picker at a
//    glance. Both carry a hairline ring: without one, the Indonesian flag's
//    white half is invisible on an ivory segment — white against --card is a
//    4/255 difference. The ring is a fixed espresso tone rather than
//    currentColor so the boundary doesn't change tone with the segment; on the
//    dark hero it is simply invisible, and the flag contrasts there on its own.
function Flag({ code }) {
  const clipId = `lang-flag-${code}`
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" className="shrink-0">
      <defs>
        <clipPath id={clipId}>
          <circle cx="8" cy="8" r="8" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {code === 'en' ? (
          <>
            <rect width="16" height="16" fill="#012169" />
            <path d="M0 0 16 16 M16 0 0 16" stroke="#fff" strokeWidth="3.6" />
            <path d="M0 0 16 16 M16 0 0 16" stroke="#C8102E" strokeWidth="1.8" />
            <path d="M8 0V16 M0 8H16" stroke="#fff" strokeWidth="5.6" />
            <path d="M8 0V16 M0 8H16" stroke="#C8102E" strokeWidth="3.2" />
          </>
        ) : (
          <>
            <rect width="16" height="8" fill="#CE1126" />
            <rect y="8" width="16" height="8" fill="#fff" />
          </>
        )}
      </g>
      <circle cx="8" cy="8" r="7.4" fill="none" stroke="#2B1F1A" strokeOpacity="0.55" strokeWidth="1.2" />
    </svg>
  )
}

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
            className="font-mono-band inline-flex w-[62px] items-center justify-center gap-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
            style={{
              background: isActive ? onBg : 'transparent',
              color: isActive ? onFg : idleFg,
            }}
          >
            <Flag code={code} />
            {LANG_LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
