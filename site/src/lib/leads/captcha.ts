import "server-only";

import crypto from "crypto";

type CaptchaPayload = {
  nonce: string;
  expiresAt: number;
  answerHash: string;
};

const CAPTCHA_TTL_MS = 10 * 60 * 1000;
const FALLBACK_CAPTCHA_SECRET = "omnilend-lead-captcha-v1";

function getCaptchaSecret() {
  return (
    process.env.LEAD_CAPTCHA_SECRET ??
    process.env.OMNILEND_ADMIN_SESSION_SECRET ??
    FALLBACK_CAPTCHA_SECRET
  );
}

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function signPayload(encodedPayload: string) {
  return crypto.createHmac("sha256", getCaptchaSecret()).update(encodedPayload).digest("base64url");
}

function hashAnswer({
  nonce,
  expiresAt,
  answer
}: {
  nonce: string;
  expiresAt: number;
  answer: string;
}) {
  return crypto
    .createHash("sha256")
    .update(`${getCaptchaSecret()}:${nonce}:${expiresAt}:${answer.trim().toLowerCase()}`)
    .digest("hex");
}

export function createLeadCaptchaChallenge() {
  const left = crypto.randomInt(4, 13);
  const right = crypto.randomInt(2, 10);
  const useSubtraction = crypto.randomInt(0, 2) === 1;
  const answer = String(useSubtraction ? left + right - right : left + right);
  const question = useSubtraction ? `${left + right} - ${right}` : `${left} + ${right}`;
  const expiresAt = Date.now() + CAPTCHA_TTL_MS;
  const nonce = crypto.randomUUID();
  const payload: CaptchaPayload = {
    nonce,
    expiresAt,
    answerHash: hashAnswer({ nonce, expiresAt, answer })
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  return {
    question,
    token: `${encodedPayload}.${signPayload(encodedPayload)}`,
    expiresAt
  };
}

export function verifyLeadCaptcha({
  token,
  answer
}: {
  token: string;
  answer: string;
}) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature || !safeCompare(signature, signPayload(encodedPayload))) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as CaptchaPayload;

    if (!payload.nonce || !payload.expiresAt || !payload.answerHash || payload.expiresAt < Date.now()) {
      return false;
    }

    return safeCompare(
      payload.answerHash,
      hashAnswer({ nonce: payload.nonce, expiresAt: payload.expiresAt, answer })
    );
  } catch {
    return false;
  }
}
