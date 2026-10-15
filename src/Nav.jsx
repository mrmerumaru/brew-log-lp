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

  return (
    <header
      className="sticky top-0 z-50 transition-[background-color,padding,border-color] duration-200"
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--paper) 85%, transparent)'
          : 'var(--paper)',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
      }}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between px-4 transition-[padding] duration-200 ${
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
          <span className="font-semibold">Brew Log</span>
        </a>

        <nav className="hidden sm:flex items-center gap-6">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm">
              {link.label}
            </a>
          ))}
          <a
            href={APP_URL}
            className="rounded px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--green)', color: 'var(--paper)' }}
          >
            Open the app →
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className="sm:hidden flex flex-col gap-4 px-4 pb-4"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href={APP_URL}
            className="rounded px-4 py-2 text-center font-semibold"
            style={{ background: 'var(--green)', color: 'var(--paper)' }}
          >
            Open the app →
          </a>
        </nav>
      )}
    </header>
  )
}
