# SITE_OWNER Brand Shell

An opt-in Next.js 14 microsite that applies the Ledger-inspired, high-contrast brand skin to the existing repository without touching existing static pages. The `/brand` route showcases guidelines, type, color, HUD interactions, voice, and supporting experience shell components.

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

- `src/app` — Next.js App Router entry (`/brand` landing page lives in `page.tsx`).
- `src/components` — Brand system building blocks (HUD brackets, typography specimens, preloader, smooth scroll, etc.).
- `src/lib` — Shared utilities (`audio` tone helper).
- `public/` — Static assets including noise overlay and HUD demo image.
- `scripts/brand-codemod.mjs` — Stub to scan for brand-token replacements; extend to map legacy colors.

## Feature Flags & Persistence

- Local storage keys:
  - `omnilend:preloader-seen` — skips the preloader after the first visit.
  - `omnilend:hero-entered` — bypasses the hero gate once “Enter Experience” is triggered.
  - `omnilend:sound-enabled` — remembers the sound toggle state.

## Accessibility & Motion

- Motion automatically respects `prefers-reduced-motion` (Lenis smooth scrolling is skipped and animations fall back gracefully).
- Contrast ratios stay ≥ 4.5:1 with bright accents reserved for 20% of the UI.
- Keyboard focus rings use accent hues for clear affordances.

## Next Steps

- Wire `BrandShell` (from `BrandProviders`) into product screens behind a feature flag.
- Expand `brand-codemod` to replace legacy hex colors with CSS variables.
- Swap placeholder assets with production imagery/audio once available.
