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

- [x] Create `src/tokens.js` — copy the trimmed palette + font constants from SDD §5 (already corrected against the real `marooj_coffee/src/tokens.js` values).
- [x] Add `applyTokens()` call in `src/main.jsx`, called once before first render (same pattern as the app).
- [x] Copy the Google Fonts `<link>` block verbatim from `marooj_coffee/index.html` into this project's `index.html` (SDD §6) — same weights, same `preconnect` tags.
- [x] Build `src/index.css`: CSS custom properties consumed from the token vars, the paper-grain `feTurbulence` filter (SDD §9), base body background/foreground using `var(--paper)` / `var(--ink)`.
- [x] Spot-check contrast: `amber` (`#C77D2E`) and `green` (`#2F5233`) as text/icon color against `paper` (`#F3F1EC`) and `card` (`#FBFAF7`) — run through a contrast checker now, before any component is built on top of an inaccessible color pairing (SDD §15). **Result:** amber fails AA as text almost everywhere; restricted to `card` background + large/bold size only (see SDD §15, `.text-amber-accent` in `index.css`).

**Acceptance:** ✅ Verified via screenshot — all four palette colors render correctly, fonts load (Space Grotesk / Source Serif 4 / IBM Plex Mono), paper grain visible at low opacity, amber contrast issue found and resolved with a background+size rule.

## Phase 2 — Shell & navigation

- [x] `src/App.jsx` — assembles section components in order, currently as empty placeholders.
- [x] `src/useScrollNav.js` — scroll listener hook, boolean past a threshold (SDD §8).
- [x] `src/Nav.jsx` — logo + wordmark left, nav links + CTA right, collapses to hamburger under 640px, compacts on scroll via the hook.
- [x] `src/Footer.jsx` — three columns per PRD §4.2.7, stacked on mobile.

**Acceptance:** ✅ Verified via Playwright-driven screenshots (desktop + mobile, 375px and 1280px viewports): nav compacts and gains a bottom rule past the scroll threshold, anchor links smooth-scroll, hamburger opens/closes correctly on mobile, footer stacks to one column on mobile, zero console errors. Logo pulled forward from Phase 3 (cropped/resized to 256px, 11.7KB) since Nav needed it now; Phase 3's asset list updated accordingly. Footer links resolved where PRD had already settled the URL (app, GitHub repo, issues); Instagram/email remain explicit "(TBD)" placeholders per PRD §9 — not stubbed with fake values.

## Phase 3 — Capture real assets [BLOCKING]

The PRD is explicit that screenshots and the share card must be real app output, not mockups (PRD §4.2.4). Nothing in Phase 4 can be finalized without these.

- [x] Capture one real share card. Actual export turned out to be Story aspect (899×1599, ≈1080×1920), not the originally-planned Post aspect (1080×1350) — kept as-is and updated PRD §4.2.1 to match, since the taller aspect suits a phone-frame treatment better anyway.
- [x] Capture five screenshots, one per "How it works" step (Sign in / Log a brew / Attach a photo / Look back / Share it — step 4 split into two once real screenshots showed History and the Share sheet deserved separate steps; PRD §4.2.4 updated accordingly).
- [x] Resize/compress the five screenshots manually (SDD §10 — no build-time image pipeline), dropped into `public/images/screenshots/` (28–92KB each, all under the 150KB budget).
- [x] Copy `image/logo.jpeg` from `marooj_coffee` into `public/images/logo.jpg` — done early in Phase 2 since Nav needed it; cropped to the square badge and downscaled to 256px (11.7KB).

**Acceptance:** ✅ All image assets exist. `public/images/share-card.png` is the clean exported card (104KB, Story aspect) used for the Hero and OG meta tag. `public/images/screenshots/05-share.png` is the same card image, resized to match the other four screenshots (96KB) — reused per user decision rather than a dedicated Share-editor screenshot, since showing the output is a more honest answer to "what does sharing produce?" than the editor chrome.

## Phase 4 — Content sections

Build in this order — each is independent of the others, but this order matches the page's reading order and lets you sanity-check the design system against increasingly complex layouts:

- [x] `src/Hero.jsx` — verbatim README copy (PRD §4.2.1), two buttons, share-card image in a CSS phone frame.
- [x] `src/SectionBand.jsx` — shared lettered-band component (A–E), built once here since Hero doesn't use it but WhatWhy does next. Reuses the app's own "[A] DRINK" boxed-letter motif (visible in the real screenshots), with amber as the border only — never the text — per the Phase 1 contrast constraint.
- [x] `src/WhatWhy.jsx` — band A, two paragraphs + 3-up sub-points (PRD §4.2.2). Paragraph copy is draft, written in the app's voice since the PRD only gave notes, not verbatim text — flagged in a code comment for revision.
- [x] `src/Features.jsx` — band B, 6 cards with lucide icons, 3×2 → 1-col grid (PRD §4.2.3).
- [x] `src/HowItWorks.jsx` — band C, 5 steps with the real screenshots from Phase 3 (PRD §4.2.4), numbered with the same boxed-letter motif as SectionBand.
- [x] `src/Install.jsx` — band D, two static platform columns, no device detection (PRD §4.2.5).
- [x] `src/Faq.jsx` — band E, accordion with single-open-at-a-time `openIndex` state (PRD §4.2.6, SDD §8). Used the 8-question version per the PRD's own recommendation (dropped the never-written item 7 and the "I found a bug" item, which already lives in the Footer's "Report a bug" link) — renumbered 1–8.

**Acceptance:** ✅ Verified via Playwright-driven screenshots at 375px and 1280px: full page scrolls top-to-bottom with real content and real assets (no lorem ipsum, no placeholder images), accordion single-open-at-a-time behavior confirmed by opening one item then another, zero console errors on either viewport.

## Phase 5 — Responsive pass

- [x] QA at all three PRD breakpoints (§6.3): <640 (mobile), 640–1024 (tablet), ≥1024 (desktop).
- [x] Verify: hero stacking order on mobile, feature grid column count at each breakpoint, nav hamburger behavior, footer column stacking.
- [x] Keyboard-only pass: tab through nav, accordion, and footer links; confirm the accordion exposes `aria-expanded` and is operable without a mouse (SDD §15).

**Acceptance:** ✅ Verified programmatically (`document.documentElement.scrollWidth` vs `clientWidth`) at 375px/768px/1280px — zero horizontal overflow at any breakpoint. Hero confirmed single-column until exactly the `lg` (1024px) breakpoint, 2-column feature grid at tablet, full-page tablet screenshot clean end-to-end. Keyboard pass: tab order through Nav is logical (logo → links → CTA → Hero buttons), FAQ accordion toggles `aria-expanded` via Enter, mobile hamburger toggles `aria-expanded` and its own `aria-label` (Open→Close) via Enter and tabbing continues into the revealed menu, `:focus-visible` ring clearly visible on every interactive element tested.

## Phase 6 — SEO & meta

- [x] `<title>` and meta description matching hero copy (SDD §11).
- [x] Open Graph + Twitter card tags, `og:image` pointing at the real share-card image from Phase 3.
- [x] Favicon + apple-touch-icon, reused from `marooj_coffee/public/` (single set, no dev/prod split — SDD §11).
- [x] `rel="canonical"` — custom domain (PRD §9) is still unresolved, so pointed at `https://brew-log-lp.vercel.app/` (the Vercel default naming convention for this project) as a placeholder.

**Acceptance:** Partial — verified what's testable pre-deploy: title, meta description, and all OG/Twitter/canonical tags render correctly in the compiled HTML; favicon and apple-touch-icon both resolve (200, `image/png`); zero console errors. **Not yet verifiable:** the actual social-preview rendering (Slack/iMessage/Twitter card), since that needs a real deployed URL — Phase 8 hasn't run yet. Two follow-ups once deployed:
1. Confirm `brew-log-lp.vercel.app` is the actual assigned URL (Vercel appends a suffix if the name's taken) and update the three absolute URLs in `index.html` (`og:image`, `og:url`, `twitter:image`) plus `rel="canonical"` if it differs, or once a custom domain is decided.
2. The share card is a tall Story-aspect image (≈9:16). Most link-preview surfaces (Slack, iMessage, Twitter's `summary_large_image`) are tuned for landscape (~1.91:1) and will crop or letterbox a portrait image rather than show it cleanly. Worth an actual preview check post-deploy — if it looks bad, the fallback is a square or landscape crop of the card specifically for `og:image`, separate from the Hero's phone-frame asset.

## Phase 7 — Content placeholders → real values

Close out everything the PRD and SDD left as TBD:

- [x] Instagram handle (PRD §9, footer placeholder) — `theonebrewlog`.
- [x] Contact email (PRD §9, footer) — `theonebrewlog@gmail.com`. (FAQ item 10 doesn't apply — it was dropped in Phase 4 when the FAQ was trimmed to 8 questions; the bug-report flow lives only in the Footer now.)
- [x] Confirmed GitHub links point to `github.com/mrmerumaru/brew-log` (the app repo), not this landing-page repo — both "GitHub repo" and "Report a bug" are about the product a visitor came here to learn about, not the marketing site's own source. Matches how product landing pages conventionally link out.

**Acceptance:** ✅ `grep`'d the full source for "TBD"/"lorem"/"placeholder" — the only hit is a code comment (Phase 6's domain-placeholder note), nothing in rendered output. Verified all 5 footer links resolve to the correct hrefs via Playwright, zero console errors.

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
