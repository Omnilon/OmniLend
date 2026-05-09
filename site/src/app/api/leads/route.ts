import crypto from "crypto";
import { NextResponse } from "next/server";
import { saveLead } from "@/lib/aws/dynamo";
import { sendLeadEmail } from "@/lib/aws/ses";
import { LeadSchema, type LeadRecord } from "@/lib/leads/schema";

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
    const parsed = LeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead submission." },
        { status: 400 }
      );
    }

    const lead: LeadRecord = {
      leadId: crypto.randomUUID(),
      ...parsed.data,
      status: "new",
      createdAt: new Date().toISOString(),
      ipHash: hashIp(request),
      userAgent: request.headers.get("user-agent") ?? undefined
    };

    await saveLead(lead);
    await sendLeadEmail(lead);

    return NextResponse.json({ ok: true, leadId: lead.leadId });
  } catch (error) {
    console.error("[lead-submit-error]", error);

    return NextResponse.json(
      { ok: false, error: "Lead submission failed." },
      { status: 500 }
    );
  }
}
