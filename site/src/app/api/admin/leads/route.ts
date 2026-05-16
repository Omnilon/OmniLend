import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { listLeads } from "@/lib/aws/dynamo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = getAdminSession();

  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const leads = await listLeads(100);

    return NextResponse.json({ ok: true, leads });
  } catch (error) {
    console.error("[admin-leads-error]", error);

    return NextResponse.json(
      { ok: false, error: "Lead inbox is not available." },
      { status: 500 }
    );
  }
}
