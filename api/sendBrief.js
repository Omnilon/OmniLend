import { safeTrim, getTelegramToken, resolveChatId, sendTelegramMessage } from './_telegram.js';

const buildLine = (label, value) => {
    const trimmed = safeTrim(value);
    return trimmed ? `${label}: ${trimmed}` : '';
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {
        clientName,
        clientEmail,
        clientPhone,
        projectLocation,
        serviceType,
        targetDate,
        rooms,
        vision,
        function: functionNeeds,
        keepList,
        colorPalette,
        materials,
        brands,
        avoid,
        budget,
        decisionMakers,
        meetingStyle,
        vendors,
        inspirationLinks,
        fileShare,
        extras,
        summary,
        photoNames = [],
    } = req.body || {};

    const nameValue = safeTrim(clientName);
    const emailValue = safeTrim(clientEmail);

    if (!nameValue || !emailValue) {
        return res.status(400).json({ message: 'Name and email are required.' });
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

    const formattedSummary = safeTrim(summary);
    const photoLabel = Array.isArray(photoNames) && photoNames.length
        ? `Selected photo placeholders: ${photoNames.join(', ')}`
        : '';

    const textSections = [
        'ømnilon Int. — Project Brief Received',
        '',
        buildLine('Client', clientName),
        buildLine('Email', clientEmail),
        buildLine('Phone', clientPhone),
        buildLine('Location', projectLocation),
        buildLine('Primary service', serviceType),
        buildLine('Target date', targetDate),
        '',
        '--- Project scope ---',
        buildLine('Rooms / areas', rooms),
        buildLine('Vision', vision),
        buildLine('Daily-life musts', functionNeeds),
        buildLine('Pieces to keep / avoid', keepList),
        '',
        '--- Style notes ---',
        buildLine('Color palette', colorPalette),
        buildLine('Materials & finishes', materials),
        buildLine('Preferred brands', brands),
        buildLine('Hard no’s', avoid),
        '',
        '--- Logistics ---',
        buildLine('Investment range', budget),
        buildLine('Decision makers', decisionMakers),
        buildLine('Meeting style', meetingStyle),
        buildLine('Vendors already engaged', vendors),
        '',
        '--- Inspiration & files ---',
        buildLine('Inspiration links', inspirationLinks),
        buildLine('File share link', fileShare),
        photoLabel,
        '',
        '--- Additional notes ---',
        buildLine('Extras', extras),
    ].filter(Boolean);

    if (formattedSummary) {
        textSections.push('', '--- Formatted summary ---', formattedSummary);
    }

    try {
        await sendTelegramMessage({ text: textSections.join('\n'), token: telegramToken, chatId });
        res.status(200).json({ message: 'Your brief has been forwarded to the studio.' });
    } catch (error) {
        console.error('Telegram send error:', error);
        res.status(500).json({ message: 'Failed to forward project brief to Telegram.' });
    }
}
