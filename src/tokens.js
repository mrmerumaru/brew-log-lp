// Design tokens ported from marooj_coffee/src/tokens.js — palette and type
// scale only. The app's content vocabularies (DRINKS, METHODS, etc.) don't
// apply to a landing page and aren't copied.

// amber (#C77D2E) fails WCAG AA as text almost everywhere: 2.91:1 on paper
// (fails even the 3:1 large-text minimum) and 3.14:1 on card (clears 3:1 only
// at large/bold sizes, still fails 4.5:1 for body text). Keep the exact app
// hex value for brand consistency, but amber text is only ever used:
//   - on `card`, at large/bold size (>=24px, or >=19px/600+ weight)
//   - never on `paper` as text
// Anywhere else, amber is icon fills / underlines / borders only, where
// contrast ratio minimums don't apply.
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

/**
 * Publish the palette as CSS custom properties so index.css can drive
 * hover/focus states without a second hardcoded copy of the hex values.
 * Called once from main.jsx before the first render.
 */
export function applyTokens(root = document.documentElement) {
  for (const [name, value] of Object.entries(TOKENS)) {
    root.style.setProperty(`--${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`, value);
  }
}

export const SANS = "'Space Grotesk', sans-serif";
export const MONO = "'IBM Plex Mono', monospace";
export const SERIF = "'Source Serif 4', serif";
