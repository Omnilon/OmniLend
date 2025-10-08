import { safeTrim } from './_telegram.js';

const MAX_AGE_MS = 5 * 60 * 1000;

const invalid = (message) => ({ valid: false, message });

export const verifyCaptcha = (token, answer) => {
    const trimmedAnswer = safeTrim(answer);
    const trimmedToken = safeTrim(token);

    if (!trimmedToken || !trimmedAnswer) {
        return invalid('Please solve the quick math check to continue.');
    }

    let decoded;
    try {
        decoded = Buffer.from(trimmedToken, 'base64').toString('utf8');
    } catch (error) {
        return invalid('Captcha verification failed. Refresh and try again.');
    }

    const [firstRaw, secondRaw, issuedRaw] = decoded.split(':');
    const first = Number.parseInt(firstRaw, 10);
    const second = Number.parseInt(secondRaw, 10);
    const issuedAt = Number.parseInt(issuedRaw, 10);

    if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(issuedAt)) {
        return invalid('Captcha verification failed. Refresh and try again.');
    }

    if (issuedAt + MAX_AGE_MS < Date.now()) {
        return invalid('Captcha expired. Solve the new question and submit again.');
    }

    const expected = first + second;
    const provided = Number.parseInt(trimmedAnswer, 10);

    if (!Number.isFinite(provided)) {
        return invalid('Captcha answer must be a number.');
    }

    if (provided !== expected) {
        return invalid('Incorrect captcha answer. Try the new question.');
    }

    return { valid: true };
};
