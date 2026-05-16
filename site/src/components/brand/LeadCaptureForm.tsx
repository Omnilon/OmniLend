"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Division } from "@/content/divisions";
import { submitLead } from "@/lib/leads/submitLead";
import { MagneticButton } from "./MagneticButton";
import { SectionLabel } from "./SectionLabel";

type Status = "idle" | "submitting" | "success" | "error";
type CaptchaStatus = "loading" | "ready" | "error";

type CaptchaChallenge = {
  question: string;
  token: string;
  expiresAt: number;
};

export function LeadCaptureForm({ division }: { division: Division }) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>("loading");

  const labels = division.leadFormFields;
  const loadCaptcha = useCallback(async () => {
    setCaptchaStatus("loading");
    setCaptchaAnswer("");

    try {
      const response = await fetch("/api/leads/captcha", { cache: "no-store" });
      const body = (await response.json().catch(() => null)) as
        | { ok: true; captcha: CaptchaChallenge }
        | null;

      if (!response.ok || !body?.ok) {
        throw new Error("Captcha request failed");
      }

      setCaptcha(body.captcha);
      setCaptchaStatus("ready");
    } catch {
      setCaptcha(null);
      setCaptchaStatus("error");
    }
  }, []);

  const submitCopy = useMemo(() => {
    if (status === "submitting") return "Sending";
    if (status === "success") return "Received";
    return `Start ${division.shortName} intake`;
  }, [division.shortName, status]);

  useEffect(() => {
    void loadCaptcha();
  }, [loadCaptcha]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    if (!captcha || captchaStatus !== "ready") {
      setError("Security check is not ready. Refresh the check and try again.");
      setStatus("error");
      return;
    }

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
      sourcePath: pathname,
      captchaToken: captcha.token,
      captchaAnswer,
      companyWebsite: String(form.get("companyWebsite") ?? "")
    });

    if (result.ok) {
      setStatus("success");
      event.currentTarget.reset();
      void loadCaptcha();
      return;
    }

    setError(result.error);
    setStatus("error");
    void loadCaptcha();
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
        <label className="hidden" aria-hidden="true">
          <span>Company website</span>
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="form-label">Security check</span>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              name="captchaAnswer"
              value={captchaAnswer}
              onChange={(event) => setCaptchaAnswer(event.target.value)}
              required
              inputMode="numeric"
              autoComplete="off"
              disabled={captchaStatus !== "ready" || status === "submitting"}
              placeholder={
                captchaStatus === "ready" && captcha
                  ? `Solve: ${captcha.question}`
                  : "Loading security check..."
              }
              className="form-field"
            />
            <button
              type="button"
              onClick={() => void loadCaptcha()}
              className="border border-white/16 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/65 transition hover:border-white/44 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              disabled={captchaStatus === "loading" || status === "submitting"}
            >
              Refresh
            </button>
          </div>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/42">
            {captchaStatus === "ready" && captcha
              ? `Answer ${captcha.question} before sending.`
              : "Security check must load before sending."}
          </span>
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
        <MagneticButton
          type="submit"
          disabled={status === "submitting" || captchaStatus !== "ready" || !captchaAnswer.trim()}
        >
          {submitCopy}
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
      </div>
    </form>
  );
}
