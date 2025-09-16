const DEFAULT_TOKEN = '8304288828:AAFkB3-cnBtfJAZNiTua4vYeVkSXWs_7IWw';
let cachedChatId = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_FALLBACK_CHAT_ID || '';

async function resolveChatId(token) {
    if (cachedChatId) return cachedChatId;
    if (!token) throw new Error('Missing Telegram token');

    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    if (!res.ok) throw new Error('Unable to connect to Telegram.');

    const data = await res.json();
    const updates = Array.isArray(data?.result) ? data.result : [];
    const latest = [...updates].reverse().find((entry) => {
        return entry?.message?.chat?.id || entry?.channel_post?.chat?.id || entry?.my_chat_member?.chat?.id || entry?.edited_message?.chat?.id;
    });
    const foundId = latest?.message?.chat?.id || latest?.channel_post?.chat?.id || latest?.my_chat_member?.chat?.id || latest?.edited_message?.chat?.id;
    if (!foundId) throw new Error('Telegram chat not initialised. Send a hello to the bot first.');
    cachedChatId = String(foundId);
    return cachedChatId;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message, service, budget } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and a project summary are required.' });
    }

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TOKEN;
    if (!telegramToken) {
        return res.status(500).json({ message: 'Telegram bot token is not configured.' });
    }

    let chatId;
    try {
        chatId = await resolveChatId(telegramToken);
    } catch (err) {
        console.error('Telegram chat resolution error:', err);
        return res.status(500).json({ message: err.message || 'Unable to resolve Telegram chat.' });
    }

    const text = [
        'Ømnilon Interiors — New Inquiry',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service || 'n/a'}`,
        `Budget: ${budget || 'n/a'}`,
        '',
        message
    ].join('\n');

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    try {
        const telegramRes = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text,
            }),
        });

        const telegramData = await telegramRes.json().catch(() => ({}));
        if (!telegramRes.ok || telegramData?.ok === false) {
            throw new Error(telegramData?.description || 'Telegram API rejected the message.');
        }

        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Telegram send error:', error);
        res.status(500).json({ message: 'Failed to forward message to Telegram.' });
    }
}
