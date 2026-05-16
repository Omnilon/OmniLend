import { NextResponse } from "next/server";
import { createLeadCaptchaChallenge } from "@/lib/leads/captcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    captcha: createLeadCaptchaChallenge()
  });
}
