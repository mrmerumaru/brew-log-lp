import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

// Placeholder section stand-ins for Phase 2 — real content lands in Phase 4.
// Heights/ids exist only so the nav's anchor links and scroll-compaction
// behavior can be exercised before the real sections replace these divs.
const PLACEHOLDER_SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'what-why', label: 'What & Why (band A)' },
  { id: 'features', label: 'Features (band B)' },
  { id: 'how-it-works', label: 'How it works (band C)' },
  { id: 'install', label: 'Install (band D)' },
  { id: 'faq', label: 'FAQ (band E)' },
]

export default function App() {
  return (
    <div id="top">
      <Nav />
      <main>
        {PLACEHOLDER_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen flex items-center justify-center scroll-mt-20"
            style={{ borderBottom: '1px solid var(--rule)' }}
          >
            <p style={{ color: 'var(--ink-faint)' }}>{section.label} — Phase 4</p>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
