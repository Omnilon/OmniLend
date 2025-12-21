# OmniLend Experience Site

Immersive, single-page marketing experience for OmniLend built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lenis.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Lint and format:
   ```bash
   npm run lint
   npm run format
   ```

## Edit Content

All copy and structure live in `content/omnilend.ts`:
- Navigation labels
- Section titles and subtitles
- Services, process, proof, work, trust, FAQ, and contact copy

## Theme & Styling

Edit theme tokens in `src/app/globals.css`:
- `--bg`, `--panel`, `--text`, `--muted`, `--accent`, `--accent2`, `--border`
- HUD and background atmospherics live in the same file

## Assets

Place imagery and abstract assets in `public/assets/` and load them with `next/image`.
Current placeholders:
- `public/assets/hero-orb.svg`
- `public/assets/mesh-1.svg`
- `public/assets/mesh-2.svg`

## Gateway + Sound

Local storage keys:
- `hasEntered` — controls the gateway overlay
- `soundEnabled` — remembers the HUD sound toggle

## Contact Form + Telegram

Set the following in `.env.local` to enable Telegram delivery:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_THREAD_ID` (optional, for forum topics)

## Routes

- `/` immersive experience
- `/services`, `/process`, `/work`, `/about`, `/contact` SEO-friendly pages

## Notes

- Smooth scrolling respects `prefers-reduced-motion`.
- Heavy visual modules are kept lightweight and lazy-friendly.
