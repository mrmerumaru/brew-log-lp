// Design tokens for the Coffea reskin — palette referenced from the Figma
// community template "Coffea" by Codexse (CC BY 4.0), adapted to Brew Log's
// app screenshots. The espresso/cream/caramel scheme replaces the app's
// paper/green one for the landing page only.

// Caramel (#C87832) fails WCAG AA as text almost everywhere (~2.2:1 on
// espresso, ~2.5:1 on cream). Keep the exact hex for brand warmth, but caramel
// is only ever used for icon fills / underlines / borders / decorative accents
// — never as body text and never as a button background carrying text.
// Buttons use espresso (dark) or ivory (light) fills with opposite text.
// For readable warm text on dark, use accentLight.
export const TOKENS = {
  paper: "#F0EBDD",        // warm cream — page background
  card: "#FBF9F3",         // ivory — cards and surfaces lifted off the cream
  ink: "#1C1C1C",          // charcoal — body text and headings
  inkFaint: "#4A3527",     // coffee brown — muted / secondary text
  rule: "#D3C6A7",         // sand — borders and rules
  accent: "#C87832",       // caramel — icons/borders/accents only (see note)
  accentLight: "#E0A15C",  // gold — readable warm text on dark backgrounds
  espresso: "#2B1F1A",     // deep espresso — dark sections (hero, footer, CTA)
  espressoSoft: "#E7DFCC", // sand tint — active segment of the language pill
  espressoDeep: "#191310", // near-black espresso — gradient ends / footer base
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

export const SANS = "'Poppins', sans-serif";
export const SERIF = "'Playfair Display', serif";
export const MONO = "'IBM Plex Mono', monospace";
