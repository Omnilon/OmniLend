# Ømnilon Interiors

This repository contains the website for Ømnilon Interiors, an Atlanta‑based interior design studio offering e‑design, residential refresh, staging, and small commercial projects. The site is a lightweight static build (HTML/CSS/JS) with a tiny serverless function for forwarding contact form submissions to Telegram.

## Run Locally

1. Clone the repository and navigate to the project directory.
2. Serve the static files using any HTTP server, for example:

```
npx serve .
# or
python3 -m http.server
```

Open the displayed URL in your browser to access the site.

## Environment Variables

The contact form posts to `/api/sendMessage`, which relays each submission to Telegram. By default the project is configured with the Ømnilon bot token that was provided, but you can override it with your own credentials by setting the following variables:

- `TELEGRAM_BOT_TOKEN` — your Telegram bot token (defaults to the bundled Ømnilon token)
- `TELEGRAM_CHAT_ID` — the chat ID that should receive the messages (optional if you have already started a chat with the bot; the handler will resolve the latest chat automatically)

Set these variables in your hosting environment (or in a `.env` file if supported) so `api/sendMessage.js` can send messages to your Telegram account without relying on the auto-discovery fallback.

## Deployment

The site is static and works well on Vercel. Push to `main` to trigger a new deployment if connected to Vercel.

