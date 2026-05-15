import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { readPayrollDocument } from "@/lib/admin/payroll";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { documentId: string } }) {
  const session = getAdminSession();

  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const document = await readPayrollDocument(params.documentId);

    if (!document) {
      return NextResponse.json({ ok: false, error: "Statement not found." }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(document.bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${document.filename}"`,
        "Cache-Control": "private, no-store, max-age=0"
      }
    });
  } catch (error) {
    console.error("[payroll-document-error]", error);

    return NextResponse.json(
      { ok: false, error: "Payroll document storage is not available." },
      { status: 500 }
    );
  }
}
