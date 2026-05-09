export default function handler(_req, res) {
  res.status(410).json({
    error: "Legacy contact endpoint retired. Use /api/leads in the Next.js site app."
  });
}
