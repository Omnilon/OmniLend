"use client";

import { FormEvent, useId, useState } from "react";
import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { contact } = omniContent;
  const serviceOptions = omniContent.services.items.map((service) => service.title);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
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
    <Section id="contact" className="pb-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle} />
        <Reveal>
          <div className="glass-panel flex h-full flex-col gap-6 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                  Contact
                </p>
                <div className="mt-2 space-y-1 text-sm text-white/80">
                  <a href={`mailto:${contact.email}`} className="block hover:text-white">
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phoneDial}`}
                    className="block text-white/70 hover:text-white"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="text-xs text-white/50">{contact.availability}</div>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                {contact.formTitle}
              </p>
              <p className="mt-2 text-sm text-white/70">{contact.formDescription}</p>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor={nameId} className="text-xs text-white/70">
                    Name
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    required
                    autoComplete="name"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={emailId} className="text-xs text-white/70">
                    Email
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor={phoneId} className="text-xs text-white/70">
                    Phone
                  </label>
                  <input
                    id={phoneId}
                    name="phone"
                    autoComplete="tel"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    placeholder="(404) 919-8026"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={companyId} className="text-xs text-white/70">
                    Company
                  </label>
                  <input
                    id={companyId}
                    name="company"
                    autoComplete="organization"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    placeholder="Company or organization"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={interestId} className="text-xs text-white/70">
                  Service focus
                </label>
                <select
                  id={interestId}
                  name="interest"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#0b0b11] text-white">
                      {option}
                    </option>
                  ))}
                  <option value="Multiple">Multiple services</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={messageId} className="text-xs text-white/70">
                  Message
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  rows={4}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  placeholder="Tell us about your goals, timeline, and priorities."
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button type="submit" size="lg" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending..." : contact.ctaLabel}
                </Button>
                <div className="text-xs text-white/50">{contact.ctaNote}</div>
              </div>
              <div className="min-h-[20px] text-xs" aria-live="polite">
                {status === "success" ? (
                  <span className="text-emerald-300">Message sent. We will follow up soon.</span>
                ) : null}
                {status === "error" ? (
                  <span className="text-red-300">{errorMessage}</span>
                ) : null}
              </div>
            </form>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${contact.email}`} variant="ghost">
                Email direct
              </ButtonLink>
              <ButtonLink href={`tel:${contact.phoneDial}`} variant="ghost">
                Call
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
