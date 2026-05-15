import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCookieOptions,
  validateAdminCredentials
} from "@/lib/admin/session";

export const runtime = "nodejs";

const AdminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = AdminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid login request." }, { status: 400 });
    }

    const valid = validateAdminCredentials(parsed.data.email, parsed.data.password);

    if (!valid) {
      return NextResponse.json({ ok: false, error: "Email or password is incorrect." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), getAdminCookieOptions());

    return response;
  } catch (error) {
    console.error("[admin-login-error]", error);

    return NextResponse.json(
      { ok: false, error: "Admin login is not configured yet." },
      { status: 500 }
    );
  }
}
