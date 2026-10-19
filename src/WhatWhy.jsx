import SectionBand from './SectionBand.jsx'

// Draft copy per PRD §4.2.2 — paraphrased in the app's voice, not verbatim
// from any existing source. Revise wording at build time if it doesn't land.
const SUB_POINTS = [
  'Structured fields so nothing is forgotten.',
  'A photo of the cup, attached to the brew.',
  'Insights across your history — what produced the 4★+ cups.',
]

export default function WhatWhy() {
  return (
    <section id="what-why" className="mx-auto max-w-5xl px-4 py-16">
      <SectionBand letter="A" label="What & why" />

      <div className="grid gap-6 sm:grid-cols-2">
        <p>
          A spreadsheet works until it doesn't. Every brew is another row to
          remember to fill in, and by the third cup of the day the details
          are already gone — what beans, what ratio, how it tasted. A sheet
          doesn't hold a photo, and a photo without the numbers next to it
          doesn't tell you anything either.
        </p>
        <p>
          Brew Log asks for the same handful of fields every time — method,
          beans, parameters, taste — in under a minute, and keeps a photo of
          the cup attached to the row. Everything lands in one place you can
          scroll back through, filter, and compare.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {SUB_POINTS.map((point) => (
          <p key={point} className="text-sm" style={{ color: 'var(--ink-faint)' }}>
            {point}
          </p>
        ))}
      </div>
    </section>
  )
}
