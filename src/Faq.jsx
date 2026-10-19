import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionBand from './SectionBand.jsx'

// 8 questions per the PRD's own recommendation (§4.2.6) — the original list
// numbered to 10 but item 7 was never written and item 10 ("I found a bug")
// is dropped since that's already the Footer's "Report a bug" link.
const FAQS = [
  {
    q: 'What is Brew Log?',
    a: 'A web app for logging brews: source, equipment, beans, parameters, tasting notes, photo, rating. History and Insights are built in.',
  },
  {
    q: 'Is it free?',
    a: "Yes. It's a personal project; there's nothing to pay for and no plan to change that.",
  },
  {
    q: 'Do I need an account?',
    a: 'Yes, to save brews. Sign-in is Google only — no password to manage, no email verification step. (Google\'s OAuth consent screen is in Testing mode, so the first sign-in shows an "unverified app" notice; that\'s expected.)',
  },
  {
    q: 'Where is my data?',
    a: "In your own Supabase project. Row-level security scopes each brew to the user that wrote it. You never see another user's data and they never see yours.",
  },
  {
    q: 'Can I export it?',
    a: "Not yet. The schema is plain Postgres, so a direct pg_dump from your project works, but there's no built-in export button.",
  },
  {
    q: 'Does it work offline?',
    a: 'Partially. The shell caches, so a flaky connection still opens the app — but every brew is written to Supabase live, so logging without a connection returns an error rather than queuing the row.',
  },
  {
    q: 'Why Google sign-in only?',
    a: "Magic-link email worked but Supabase's built-in sender rate-limits to a couple of messages an hour, which made sign-in unreliable for new users. Google is the only path that doesn't depend on email deliverability. Email OTP can be re-enabled if the rate limit becomes a real problem.",
  },
  {
    q: 'Will it stay free?',
    a: "No plan to charge. It's a personal project shared with friends; no roadmap to monetise.",
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="mx-auto max-w-5xl px-4 py-16">
      <SectionBand letter="E" label="FAQ" />

      <div style={{ borderTop: '1px solid var(--rule)' }}>
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={item.q} style={{ borderBottom: '1px solid var(--rule)' }}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.q}
                <ChevronDown
                  size={18}
                  className="shrink-0"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 150ms',
                  }}
                />
              </button>
              {isOpen && (
                <p className="pb-4 text-sm" style={{ color: 'var(--ink-faint)' }}>
                  {item.a}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
