"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { omniContent, Service } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function ServiceCard({
  service,
  onSelect
}: {
  service: Service;
  onSelect: (service: Service) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(service)}
      aria-haspopup="dialog"
      className={cn(
        "group relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left",
        "transition duration-300 ease-brand hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      )}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
        Module
      </span>
      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
      <p className="text-sm text-white/70">{service.summary}</p>
      <div className="mt-auto flex items-center gap-2 text-xs font-semibold text-accent">
        View details
        <span aria-hidden>→</span>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
      >
        <span className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <span className="absolute -left-1/3 top-1/2 h-[2px] w-2/3 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent animate-sweep" />
      </span>
    </motion.button>
  );
}

export function Services() {
  const { services } = omniContent;
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <Section id="services">
      <div className="grid gap-12">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} onSelect={setActiveService} />
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(activeService)}
        onClose={() => setActiveService(null)}
        title={activeService?.title ?? ""}
        description={activeService?.description}
      >
        {activeService ? (
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                Outcomes
              </p>
              <ul className="mt-3 space-y-2">
                {activeService.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                Deliverables
              </p>
              <ul className="mt-3 space-y-2">
                {activeService.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent2" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setActiveService(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  const contact = document.getElementById("contact");
                  if (contact) {
                    const prefersReducedMotion = window.matchMedia(
                      "(prefers-reduced-motion: reduce)"
                    ).matches;
                    contact.scrollIntoView({
                      behavior: prefersReducedMotion ? "auto" : "smooth"
                    });
                  }
                  setActiveService(null);
                }}
              >
                Start a project
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
