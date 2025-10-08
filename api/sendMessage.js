import { safeTrim, getTelegramToken, resolveChatId, sendTelegramMessage } from './_telegram.js';
import { verifyCaptcha } from './_captcha.js';

const buildInteriorsPayload = ({
    nameValue,
    emailValue,
    serviceValue,
    budgetValue,
    messageValue,
}) => {
    if (!messageValue) {
        throw new Error('Please include a project summary.');
    }

    const text = [
        'ømnilon Int. — New Interiors Inquiry',
        '',
        `Name: ${nameValue}`,
        `Email: ${emailValue}`,
        `Service: ${serviceValue || 'n/a'}`,
        `Budget: ${budgetValue || 'n/a'}`,
        '',
        'Project details:',
        messageValue,
    ].join('\n');

    return text;
};

const buildSecurityPayload = ({
    nameValue,
    emailValue,
    assetValue,
    serviceValue,
    budgetValue,
    messageValue,
}) => {
    if (!messageValue) {
        throw new Error('Please include briefing intel for the assessment.');
    }

    const text = [
        'ømnilon sec. — Secret Lifter Briefing',
        '',
        `Name: ${nameValue}`,
        `Email: ${emailValue}`,
        `Primary location/URL: ${assetValue || 'n/a'}`,
        `Engagement focus: ${serviceValue || 'n/a'}`,
        `Portfolio scale: ${budgetValue || 'n/a'}`,
        '',
        'Intel:',
        messageValue,
    ].join('\n');

    return text;
};

const buildInkPayload = ({
    nameValue,
    emailValue,
    phoneValue,
    placementValue,
    sizeValue,
    ideaValue,
    availabilityValue,
    stickerValue,
    depositValue,
    waiverValue,
}) => {
    if (!ideaValue) {
        throw new Error('Tell me about the artwork or flash you have in mind.');
    }

    if (depositValue !== 'agree') {
        throw new Error('Please confirm the deposit requirement before submitting.');
    }

    if (waiverValue !== 'agree') {
        throw new Error('Please confirm you have read and agree to the waiver.');
    }

    const text = [
        'ømnilon ink — Booking request',
        '',
        `Name: ${nameValue}`,
        `Email: ${emailValue}`,
        `Phone: ${phoneValue || 'n/a'}`,
        `Preferred placement: ${placementValue || 'n/a'}`,
        `Estimated size: ${sizeValue || 'n/a'}`,
        '',
        'Artwork concept:',
        ideaValue,
        '',
        'Preferred availability:',
        availabilityValue || 'n/a',
        '',
        `Sticker discount: ${stickerValue === 'yes' ? 'Bringing sticker' : 'No sticker'}`,
        'Deposit acknowledgement: confirmed',
        'Waiver consent: confirmed',
    ].join('\n');

    return text;
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {
        name,
        email,
        message,
        service,
        budget,
        asset,
        experience,
        phone,
        placement,
        size,
        idea,
        availability,
        sticker,
        deposit,
        waiver,
        captchaAnswer,
        captchaToken,
    } = req.body || {};

    const nameValue = safeTrim(name);
    const emailValue = safeTrim(email);
    const messageValue = safeTrim(message);
    const serviceValue = safeTrim(service);
    const budgetValue = safeTrim(budget);
    const assetValue = safeTrim(asset);
    const experienceValue = safeTrim(experience).toLowerCase();
    const phoneValue = safeTrim(phone);
    const placementValue = safeTrim(placement);
    const sizeValue = safeTrim(size);
    const ideaValue = safeTrim(idea);
    const availabilityValue = safeTrim(availability);
    const stickerValue = safeTrim(sticker).toLowerCase();
    const depositValue = safeTrim(deposit).toLowerCase();
    const waiverValue = safeTrim(waiver).toLowerCase();
    const captchaValidation = verifyCaptcha(captchaToken, captchaAnswer);

    if (!captchaValidation.valid) {
        return res.status(400).json({ message: captchaValidation.message });
    }

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

    let text;
    try {
        switch (experienceValue) {
            case 'security':
                text = buildSecurityPayload({
                    nameValue,
                    emailValue,
                    assetValue,
                    serviceValue,
                    budgetValue,
                    messageValue,
                });
                break;
            case 'ink':
                text = buildInkPayload({
                    nameValue,
                    emailValue,
                    phoneValue,
                    placementValue,
                    sizeValue,
                    ideaValue,
                    availabilityValue,
                    stickerValue,
                    depositValue,
                    waiverValue,
                });
                break;
            case 'interiors':
            case '':
            case null:
            default:
                text = buildInteriorsPayload({
                    nameValue,
                    emailValue,
                    serviceValue,
                    budgetValue,
                    messageValue,
                });
                break;
        }
    } catch (validationError) {
        return res.status(400).json({ message: validationError.message || 'Invalid submission.' });
    }

    try {
        await sendTelegramMessage({ text, token: telegramToken, chatId });
        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Telegram send error:', error);
        res.status(500).json({ message: 'Failed to forward message to Telegram.' });
    }
}
