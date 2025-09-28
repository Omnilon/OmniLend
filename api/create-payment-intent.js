export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, serviceName, name, email } = req.body || {};
  const numericAmount = Number(amount);

  if (!numericAmount || Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: 'A valid amount is required.' });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ message: 'Stripe secret key missing. Set STRIPE_SECRET_KEY in Vercel.' });
  }

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(secret, { apiVersion: '2022-11-15' });

    const metadata = {
      source: 'quick-pay-portal',
    };

    if (serviceName) metadata.service = serviceName;
    if (name) metadata.cardholder = name;

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(numericAmount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
      metadata,
      receipt_email: email || undefined,
      description: `${serviceName || 'Design Project'} Payment`,
      statement_descriptor: 'Omnilon Interiors',
    });

    return res.status(200).json({ clientSecret: intent.client_secret });
  } catch (error) {
    console.error('Stripe error creating PaymentIntent', error);
    const message = error?.message || 'Stripe error creating PaymentIntent.';
    return res.status(500).json({ message });
  }
}
