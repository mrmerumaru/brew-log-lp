# System Design: Brew Log — Landing Page

**Author:** Meru Muhamadi
**Status:** Draft v1
**Companion doc:** [brew-log-landing-page-prd.md](./brew-log-landing-page-prd.md)

---

## 1. Scope

This document covers the technical design for the static landing page described in the PRD: how it's built, how it's structured, how it ports design tokens from `marooj_coffee`, and how it deploys. It does not re-litigate product scope — see the PRD for what the page contains and why.

## 2. Architecture

A single-page static site. One `index.html`, anchor-linked sections, no router, no client-side data fetching, no backend. The only "dynamic" behavior is local UI state (accordion open/closed, mobile nav toggle, scroll-triggered nav style) — all client-only, no network calls.

Built with Vite, output is static HTML/CSS/JS, served from Vercel's CDN. There is nothing for Vercel to run at request time; every deploy is a full static build.

## 3. Tech Stack

Matches `marooj_coffee`'s versions exactly, so the ported tokens and fonts behave identically and there's zero ramp-up:

| | Version |
|---|---|
| Vite | `^7.0.0` |
| React | `^19.0.0` |
| `@vitejs/plugin-react` | `^5.0.0` |
| Tailwind (`@tailwindcss/vite`) | `^4.0.0` |
| `lucide-react` | `>=0.400.0 <1` |

No `@supabase/supabase-js`, no auth, no env vars — this site has no backend dependency at all.

## 4. Project Structure

Mirrors the app's flat `src/` convention (one file per concern, no nested feature folders):

```
brew-log-lp/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   └── images/
│       ├── logo.jpeg          # ported from marooj_coffee/image/logo.jpeg
│       ├── share-card.png     # real app output, used in hero
│       └── screenshots/       # real app screenshots, one per "How it works" step
├── src/
│   ├── main.jsx
│   ├── App.jsx                # assembles sections in order
│   ├── tokens.js               # trimmed port — palette + fonts only
│   ├── index.css               # token CSS vars, paper grain, band rules, focus rings
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── WhatWhy.jsx             # band A
│   ├── Features.jsx            # band B
│   ├── HowItWorks.jsx          # band C
│   ├── Install.jsx             # band D
│   ├── Faq.jsx                 # band E, accordion
│   ├── Footer.jsx
│   ├── SectionBand.jsx         # shared lettered-band label (A/B/C/D/E)
│   └── useScrollNav.js         # scroll-state hook for the nav
```

No test files planned at launch — there's no business logic worth unit-testing (see §9). If an accordion/nav hook grows real branching logic, add a colocated `*.test.js` the way the app does.

## 5. Design Tokens

Ported from `marooj_coffee/src/tokens.js`, palette and type constants only — the app's content vocabularies (`DRINKS`, `METHODS`, `FLAVORS`, etc.) don't apply here and aren't copied:

```js
// src/tokens.js
export const TOKENS = {
  paper: "#F3F1EC",
  card: "#FBFAF7",
  ink: "#201D1A",
  inkFaint: "#6B6558",
  rule: "#D8D2C4",
  green: "#2F5233",
  greenSoft: "#E4EADF",
  amber: "#C77D2E",
  greenDeep: "#26421F",
};

export const SANS = "'Space Grotesk', sans-serif";
export const MONO = "'IBM Plex Mono', monospace";
export const SERIF = "'Source Serif 4', serif";
```

Same `applyTokens()` pattern as the app: set as CSS custom properties on `documentElement` once at startup, so `index.css` can reference `var(--ink)` etc. without a second hardcoded copy.

*(These are the corrected values from the PRD review — `ink`/`amber`/`green` differ from the PRD's original draft, which had stale hex codes.)*

## 6. Fonts & Icons

- Fonts: identical Google Fonts `<link>` as the app's `index.html` (Space Grotesk, IBM Plex Mono, Source Serif 4, same weights), so there's no second font-loading strategy to maintain.
- Icons: `lucide-react`, same set the app uses — one icon per feature card (§4.2.3 of the PRD).

## 7. Components → PRD Sections

Direct 1:1 mapping, each PRD section (§4.2) is one component:

| Component | PRD section | Notes |
|---|---|---|
| `Nav.jsx` | §4.1 | Sticky; `useScrollNav` hook flips it to the thin translucent variant on scroll |
| `Hero.jsx` | §4.2.1 | Verbatim README copy; share-card image in a CSS-only phone frame (no image-manipulation lib) |
| `WhatWhy.jsx` | §4.2.2 | Band A; static prose + 3-up sub-points |
| `Features.jsx` | §4.2.3 | Band B; 6 cards, CSS grid (3×2 → 1-col via Tailwind breakpoints) |
| `HowItWorks.jsx` | §4.2.4 | Band C; 4 steps, real screenshots from `public/images/screenshots/` |
| `Install.jsx` | §4.2.5 | Band D; two static columns, no platform detection — both shown always |
| `Faq.jsx` | §4.2.6 | Band E; accordion, single-open-at-a-time per PRD §4.2.6 |
| `Footer.jsx` | §4.2.7 | 3-column desktop / stacked mobile |
| `SectionBand.jsx` | — | Shared: renders the ruled mono letter (A–E) each banded section uses |

## 8. Interactivity (client state)

Everything is local `useState`, no global store needed:

- **Nav scroll state** (`useScrollNav.js`): a scroll listener toggling a boolean past a threshold; drives the nav's compact styling.
- **Mobile nav toggle**: boolean in `Nav.jsx`, collapses to hamburger under 640px per PRD §6.3.
- **FAQ accordion**: single `openIndex` state in `Faq.jsx`; clicking a question toggles it, opening one closes any other (desktop-style behavior, applied at all breakpoints per the PRD's recommendation in §4.2.6).
- **Smooth scroll**: CSS `scroll-behavior: smooth` + anchor hrefs — no JS needed for the nav's in-page links or the hero's "How it works" button.

## 9. Styling

Same split as `marooj_coffee` and as recommended in PRD §7:

- **Tailwind** for layout, spacing, responsive grid/flex utilities.
- **Plain CSS** (`index.css`) for anything that reads as "print," not "utility":
  - Token CSS variables (`applyTokens` output)
  - Paper grain (`feTurbulence` SVG filter, build-time/CSS only, no image request)
  - Section-band rule styling (the A/B/C/D/E ruled mono labels)
  - Focus rings

## 10. Assets

- **Screenshots & share card**: real captures from the live app (`brew-log-xi.vercel.app`), not mockups — per PRD §4.2.4. These need to be captured and dropped into `public/images/` before launch; nothing generates them automatically.
- **Logo**: `image/logo.jpeg` copied over from `marooj_coffee` as-is.
- **Image optimization**: manual — resize/compress before committing (no image CDN or build-time optimization pipeline, since asset count is small and fixed).

## 11. SEO & Social Meta

Given the PRD's primary audience is social/forwarded-link traffic (§3), this matters more than usual for a small static site:

- Open Graph tags (`og:title`, `og:description`, `og:image` — the real share-card image) and Twitter card equivalents, so links posted anywhere (not just Instagram) render a preview.
- `<title>` and meta description matching the hero copy.
- `rel="canonical"` pointing at the production URL once the domain is finalized (PRD §9 — still open).
- Favicon/apple-touch-icon: single set, reused from the app's `public/` icons. No dev/prod icon split needed — unlike the app, this site has no login state or installed-PWA identity to distinguish.

## 12. Routing

None. One HTML document, hash anchors for in-page navigation. No 404 handling needed beyond Vercel's default.

## 13. Build & Deployment

- `vite build` → static `dist/`, deployed to Vercel (new project, same account per PRD §7).
- Branch strategy: simpler than the app's dev/main split, since there's no environment-specific behavior (no auth, no dev icon set). `main` → production; any other branch/PR → Vercel preview deploy. No `VITE_APP_ENV` flag needed.
- No environment variables at all — nothing to configure in Vercel's project settings beyond the build command.

## 14. Performance

Target: static page, Lighthouse ~95+ across the board. Concretely:
- Screenshots and the share-card image lazy-loaded below the fold (`loading="lazy"`).
- Fonts already use `display=swap` (inherited from the app's font link).
- React is a deliberate tradeoff here (PRD §7 flags the plain-HTML alternative) — for a single static page the JS cost is non-zero, but token/component parity with the app and future extensibility (PRD §7: "if a blog lands later") was judged worth it.

## 15. Accessibility

- Contrast: `ink` (`#201D1A`) on `paper` (`#F3F1EC`) is comfortably AA. `amber` (`#C77D2E`) and `green` (`#2F5233`) as text/icon colors on `paper`/`card` should be spot-checked against WCAG AA before launch — they're used for data signals and CTAs respectively, so they need to hold up as more than decoration.
- Accordion and hamburger menu must be keyboard-operable and expose `aria-expanded`.
- All screenshots and the share-card image need real `alt` text (not filenames).

## 16. Testing

Minimal, matching the PRD's own "this is a small static site" framing:
- No unit tests planned at launch (no business logic to test — see §4).
- Manual responsive QA at the three PRD breakpoints (§6.3: <640, 640–1024, ≥1024).
- One-time Lighthouse pass before launch; not wired into CI, since there's no CI pipeline planned for a page that doesn't change often (PRD non-goal: no changelog, no frequent updates).

## 17. Out of Scope

Same non-goals as the PRD (§2): no backend, no accounts, no analytics beyond Vercel's built-in traffic view, no CMS, no localization.

## 18. Open Items Before Launch

- Real screenshots and share-card image need to be captured from the live app (§10) — nothing exists for this yet.
- Contrast check on amber/green against the two background tones (§15).
- Custom domain still deferred per PRD §9 — affects `rel="canonical"` and any OG `url` tag until resolved.

---

**End of SDD.**
