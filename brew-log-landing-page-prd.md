# PRD: Brew Log — Landing Page

**Author:** Meru Muhamadi
**Status:** Draft v1
**Last updated:** October 13, 2026

---

## 1. Overview

A small static website that introduces **Brew Log**, a coffee brew-tracking PWA living at <https://brew-log-xi.vercel.app/>. The landing page is informational only — it explains what the app is, why it exists, how to use it, answers common questions, and provides a way to get in touch. It is **not** the app itself; it never reads or writes brew data.

The primary purpose is to give anyone landing here from a share card on Instagram, a forwarded link, or a search engine a place to learn about the app without having to sign in first.

## 2. Problem & Goal

### Why a landing page exists at all

Brew Log's share cards post to Instagram with no link back to the app. Anyone who sees a cup and asks "what app is that?" has no canonical place to read about it. The README and the app itself are both unauthenticated-unfriendly — the app redirects to sign-in, the README assumes a developer audience.

The site is the missing middle layer: a public, browsable, no-account-required explanation of the product.

### Goals

- Explain what Brew Log is and why someone would want it, in under a minute of reading.
- Provide a self-serve answer to the most common questions (sign-in method, data ownership, offline behaviour, cost, devices) so the founder isn't answering them in chat.
- Drive visits to the live app (`brew-log-xi.vercel.app`) via a clear primary CTA.
- Provide a single, canonical home for the Instagram handle and contact details so they don't drift across README, share cards and DMs.

### Non-goals

- No app-like functionality. No interactivity beyond nav and a contact form (optional).
- No blog, changelog, or content updates after launch beyond the FAQ.
- No accounts, no email collection, no analytics beyond Vercel's built-in traffic.
- No store / pricing page — there is nothing to buy.
- No localisation. English only at launch.

## 3. Target Audience

Three groups, in roughly this order of importance:

1. **Instagram visitors.** Someone saw a share card on social, taps the bio link, wants to know what the app is and how to try it.
2. **Recipients of a forwarded link.** A friend or family member was told "try this app", opened the link, wants confirmation it's safe before signing in with Google.
3. **Returning users.** Existing users who want to remember the install steps or find the FAQ without opening the app.

The site is not built for the development audience — the README and `docs/` folder already serve that.

## 4. Site Structure

Single page, anchored sections with a sticky top nav. Footer is global; everything else is in-page.

### 4.1 Top nav

Left: Brew Log mark (the gold-on-black badge from `image/logo.jpeg`) + wordmark.
Right (links): **Features** · **How it works** · **FAQ** · **Contact**.
A single primary CTA button on the right edge: **Open the app →**, linking to `https://brew-log-xi.vercel.app/`.

On scroll, the nav becomes a thin translucent bar with the same content.

### 4.2 Sections, top to bottom

| # | Section | Letter band | Purpose |
|---|---|---|---|
| 1 | Hero | — | Name, tagline, primary CTA, a real share-card image on the right |
| 2 | What & Why | A | Problem statement + one-paragraph solution |
| 3 | Features | B | 6 feature cards |
| 4 | How it works | C | 4-step walkthrough with screenshots |
| 5 | Install | D | Add-to-Home-Screen instructions for iOS and Android |
| 6 | FAQ | E | 8–10 questions, accordion |
| 7 | Footer | — | Instagram, contact, copyright, links |

#### 4.2.1 Hero

- Headline: **"A coffee consistency tracker."** (one line, large)
- Subhead: **"Log every variable of a brew, attach a photo of the cup, and look back at what produced your best results."**
- Two buttons: **Open the app** (primary, links to the live app) · **How it works** (secondary, smooth-scrolls to section C).
- Right side: a single, large share-card image (real output from the app, ~1080×1350, set in a phone-shaped frame with a subtle drop shadow).

The hero copy is taken verbatim from the README's opening — that's the wording the app's voice has already committed to.

#### 4.2.2 What & Why (band A)

One paragraph on the problem (sheet-logging is slow, easy to abandon, captures nothing visual), one paragraph on the solution (structured, fast, photo + share in the same flow). Tonal mirror of the in-app editorial style: short sentences, plain language, no marketing copy.

Below the prose, three "what it gives you" sub-points in a row:

- Structured fields so nothing is forgotten.
- A photo of the cup, attached to the brew.
- Insights across your history — what produced the 4★+ cups.

#### 4.2.3 Features (band B)

Six cards in a 3×2 grid on desktop, single column on mobile. Each card has an icon (lucide, matching the app's icon set), a one-line title, and a 1–2 sentence description.

| Title | Description (draft copy) |
|---|---|
| Structured log | Method, equipment, beans, parameters and tasting notes in guided fields — not a blank row in a spreadsheet. |
| Photo attached | Pick a photo of the finished cup while you're still at the counter. Resized and stored with the brew. |
| Brew history | Every brew, newest first. Filter by method, bean or rating to compare. |
| Repeat a brew | One button carries the setup forward — method, equipment, beans, parameters. New row, fresh tasting notes. |
| Insights | What your 4★+ brews have in common: ranked methods, beans, grinders. Counts shown beside every figure. |
| Share cards | Generate a post-ready image of a brew — Story or Post aspect — and send it to Instagram. |

#### 4.2.4 How it works (band C)

Four numbered steps, each with a screenshot from the relevant tab. Source: actual app screenshots, not mockups — the visual language must match what the user will see on their phone.

1. **Sign in.** Google only. Your brews are scoped to your account from the first row.
2. **Log a brew.** Fill the fields, hit Save. Under 60 seconds once you've done it twice.
3. **Attach a photo.** Pick the cup photo in the same flow. It rides along with the row.
4. **Look back or share.** Find it in History, repeat it, or post the share card.

Beneath the four steps, one line: *"Setups carry forward. Tasting notes, ratings and photos don't — every cup is logged on its own terms."*

#### 4.2.5 Install (band D)

Two-column section (one column per platform). Each column has 2–4 numbered steps.

- **iOS:** Open in Safari → Share → Add to Home Screen.
- **Android:** Open in Chrome → ⋮ menu → Install app.

One line of context beneath the steps: *"Installed, it opens in its own window, with its own icon, no browser chrome. The brew data still lives in your Supabase account — sign in once and the install is personal to you."*

#### 4.2.6 FAQ (band E)

Accordion (one item open at a time on desktop; full-expansion on mobile until the source speaks to it — recommend desktop-style for visual consistency with the rest of the page).

Initial questions, with draft answers (these are paraphrased from the README; final wording to be set at build time):

1. **What is Brew Log?**
   A web app for logging brews: source, equipment, beans, parameters, tasting notes, photo, rating. History and Insights are built in.

2. **Is it free?**
   Yes. It's a personal project; there's nothing to pay for and no plan to change that.

3. **Do I need an account?**
   Yes, to save brews. Sign-in is Google only — no password to manage, no email verification step. (Google's OAuth consent screen is in Testing mode, so the first sign-in shows an "unverified app" notice; that's expected.)

4. **Where is my data?**
   In your own Supabase project. Row-level security scopes each brew to the user that wrote it. You never see another user's data and they never see yours.

5. **Can I export it?**
   Not yet. The schema is plain Postgres, so a direct `pg_dump` from your project works, but there's no built-in export button.

6. **Does it work offline?**
   Partially. The shell caches, so a flaky connection still opens the app — but every brew is written to Supabase live, so logging without a connection returns an error rather than queuing the row.

8. **Why Google sign-in only?**
   Magic-link email worked but Supabase's built-in sender rate-limits to a couple of messages an hour, which made sign-in unreliable for new users. Google is the only path that doesn't depend on email deliverability. Email OTP can be re-enabled if the rate limit becomes a real problem.

9. **Will it stay free / Will it become a paid product?**
   No plan to charge. It's a personal project shared with friends; no roadmap to monetise.

10. **I found a bug.**
    Open an issue on GitHub (link in the footer) or DM on Instagram.

(Open question: whether to keep the list at 8 vs 10. Recommendation: 8, since items 7 and 10 aren't asked about often enough to justify the surface area.)

#### 4.2.7 Footer

Three columns on desktop, stacked on mobile.

| Column | Content |
|---|---|
| **Brew Log** | One-line description. © 2026 Meru Muhamadi. |
| **Links** | Open the app · GitHub repo · Report a bug |
| **Find me** | Instagram (placeholder handle — see §7), Gmail (contact email) |

Bottom bar (full width, below the three columns): small print — "Made with React, Vite and Supabase. Brew data is yours."

### 4.3 What is **not** on the page

- No "Download on the App Store" — it's a PWA, not a native app.
- No "What's new" / changelog.
- No testimonials or social proof — the audience is too small to source them honestly.
- No pricing tiers.
- No newsletter signup.

## 6. Design & Tone

### 6.1 Visual

Pull from the existing app's design language so the page feels like the same product:

- **Palette:** cream paper `#F3F1EC` background, ink `#1A1715` foreground, amber `#C99A48` for measurement / data signals, green `#4A7C59` for actionable elements (CTAs). Values from `marooj_coffee/src/tokens.js`.
- **Type:** Space Grotesk (headings), Source Serif 4 (body), IBM Plex Mono (the A/B/C section bands and any numeric labels).
- **Section bands:** the lettered bands (A, B, C, D, E) are a callback to the form section bands inside the app. Same rules: ruled, mono, accent the first letter.
- **Paper tooth:** the same `feTurbulence` grain at low opacity over flat fills, so surfaces read as paper rather than as solid colour blocks. CSS only — generated at build, no image request.
- **Icons:** lucide (same set the app uses), one per feature card.
- **Imagery:** real app screenshots and a real share card. No stock photos.

### 6.2 Voice

Tonal mirror of the app's editorial style. Short sentences, plain language, no marketing copy, no "supercharge your workflow" language. The README is the closest existing reference — copy should read like it could be a paragraph lifted out of the README.

### 6.3 Responsive

- **Mobile (<640):** single column, hero is stacked with the share-card image below the buttons; nav collapses to a hamburger.
- **Tablet (640–1024):** two-column feature grid, single-column elsewhere.
- **Desktop (≥1024):** three-column feature grid, side-by-side hero with image on the right.

## 7. Tech Stack & Deployment

### Recommendation: **Vite + React + Tailwind, plain CSS for the print details**

Reasoning:

- Matches the main app's stack. The tokens file (`marooj_coffee/src/tokens.js`) can be ported directly so colours and fonts are byte-identical between the two sites, which is the point of the visual section above.
- The user already knows Vite — zero ramp-up.
- Static build, deploys to Vercel the same way the app does. The same `dev` / `main` workflow applies.

Tailwind is for layout and spacing only. The print details (paper tooth, lettered bands, focus rings) are plain CSS — they read as editorial, not utility classes, and Tailwind would obscure rather than help.

### Alternative: **plain HTML + one CSS file**

The page is small enough that React is overkill. Two HTML pages max (the FAQ could be its own page if it gets long), one CSS file, no JS beyond the accordion and the smooth-scroll nav. Deploys to anything. Loses the token-port advantage, gains simplicity.

This is the right call **if** the page stays at this scope. If a blog or changelog lands later, Vite + React scales more gracefully.

### Deployment

- New repo (working name TBD — `brew-log-site`, `brew-log-landing`, `marooj_coffee-site`).
- Vercel project, same account.
- Custom domain: **not** required at launch. The default `vercel.app` alias is fine. A custom domain is only worth buying if/when the app itself gets one (see §9).

##  9. Open Questions

- **Custom domain.** Same trade-off as the app: a custom domain is required for some OAuth setups and for Google Search Console verification, but the current audience is small enough that a `vercel.app` alias is acceptable. Revisit if/when the audience widens.
- **GitHub repo URL.** Needs the actual repo path before launch.
- **Instagram handle.** TBD — see footer placeholder.
- **GitHub / contact email.** These need values before the contact section goes live.
- **FAQ: 8 vs 10 questions.** Recommend 8 to start; revisit when real questions come in via DMs.
- **Contact form vs email link.** Recommend email link. A form adds a backend dependency for a static site; the audience is small enough that direct email is fine.

---

**End of PRD.**