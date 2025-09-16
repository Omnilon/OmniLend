export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  const { name, amount, email, metadata = {} } = req.body || {};
  if (!name || !amount || isNaN(amount)) return res.status(400).json({ message: 'Name and amount are required.' });

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return res.status(500).json({ message: 'Stripe secret key missing. Set STRIPE_SECRET_KEY in Vercel.' });

  // Lazy import to avoid bundling if not used
  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(secret, { apiVersion: '2022-11-15' });

  const origin = req.headers.origin || `https://${req.headers.host}`;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1,
      }],
      allow_promotion_codes: true,
      success_url: `${origin}/Payment.html?status=success`,
      cancel_url: `${origin}/Payment.html?status=cancel`,
      metadata,
    });

    // Prefer returning session id for redirectToCheckout
    return res.status(200).json({ id: session.id, url: session.url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Stripe error creating session.' });
  }
}

