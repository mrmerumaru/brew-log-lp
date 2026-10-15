const APP_URL = 'https://brew-log-xi.vercel.app/'
const GITHUB_APP_REPO = 'https://github.com/mrmerumaru/brew-log'

// Instagram handle and contact email are still open per PRD §9 — placeholders
// until those are filled in (implementation plan Phase 7).
const INSTAGRAM_HANDLE = null
const CONTACT_EMAIL = null

export default function Footer() {
  return (
    <footer id="footer" style={{ borderTop: '1px solid var(--rule)' }}>
      <div className="mx-auto max-w-5xl px-4 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-semibold">Brew Log</p>
          <p className="text-sm mt-2" style={{ color: 'var(--ink-faint)' }}>
            A coffee consistency tracker.
          </p>
          <p className="text-sm mt-4" style={{ color: 'var(--ink-faint)' }}>
            © 2026 Meru Muhamadi.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-2">Links</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href={APP_URL}>Open the app</a>
            </li>
            <li>
              <a href={GITHUB_APP_REPO}>GitHub repo</a>
            </li>
            <li>
              <a href={`${GITHUB_APP_REPO}/issues/new`}>Report a bug</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Find me</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              {INSTAGRAM_HANDLE ? (
                <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`}>@{INSTAGRAM_HANDLE}</a>
              ) : (
                <span style={{ color: 'var(--ink-faint)' }}>Instagram (TBD)</span>
              )}
            </li>
            <li>
              {CONTACT_EMAIL ? (
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              ) : (
                <span style={{ color: 'var(--ink-faint)' }}>Email (TBD)</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div
        className="text-center text-xs py-4 px-4"
        style={{ borderTop: '1px solid var(--rule)', color: 'var(--ink-faint)' }}
      >
        Made with React, Vite and Supabase. Brew data is yours.
      </div>
    </footer>
  )
}
