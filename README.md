# OmniLend.pro

This repository contains the static website for **OMNILend.pro**. It is written entirely with vanilla HTML, CSS and JavaScript and includes a small API function for forwarding contact form submissions to Telegram.

## Running Locally

1. Clone the repository and navigate to the project directory.
2. Serve the static files using any HTTP server. For example:

```bash
# Using the Node.js `serve` package
npx serve .

# Or using Python
python3 -m http.server
```

Open the displayed URL in your browser to access the site.

## Environment Variables

The contact form posts to `/api/sendMessage`, which relies on two environment variables:

- `TELEGRAM_BOT_TOKEN` – your Telegram bot token.
- `TELEGRAM_CHAT_ID` – the chat ID that should receive the messages.

Set these variables in your hosting environment (or in a `.env` file if supported) so `api/sendMessage.js` can send messages to your Telegram account.

## Hosting Updates

Because this is a static site, updates do not appear until you redeploy or otherwise replace the hosted files. After pushing changes, trigger a new deployment on your hosting provider (for example Netlify, Vercel or any static server) so the latest files are served.

