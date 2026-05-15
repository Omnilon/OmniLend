import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin/session";
import { savePayrollDocumentToStore } from "@/lib/admin/payroll";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PayrollUploadSchema = z.object({
  filename: z.string().min(1).max(180),
  bytesBase64: z.string().min(1)
});

export async function POST(request: Request, { params }: { params: { documentId: string } }) {
  const session = getAdminSession();

  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = PayrollUploadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payroll upload." }, { status: 400 });
    }

    const bytes = Buffer.from(parsed.data.bytesBase64, "base64");

    if (!bytes.subarray(0, 4).equals(Buffer.from("%PDF"))) {
      return NextResponse.json({ ok: false, error: "Payroll upload must be a PDF." }, { status: 400 });
    }

    await savePayrollDocumentToStore({
      documentId: params.documentId,
      filename: parsed.data.filename,
      bytes
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[payroll-upload-error]", error);

    return NextResponse.json(
      { ok: false, error: "Payroll document upload failed." },
      { status: 500 }
    );
  }
}
