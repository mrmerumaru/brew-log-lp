import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollNav } from './useScrollNav.js'

const APP_URL = 'https://brew-log-xi.vercel.app/'

// PRD §4.1 lists a "Contact" nav link, but §4.2's section table has no
// dedicated Contact band — contact details live in the Footer's "Find me"
// column. Routing "Contact" to the footer is the closest honest target.
const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
  { href: '#footer', label: 'Contact' },
]

export default function Nav() {
  const scrolled = useScrollNav()
  const [open, setOpen] = useState(false)

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
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-[padding] duration-200 ${
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

        <nav className="hidden items-center gap-6 sm:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm" style={{ color: fg }}>
              {link.label}
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
            Open the app →
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="sm:hidden"
          style={{ color: fg }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
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
              {link.label}
            </a>
          ))}
          <a
            href={APP_URL}
            className="rounded-full px-4 py-2 text-center font-semibold"
            style={{ background: 'var(--espresso)', color: 'var(--paper)' }}
          >
            Open the app →
          </a>
        </nav>
      )}
    </header>
  )
}
