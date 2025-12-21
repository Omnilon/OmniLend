import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  interest: z.string().optional().nullable(),
  message: z.string().min(8),
  source: z.string().optional().nullable()
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram integration is not configured." },
      { status: 500 }
    );
  }

  const data = parsed.data;
  const textLines = [
    "New OmniLend Inquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    data.interest ? `Service: ${data.interest}` : null,
    data.source ? `Source: ${data.source}` : null,
    "",
    `Message: ${data.message}`
  ].filter(Boolean);

  const payload: Record<string, string | number | boolean> = {
    chat_id: chatId,
    text: textLines.join("\n"),
    disable_web_page_preview: true
  };

  const threadId = process.env.TELEGRAM_THREAD_ID;
  if (threadId && !Number.isNaN(Number(threadId))) {
    payload.message_thread_id = Number(threadId);
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram send failed", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }
}
