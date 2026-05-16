import type { LeadSubmissionInput } from "./schema";

export type LeadSubmitResult =
  | { ok: true; leadId: string }
  | { ok: false; error: string };

export async function submitLead(input: LeadSubmissionInput): Promise<LeadSubmitResult> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  const body = (await response.json().catch(() => null)) as LeadSubmitResult | null;

  if (!response.ok || !body) {
    return { ok: false, error: "Lead submission failed." };
  }

  return body;
}
