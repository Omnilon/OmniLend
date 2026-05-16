import crypto from "crypto";
import { NextResponse } from "next/server";
import { saveLead } from "@/lib/aws/dynamo";
import { sendLeadEmail } from "@/lib/aws/ses";
import { verifyLeadCaptcha } from "@/lib/leads/captcha";
import { LeadSchema, LeadSubmissionSchema, type LeadRecord } from "@/lib/leads/schema";

export const runtime = "nodejs";

function hashIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const ip = forwardedFor || realIp;

  if (!ip) {
    return undefined;
  }

  const salt = process.env.LEAD_IP_HASH_SALT ?? "omnilend";

  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = LeadSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead submission." },
        { status: 400 }
      );
    }

    if (parsed.data.companyWebsite) {
      return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
    }

    if (
      !verifyLeadCaptcha({
        token: parsed.data.captchaToken,
        answer: parsed.data.captchaAnswer
      })
    ) {
      return NextResponse.json(
        { ok: false, error: "Security check failed. Refresh the check and try again." },
        { status: 400 }
      );
    }

    const leadInput = LeadSchema.parse(parsed.data);
    const lead: LeadRecord = {
      leadId: crypto.randomUUID(),
      ...leadInput,
      status: "new",
      createdAt: new Date().toISOString(),
      ipHash: hashIp(request),
      userAgent: request.headers.get("user-agent") ?? undefined
    };

    await saveLead(lead);

    try {
      await sendLeadEmail(lead);
    } catch (emailError) {
      console.error("[lead-email-error]", emailError);
    }

    return NextResponse.json({ ok: true, leadId: lead.leadId });
  } catch (error) {
    console.error("[lead-submit-error]", error);

    return NextResponse.json(
      { ok: false, error: "Lead submission failed." },
      { status: 500 }
    );
  }
}
