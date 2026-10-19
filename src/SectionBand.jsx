// Lettered section bands (A-E) are a callback to the in-app form's own
// lettered sections (see public/images/screenshots/02-log-a-brew.png — the
// "[A] DRINK" boxed-letter pattern). Amber is the border, never the text
// color, per the contrast constraint documented in tokens.js.
export default function SectionBand({ letter, label }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span
        className="font-mono-band flex h-7 w-7 shrink-0 items-center justify-center text-sm font-semibold"
        style={{ border: '1px solid var(--amber)', color: 'var(--ink)' }}
      >
        {letter}
      </span>
      <span
        className="font-mono-band text-sm uppercase tracking-wide"
        style={{ color: 'var(--ink-faint)' }}
      >
        {label}
      </span>
      <span className="h-px flex-1" style={{ background: 'var(--rule)' }} />
    </div>
  )
}
