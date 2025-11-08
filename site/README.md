# Ømnilon Brand Shell

An opt-in Next.js 14 microsite that applies the high-contrast Ømnilon shell to any part of the repo without touching the legacy static pages. The `/brand` route now showcases the interiors studio, Secret Lifter security engagements, and the Ømnilon Ink apprenticeship inside one experience.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local preview (opens `http://localhost:3000/brand`):
   ```bash
   npm run brand:preview
   ```
3. Lint and format:
   ```bash
   npm run lint
   npm run format
   ```
4. Run snapshot tests:
   ```bash
   npm test
   ```

## Project Structure

- `src/app` — Next.js App Router entry. `/brand`, `/about`, `/pricing`, `/contact` are powered by MDX content.
- `src/components` — Brand system building blocks (HUD brackets, Hero gate, Secret Lifter demo, etc.).
- `src/lib` — Shared utilities including the MDX loader.
- `public/` — Static assets including noise overlay and HUD demo image.
- `scripts/brand-codemod.mjs` — Stub to scan for brand-token replacements; extend to map legacy colors.

## Feature Flags & Persistence

- Local storage keys:
  - `omnilend:preloader-seen` — skips the Ømnilon calibration screen after the first visit.
  - `omnilend:hero-entered` — bypasses the hero gate once “Enter Ømnilon” is triggered.
  - `omnilend:sound-enabled` — remembers the sound toggle state.

## Accessibility & Motion

- Motion automatically respects `prefers-reduced-motion` (Lenis smooth scrolling is skipped and animations fall back gracefully).
- Contrast ratios stay ≥ 4.5:1 with bright accents reserved for 20% of the UI.
- Keyboard focus rings use accent hues for clear affordances.

## Next Steps

- Pipe `BrandShell` (from `BrandProviders`) into future product screens behind a feature flag.
- Expand `brand-codemod` to replace legacy hex colors with CSS variables.
- Drop in production imagery/audio as interiors, Secret Lifter, and ink assets ship.
