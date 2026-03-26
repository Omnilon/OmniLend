"use client";

import { FormEvent, useId, useState } from "react";
import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact({ showLaneCards = true }: { showLaneCards?: boolean }) {
  const { contact } = omniContent;
  const serviceOptions = omniContent.services.items.map((service) => service.title);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const companyId = useId();
  const interestId = useId();
  const messageId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      interest: String(formData.get("interest") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      source: "omnilend-pro"
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Unable to send message.");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  };

  return (
    <Section id="contact" className="pb-6">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-6">
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            subtitle={contact.subtitle}
          />
          <div className="omni-card">
            <p className="omni-kicker">Direct lines</p>
            <div className="mt-4 space-y-2 text-sm leading-6 text-[color:var(--text)]">
              <a
                href={`mailto:${contact.email}`}
                className="block transition hover:text-[color:var(--muted)]"
              >
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phoneDial}`}
                className="block transition hover:text-[color:var(--muted)]"
              >
                {contact.phone}
              </a>
            </div>
            <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
              {contact.availability}
            </p>
          </div>
          {showLaneCards ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceOptions.map((option, index) => (
                <div key={option} className="omni-card">
                  <p className="omni-kicker">Lane-{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-sm font-semibold uppercase leading-snug text-[color:var(--text)]">
                    {option}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <Reveal>
          <div className="omni-console flex h-full flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="omni-chip">{contact.formTitle}</p>
                <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                  {contact.formDescription}
                </p>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {contact.ctaNote}
              </div>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="omni-form-field">
                  <label htmlFor={nameId}>Name</label>
                  <input
                    id={nameId}
                    name="name"
                    required
                    autoComplete="name"
                    className="omni-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="omni-form-field">
                  <label htmlFor={emailId}>Email</label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="omni-input"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="omni-form-field">
                  <label htmlFor={phoneId}>Phone</label>
                  <input
                    id={phoneId}
                    name="phone"
                    autoComplete="tel"
                    className="omni-input"
                    placeholder="(404) 919-8026"
                  />
                </div>
                <div className="omni-form-field">
                  <label htmlFor={companyId}>Company</label>
                  <input
                    id={companyId}
                    name="company"
                    autoComplete="organization"
                    className="omni-input"
                    placeholder="Company or organization"
                  />
                </div>
              </div>

              <div className="omni-form-field">
                <label htmlFor={interestId}>Service focus</label>
                <select id={interestId} name="interest" className="omni-select" defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="Multiple">Multiple services</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <div className="omni-form-field">
                <label htmlFor={messageId}>Message</label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  rows={4}
                  className="omni-textarea"
                  placeholder="Tell us about your goals, timeline, and priorities."
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  className="omni-button omni-button--primary disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : contact.ctaLabel}
                </button>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {contact.ctaNote}
                </div>
              </div>
              <div className="min-h-[20px] text-xs" aria-live="polite">
                {status === "success" ? (
                  <span className="text-emerald-700">Message sent. We will follow up soon.</span>
                ) : null}
                {status === "error" ? <span className="text-red-700">{errorMessage}</span> : null}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
