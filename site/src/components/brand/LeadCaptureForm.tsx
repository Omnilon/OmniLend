"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Division } from "@/content/divisions";
import { submitLead } from "@/lib/leads/submitLead";
import { MagneticButton } from "./MagneticButton";
import { SectionLabel } from "./SectionLabel";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadCaptureForm({ division }: { division: Division }) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const labels = division.leadFormFields;
  const submitCopy = useMemo(() => {
    if (status === "submitting") return "Sending";
    if (status === "success") return "Received";
    return `Start ${division.shortName} intake`;
  }, [division.shortName, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(event.currentTarget);
    const context = String(form.get("context") ?? "").trim();
    const timeline = String(form.get("timeline") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const composedMessage = [
      context ? `${labels.contextLabel}: ${context}` : null,
      timeline ? `${labels.timelineLabel}: ${timeline}` : null,
      "",
      message
    ]
      .filter((line) => line !== null)
      .join("\n")
      .slice(0, 2000);

    const result = await submitLead({
      division: division.slug,
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      budget: String(form.get("budget") ?? ""),
      serviceInterest: String(form.get("serviceInterest") ?? ""),
      message: composedMessage,
      sourcePath: pathname
    });

    if (result.ok) {
      setStatus("success");
      event.currentTarget.reset();
      return;
    }

    setError(result.error);
    setStatus("error");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <SectionLabel>Lead Capture</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold uppercase leading-none text-white md:text-5xl">
          Send the right signal first.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="form-label">Name</span>
          <input name="name" minLength={2} maxLength={120} required className="form-field" />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Email</span>
          <input name="email" type="email" required className="form-field" />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Phone</span>
          <input name="phone" maxLength={40} className="form-field" />
        </label>
        <label className="grid gap-2">
          <span className="form-label">{labels.serviceLabel}</span>
          <select name="serviceInterest" defaultValue="" className="form-field">
            <option value="" disabled>
              {labels.servicePlaceholder}
            </option>
            {labels.serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="form-label">{labels.budgetLabel}</span>
          <input
            name="budget"
            maxLength={80}
            placeholder={labels.budgetPlaceholder}
            className="form-field"
          />
        </label>
        <label className="grid gap-2">
          <span className="form-label">{labels.contextLabel}</span>
          <input
            name="context"
            maxLength={160}
            placeholder={labels.contextPlaceholder}
            className="form-field"
          />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="form-label">{labels.timelineLabel}</span>
          <input
            name="timeline"
            maxLength={120}
            placeholder={labels.timelinePlaceholder}
            className="form-field"
          />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="form-label">{labels.messageLabel}</span>
          <textarea
            name="message"
            minLength={10}
            maxLength={1600}
            required
            placeholder={labels.messagePlaceholder}
            className="form-field min-h-36 resize-y"
          />
        </label>
      </div>

      {status === "success" ? (
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--division-accent)]">
          <CheckCircle2 className="h-4 w-4" />
          Intake received.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-300">
          {error || "Lead submission failed."}
        </p>
      ) : null}

      <div>
        <MagneticButton type="submit" disabled={status === "submitting"}>
          {submitCopy}
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
      </div>
    </form>
  );
}
