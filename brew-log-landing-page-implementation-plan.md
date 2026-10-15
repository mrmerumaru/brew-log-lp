# Implementation Plan: Brew Log — Landing Page

**Author:** Meru Muhamadi
**Status:** Draft v1
**Companion docs:** [PRD](./brew-log-landing-page-prd.md) · [System Design](./brew-log-landing-page-sdd.md)

---

## How to read this

Ordered phases, each with concrete tasks and an acceptance check tied back to the PRD/SDD. Phases are sequential where noted "blocks next phase" — otherwise treat the checklist as roughly top-to-bottom but not rigid. This is a solo build, so there's no parallelization plan beyond what's obviously independent.

Two tasks are flagged **[BLOCKING]** — they gate later phases and have no workaround, so do them early even though they feel like "content," not "code."

---

## Phase 0 — Scaffold

Get a blank Vite+React+Tailwind project running that matches the app's exact dependency versions (SDD §3).

- [ ] `npm create vite@latest . -- --template react` in `brew-log-lp` (repo already exists with the two docs — scaffold into it, don't create a new folder).
- [ ] Pin dependencies to match `marooj_coffee`: `vite@^7`, `react@^19`, `react-dom@^19`, `@vitejs/plugin-react@^5`, `tailwindcss@^4`, `@tailwindcss/vite@^4`, `lucide-react@>=0.400.0 <1`.
- [ ] Write `vite.config.js` (SDD §13) — just `react()` + `tailwindcss()` plugins, no environment-icon logic needed (that was app-specific, per SDD §13).
- [ ] Confirm `npm run dev` serves a blank page.

**Acceptance:** `npm run build` produces a `dist/` with no errors, on the pinned versions.

## Phase 1 — Tokens & global styles [BLOCKING]

Nothing downstream can be styled correctly until this lands, since every component references these.

- [ ] Create `src/tokens.js` — copy the trimmed palette + font constants from SDD §5 (already corrected against the real `marooj_coffee/src/tokens.js` values).
- [ ] Add `applyTokens()` call in `src/main.jsx`, called once before first render (same pattern as the app).
- [ ] Copy the Google Fonts `<link>` block verbatim from `marooj_coffee/index.html` into this project's `index.html` (SDD §6) — same weights, same `preconnect` tags.
- [ ] Build `src/index.css`: CSS custom properties consumed from the token vars, the paper-grain `feTurbulence` filter (SDD §9), base body background/foreground using `var(--paper)` / `var(--ink)`.
- [ ] Spot-check contrast: `amber` (`#C77D2E`) and `green` (`#2F5233`) as text/icon color against `paper` (`#F3F1EC`) and `card` (`#FBFAF7`) — run through a contrast checker now, before any component is built on top of an inaccessible color pairing (SDD §15).

**Acceptance:** A static test div rendered in all four palette colors, correct fonts loading, paper grain visible at low opacity, contrast check passed or color use adjusted.

## Phase 2 — Shell & navigation

- [ ] `src/App.jsx` — assembles section components in order, currently as empty placeholders.
- [ ] `src/useScrollNav.js` — scroll listener hook, boolean past a threshold (SDD §8).
- [ ] `src/Nav.jsx` — logo + wordmark left, nav links + CTA right, collapses to hamburger under 640px, compacts on scroll via the hook.
- [ ] `src/Footer.jsx` — three columns per PRD §4.2.7, stacked on mobile.

**Acceptance:** Nav and footer render and behave correctly in isolation (scroll compaction, mobile hamburger) with placeholder links.

## Phase 3 — Capture real assets [BLOCKING]

The PRD is explicit that screenshots and the share card must be real app output, not mockups (PRD §4.2.4). Nothing in Phase 4 can be finalized without these.

- [ ] Log into the live app (`brew-log-xi.vercel.app`), capture one real share card (Post aspect, ~1080×1350).
- [ ] Capture four screenshots, one per "How it works" step (Sign in / Log a brew / Attach a photo / Look back or share).
- [ ] Resize/compress all of the above manually (SDD §10 — no build-time image pipeline), drop into `public/images/` and `public/images/screenshots/`.
- [ ] Copy `image/logo.jpeg` from `marooj_coffee` into `public/images/logo.jpeg`.

**Acceptance:** All image assets referenced by later components physically exist in `public/images/` at reasonable file sizes (hero/share card < ~300KB, screenshots < ~150KB each).

## Phase 4 — Content sections

Build in this order — each is independent of the others, but this order matches the page's reading order and lets you sanity-check the design system against increasingly complex layouts:

- [ ] `src/Hero.jsx` — verbatim README copy (PRD §4.2.1), two buttons, share-card image in a CSS phone frame.
- [ ] `src/SectionBand.jsx` — shared lettered-band component (A–E), built once here since Hero doesn't use it but WhatWhy does next.
- [ ] `src/WhatWhy.jsx` — band A, two paragraphs + 3-up sub-points (PRD §4.2.2).
- [ ] `src/Features.jsx` — band B, 6 cards with lucide icons, 3×2 → 1-col grid (PRD §4.2.3).
- [ ] `src/HowItWorks.jsx` — band C, 4 steps with the real screenshots from Phase 3 (PRD §4.2.4).
- [ ] `src/Install.jsx` — band D, two static platform columns, no device detection (PRD §4.2.5).
- [ ] `src/Faq.jsx` — band E, accordion with single-open-at-a-time `openIndex` state (PRD §4.2.6, SDD §8). Use the 8-question version per the PRD's own recommendation — don't build for 10 and trim later.

**Acceptance:** Full page scrolls top-to-bottom with real content and assets, no lorem ipsum, no placeholder images.

## Phase 5 — Responsive pass

- [ ] QA at all three PRD breakpoints (§6.3): <640 (mobile), 640–1024 (tablet), ≥1024 (desktop).
- [ ] Verify: hero stacking order on mobile, feature grid column count at each breakpoint, nav hamburger behavior, footer column stacking.
- [ ] Keyboard-only pass: tab through nav, accordion, and footer links; confirm the accordion exposes `aria-expanded` and is operable without a mouse (SDD §15).

**Acceptance:** No horizontal scroll or broken layout at any breakpoint; full page navigable by keyboard alone.

## Phase 6 — SEO & meta

- [ ] `<title>` and meta description matching hero copy (SDD §11).
- [ ] Open Graph + Twitter card tags, `og:image` pointing at the real share-card image from Phase 3.
- [ ] Favicon + apple-touch-icon, reused from `marooj_coffee/public/` (single set, no dev/prod split — SDD §11).
- [ ] `rel="canonical"` — **only if** the custom-domain question (PRD §9) has been resolved by this point; otherwise point it at the `vercel.app` alias and revisit.

**Acceptance:** Sharing the deployed preview URL in Slack/iMessage renders a proper link preview with the share-card image.

## Phase 7 — Content placeholders → real values

Close out everything the PRD and SDD left as TBD:

- [ ] Instagram handle (PRD §9, footer placeholder).
- [ ] Contact email (PRD §9, footer + FAQ item 10).
- [ ] Confirm GitHub links in the footer point to `github.com/mrmerumaru/brew-log` (app repo) and/or `brew-log-lp` (this repo) as intended — PRD §9 resolved the URL but the footer copy itself still needs the right link wired to the right repo.

**Acceptance:** No "TBD," "placeholder," or lorem text remains anywhere in rendered output.

## Phase 8 — Deploy

- [ ] Create new Vercel project, link to `github.com/mrmerumaru/brew-log-lp`, same account as the app (PRD §7, SDD §13).
- [ ] Confirm `main` → production, other branches/PRs → preview deploys, no env vars configured (SDD §13 — there's nothing to configure).
- [ ] Run one Lighthouse pass against the production deploy (SDD §16) — target ~95+ across categories; fix anything that regresses below that before calling it launched.

**Acceptance:** Production URL live, Lighthouse pass done, no console errors on load.

## Phase 9 — Launch

- [ ] Final read-through against the PRD's non-goals (§2) — confirm nothing crept in (no analytics beyond Vercel's, no accounts, no pricing page, etc.).
- [ ] Update the app's share-card generation or bio link (wherever that's configured) to point at the new landing page, closing the loop the PRD opened in §2 ("Why a landing page exists at all").

**Acceptance:** A link from an Instagram share card actually resolves to the deployed landing page.

---

## Sequencing summary

```
Phase 0 (scaffold)
   └─▶ Phase 1 (tokens) [BLOCKING]
          └─▶ Phase 2 (shell/nav)
   Phase 3 (capture assets) [BLOCKING] ── can run anytime, independent of 0–2
          └─▶ Phase 4 (content sections, needs both Phase 1 styles and Phase 3 assets)
                 └─▶ Phase 5 (responsive QA)
                        └─▶ Phase 6 (SEO/meta, needs Phase 3's share-card image)
                               └─▶ Phase 7 (fill placeholders)
                                      └─▶ Phase 8 (deploy)
                                             └─▶ Phase 9 (launch)
```

Phase 3 (asset capture) has no code dependency and can start on day one — do it early so it's not the thing blocking Phase 4 at the last minute.

---

**End of implementation plan.**
