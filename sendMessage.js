export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text = `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Message: ${message}
`;

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    try {
        await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
            }),
        });

        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
}