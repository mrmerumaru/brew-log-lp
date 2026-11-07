import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollNav } from './useScrollNav.js'
import LanguageToggle from './LanguageToggle.jsx'
import { useCopy } from './i18n.js'

const APP_URL = 'https://brew-log-xi.vercel.app/'

// PRD §4.1 lists a "Contact" nav link, but §4.2's section table has no
// dedicated Contact band — contact details live in the Footer's "Find me"
// column. Routing "Contact" to the footer is the closest honest target.
// Keys, not literals: the label comes from the i18n bundle.
const LINKS = [
  { href: '#features', key: 'features' },
  { href: '#how-it-works', key: 'how' },
  { href: '#faq', key: 'faq' },
  { href: '#footer', key: 'contact' },
]

export default function Nav() {
  const scrolled = useScrollNav()
  const [open, setOpen] = useState(false)
  const copy = useCopy()

  // Over the dark hero (not scrolled) the nav is transparent with ivory text;
  // once scrolled it becomes a translucent cream bar with ink text.
  const fg = scrolled ? 'var(--ink)' : 'var(--card)'

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200"
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--paper) 88%, transparent)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
      }}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[padding] duration-200 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/images/logo.jpg"
            alt="Brew Log"
            className="h-8 w-8 rounded-md"
            width={32}
            height={32}
          />
          <span className="font-semibold" style={{ color: fg }}>
            Brew Log
          </span>
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden items-center gap-6 sm:flex">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm" style={{ color: fg }}>
                {copy.nav[link.key]}
              </a>
            ))}
            <a
              href={APP_URL}
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={
                scrolled
                  ? { background: 'var(--espresso)', color: 'var(--paper)' }
                  : { background: 'var(--card)', color: 'var(--espresso)' }
              }
            >
              {copy.nav.open}
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
            aria-expanded={open}
            className="sm:hidden"
            style={{ color: fg }}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* The nav is the one element that is always on screen, so the
              language switch lives here rather than in a section — it stays
              reachable at any scroll position, and matches where the app puts
              its own EN | ID control.

              It is deliberately LAST in this row. The labels to its left change
              length with the language ("How it works" is 86px, "Cara kerja" 73)
              and the row is right-anchored to the container edge, so anything
              after them gets dragged sideways on every tap. Pinned to the right
              edge, the control holds still and only the links reflow. */}
          <LanguageToggle dark={!scrolled} />
        </div>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-4 px-4 pb-4 sm:hidden"
          style={{
            background: 'var(--paper)',
            borderTop: '1px solid var(--rule)',
          }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: 'var(--ink)' }}
              onClick={() => setOpen(false)}
            >
              {copy.nav[link.key]}
            </a>
          ))}
          <a
            href={APP_URL}
            className="rounded-full px-4 py-2 text-center font-semibold"
            style={{ background: 'var(--espresso)', color: 'var(--paper)' }}
          >
            {copy.nav.open}
          </a>
        </nav>
      )}
    </header>
  )
}
