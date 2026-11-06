// Lettered section bands (A-E) are a callback to the in-app form's own
// lettered sections. The letter stays mono; the label is now the editorial
// serif headline that carries the Coffea section-title look. Caramel is the
// letter border, never the text color, per the contrast note in tokens.js.
export default function SectionBand({ letter, label }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span
        className="font-mono-band flex h-8 w-8 shrink-0 items-center justify-center text-sm font-semibold"
        style={{ border: '1px solid var(--accent)', color: 'var(--ink)' }}
      >
        {letter}
      </span>
      <h2
        className="text-2xl font-semibold uppercase tracking-wide sm:text-3xl"
        style={{ color: 'var(--ink)' }}
      >
        {label}
      </h2>
      <span className="h-px flex-1" style={{ background: 'var(--rule)' }} />
    </div>
  )
}
