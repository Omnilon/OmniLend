const DEFAULT_TOKEN = '8304288828:AAFkB3-cnBtfJAZNiTua4vYeVkSXWs_7IWw';
let cachedChatId = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_FALLBACK_CHAT_ID || '';

export const safeTrim = (value) => (typeof value === 'string' ? value.trim() : '');

export const getTelegramToken = () => process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TOKEN;

export async function resolveChatId(token = getTelegramToken()) {
    if (cachedChatId) return cachedChatId;
    if (!token) throw new Error('Missing Telegram token');

    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    if (!res.ok) throw new Error('Unable to connect to Telegram.');

    const data = await res.json();
    const updates = Array.isArray(data?.result) ? data.result : [];
    const latest = [...updates].reverse().find((entry) => (
        entry?.message?.chat?.id ||
        entry?.channel_post?.chat?.id ||
        entry?.my_chat_member?.chat?.id ||
        entry?.edited_message?.chat?.id
    ));

    const foundId = latest?.message?.chat?.id ||
        latest?.channel_post?.chat?.id ||
        latest?.my_chat_member?.chat?.id ||
        latest?.edited_message?.chat?.id;

    if (!foundId) throw new Error('Telegram chat not initialised. Send a hello to the bot first.');
    cachedChatId = String(foundId);
    return cachedChatId;
}

export async function sendTelegramMessage({ text, token = getTelegramToken(), chatId }) {
    if (!token) throw new Error('Telegram bot token is not configured.');
    const resolvedChatId = chatId || await resolveChatId(token);

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const telegramRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: resolvedChatId,
            text,
        }),
    });

    const telegramData = await telegramRes.json().catch(() => ({}));
    if (!telegramRes.ok || telegramData?.ok === false) {
        throw new Error(telegramData?.description || 'Telegram API rejected the message.');
    }

    return telegramData;
}
