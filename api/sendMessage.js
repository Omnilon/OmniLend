import { safeTrim, getTelegramToken, resolveChatId, sendTelegramMessage } from './_telegram.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message, service, budget, asset, experience } = req.body || {};

    const nameValue = safeTrim(name);
    const emailValue = safeTrim(email);
    const messageValue = safeTrim(message);
    const serviceValue = safeTrim(service);
    const budgetValue = safeTrim(budget);
    const assetValue = safeTrim(asset);
    const experienceValue = safeTrim(experience).toLowerCase();

    if (!nameValue || !emailValue || !messageValue) {
        return res.status(400).json({ message: 'Name, email, and a project summary are required.' });
    }

    const telegramToken = getTelegramToken();
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

    const isSecurityExperience = experienceValue === 'security';
    const messagePrefix = isSecurityExperience
        ? 'ømnilon sec. — Secret Lifter Briefing'
        : 'ømnilon Int. — New Interiors Inquiry';

    const detailLines = [
        `Name: ${nameValue}`,
        `Email: ${emailValue}`,
    ];

    if (isSecurityExperience) {
        detailLines.push(`Primary location/URL: ${assetValue || 'n/a'}`);
        detailLines.push(`Engagement focus: ${serviceValue || 'n/a'}`);
        detailLines.push(`Portfolio scale: ${budgetValue || 'n/a'}`);
    } else {
        detailLines.push(`Service: ${serviceValue || 'n/a'}`);
        detailLines.push(`Budget: ${budgetValue || 'n/a'}`);
    }

    const summaryLabel = isSecurityExperience ? 'Intel:' : 'Project details:';

    const text = [
        messagePrefix,
        '',
        ...detailLines,
        '',
        summaryLabel,
        messageValue || 'n/a'
    ].join('\n');

    try {
        await sendTelegramMessage({ text, token: telegramToken, chatId });
        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Telegram send error:', error);
        res.status(500).json({ message: 'Failed to forward message to Telegram.' });
    }
}
