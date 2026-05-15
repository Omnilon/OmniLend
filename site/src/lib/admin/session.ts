import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
};

type SessionPayload = AdminUser & {
  iat: number;
  exp: number;
};

export const ADMIN_COOKIE_NAME = "omnilend_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8;
const FALLBACK_ADMIN_EMAIL = "Omnilend.co@gmail.com";
const FALLBACK_PASSWORD_SALT = "omnilend-admin-v1-isaac-lelonek";
const FALLBACK_PASSWORD_SCRYPT =
  "f36f7ca2ddc9894068e778d038face7ed919498c17b1cdb6425d3abd1db72235";
const FALLBACK_SESSION_SECRET =
  "df637fa038efe3a24b2c428b76af5481d9a73f0f30fbc8c5a9ba84955509428c";

export const adminProfile: AdminUser = {
  id: "isaac-lelonek",
  name: "Isaac Lelonek",
  email: FALLBACK_ADMIN_EMAIL,
  role: "Employee Administrator",
  initials: "IL"
};

function getAdminEmail() {
  return process.env.OMNILEND_ADMIN_EMAIL;
}

function getAdminPassword() {
  return process.env.OMNILEND_ADMIN_PASSWORD;
}

function getSessionSecret() {
  const configuredSecret = process.env.OMNILEND_ADMIN_SESSION_SECRET;
  const password = getAdminPassword();

  if (configuredSecret) {
    return configuredSecret;
  }

  if (password) {
    return crypto.createHash("sha256").update(`omnilend-admin:${password}`).digest("hex");
  }

  return FALLBACK_SESSION_SECRET;
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
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("Missing OMNILEND_ADMIN_SESSION_SECRET or OMNILEND_ADMIN_PASSWORD");
  }

  return crypto.createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export function validateAdminCredentials(email: string, password: string) {
  const configuredEmail = getAdminEmail();
  const configuredPassword = getAdminPassword();

  if (configuredEmail && configuredPassword) {
    return (
      safeCompare(email.trim().toLowerCase(), configuredEmail.trim().toLowerCase()) &&
      safeCompare(password, configuredPassword)
    );
  }

  const submittedHash = crypto.scryptSync(password, FALLBACK_PASSWORD_SALT, 32).toString("hex");

  return (
    safeCompare(email.trim().toLowerCase(), FALLBACK_ADMIN_EMAIL.toLowerCase()) &&
    safeCompare(submittedHash, FALLBACK_PASSWORD_SCRYPT)
  );
}

export function createAdminSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    ...adminProfile,
    email: getAdminEmail() ?? adminProfile.email,
    iat: now,
    exp: now + SESSION_TTL_SECONDS
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString()) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (!payload.exp || payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getAdminSession() {
  return verifyAdminSessionToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
}

export function requireAdminSession() {
  const session = getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  };
}
