"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandNavbar } from "./BrandNavbar";
import { HudBracket } from "./HudBracket";
import { Section } from "./Section";
import { SoundToggle } from "./SoundToggle";
import { HeroGate, hasEnteredGate } from "./HeroGate";
import { Preloader, hasSeenPreloader } from "./Preloader";
import { ExperienceDeck } from "./ExperienceDeck";

const INTERIOR_SERVICES = [
  {
    title: "E-Design",
    description:
      "Fast, flat-fee design boards with finish schedules and linked shopping lists you can execute on your timeline."
  },
  {
    title: "Residential Refresh",
    description:
      "Room-by-room transformations with milestone billing. Client-funded purchasing keeps budgets transparent."
  },
  {
    title: "Staging & Small Commercial",
    description:
      "Photo-ready staging and durable layouts for boutiques, coffee shops, and creative offices."
  }
];

const INTERIOR_PROCESS = [
  {
    title: "Discovery call",
    description: "Define style fit, budget, and timing before we lock the scope."
  },
  {
    title: "Design concepts",
    description: "Boards and selections arrive with simple scopes and no-surprise budgets."
  },
  {
    title: "Procurement",
    description: "Client-funded purchasing keeps cash flow honest while we coordinate logistics."
  },
  {
    title: "Install + styling",
    description: "We handle install day so the space feels calm, warm, and functional."
  }
];

const SECURITY_INTEL = [
  {
    title: "In-store vulnerability sweep",
    description:
      "Map blind spots, ticket swaps, and exit paths using the same playbooks as professional boosters."
  },
  {
    title: "Policy & POS penetration",
    description:
      "Stress test returns, overrides, coupon stacking, and self-checkout flows to expose loopholes."
  },
  {
    title: "Ecommerce exploit hunt",
    description:
      "Simulate bots, refund abuse, affiliate fraud, and skimming to harden your storefront."
  }
];

const SECURITY_COVERAGE =
  "Secret Lifters align on risk personas, deploy covert operatives, and debrief leadership with raw footage, data trails, and prioritized fixes across physical merchandising and digital commerce.";

const INK_SPECIALS = [
  {
    title: "Flash queue",
    description: "Ready-to-go flash refreshed monthly so you can pick a design and be in the chair fast."
  },
  {
    title: "Sticker discount",
    description: "Bring any sticker to drop flash pieces from $39.99 to $29.99—thanks for supporting the apprenticeship."
  },
  {
    title: "Thoughtful placements",
    description: "We map tattoos with real objects so you know what fits comfortably and heals clean, plus aftercare PDFs."
  }
];

const INK_PRICING =
  "Flash tattoos run $39.99—or $29.99 with the sticker discount. Larger custom work ranges from $59.99 to $499.99 depending on coverage and detail. Every appointment requires a 50% deposit applied to the final total with healing check-ins included.";

const TESTIMONIALS = [
  {
    quote: "Absolutely transformed our living room. Calm, warm, and practical.",
    author: "A. Rivera",
    role: "Homeowner"
  },
  {
    quote: "Clear milestones and great communication. Install day felt effortless.",
    author: "L. Greene",
    role: "Townhome Renovation"
  },
  {
    quote: "We booked e-design first, then brought Ømnilon for full staging.",
    author: "M. Patel",
    role: "Realtor Partner"
  }
];

export function BrandPage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const seen = hasSeenPreloader();
    const gate = hasEnteredGate();
    setPreloaderDone(seen);
    setShowPreloader(!seen);
    setEntered(gate);
  }, []);

  return (
    <div id="top" className="relative min-h-screen bg-bg text-white">
      <BrandNavbar />
      <AnimatePresence>
        {showPreloader && !preloaderDone ? (
          <Preloader
            key="preloader"
            onComplete={() => {
              setPreloaderDone(true);
              setShowPreloader(false);
            }}
          />
        ) : null}
      </AnimatePresence>
      {preloaderDone ? (
        <HeroGate
          open={entered}
          onEnter={() => {
            setEntered(true);
          }}
        />
      ) : null}
      {entered ? (
        <motion.main
          className="relative pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Section
            id="experiences"
            label="Entry Sequence"
            title="Choose your Ømnilon world"
            intro="Pick the lane you need today—interior design, Secret Lifter intelligence, or apprentice-led ink. Each card shows how we scope the work, bill transparently, and keep you updated."
          >
            <ExperienceDeck />
          </Section>

          <Section
            id="interiors"
            label="Interiors"
            title="Interiors services"
            intro="Intentional residential, staging, and boutique spaces with a transparent process from the first concept to install day."
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {INTERIOR_SERVICES.map((service) => (
                <HudBracket key={service.title} className="min-h-[220px] bg-white/5 p-6" label="Service">
                  <div className="flex h-full flex-col justify-between gap-4">
                    <h3 className="font-grotesk text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted">{service.description}</p>
                  </div>
                </HudBracket>
              ))}
            </div>
          </Section>

          <Section
            id="process"
            label="Process"
            title="How interior projects move"
            intro="Every engagement stays grounded with milestone billing, client-funded purchasing, and calm communication."
          >
            <div className="grid gap-6 md:grid-cols-2">
              {INTERIOR_PROCESS.map((step, index) => (
                <HudBracket
                  key={step.title}
                  className="h-full bg-white/5 p-6"
                  label={`Step ${index + 1}`}
                >
                  <div className="flex h-full flex-col gap-4">
                    <h3 className="font-grotesk text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted">{step.description}</p>
                  </div>
                </HudBracket>
              ))}
            </div>
          </Section>

          <Section
            id="security"
            label="Asset Protection"
            title="Secret Lifter intelligence"
            intro="Covert operatives simulate organized theft, policy abuse, and ecommerce exploits so you can shore up weak points before crews ever arrive."
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {SECURITY_INTEL.map((intel) => (
                <HudBracket key={intel.title} className="min-h-[220px] bg-white/5 p-6" label="Engagement">
                  <div className="flex h-full flex-col justify-between gap-4">
                    <h3 className="font-grotesk text-xl font-semibold text-white">
                      {intel.title}
                    </h3>
                    <p className="text-sm text-muted">{intel.description}</p>
                  </div>
                </HudBracket>
              ))}
            </div>
            <HudBracket className="mt-6 bg-white/5 p-6" label="Coverage">
              <p className="text-sm text-muted">{SECURITY_COVERAGE}</p>
            </HudBracket>
          </Section>

          <Section
            id="ink"
            label="Ømnilon Ink"
            title="Ømnilon Ink specials"
            intro="Apprentice-led flash, custom line work, and transparent aftercare so every session feels intentional."
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {INK_SPECIALS.map((special) => (
                <HudBracket key={special.title} className="min-h-[220px] bg-white/5 p-6" label="Studio">
                  <div className="flex h-full flex-col justify-between gap-4">
                    <h3 className="font-grotesk text-xl font-semibold text-white">
                      {special.title}
                    </h3>
                    <p className="text-sm text-muted">{special.description}</p>
                  </div>
                </HudBracket>
              ))}
            </div>
            <HudBracket className="mt-6 bg-white/5 p-6" label="Pricing & Deposits">
              <p className="text-sm text-muted">{INK_PRICING}</p>
            </HudBracket>
          </Section>

          <Section
            id="testimonials"
            label="Proof"
            title="Client notes"
            intro="A few quick wins from interiors clients who trusted Ømnilon to handle every detail."
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {TESTIMONIALS.map((testimonial) => (
                <HudBracket key={testimonial.quote} className="h-full bg-white/5 p-6" label={testimonial.role}>
                  <blockquote className="flex h-full flex-col justify-between gap-4">
                    <p className="text-sm text-muted">“{testimonial.quote}”</p>
                    <footer className="text-sm font-semibold text-white">{testimonial.author}</footer>
                  </blockquote>
                </HudBracket>
              ))}
            </div>
          </Section>

          <Section
            id="cta"
            label="Next Steps"
            title="Tell us where to start."
            intro="Share whether you need interiors, security intelligence, or an ink session and we’ll respond within one business day."
          >
            <HudBracket className="bg-white/5 p-6" label="Contact">
              <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Email <a className="underline decoration-dotted underline-offset-4 hover:text-white" href="mailto:omnilend.co@gmail.com">omnilend.co@gmail.com</a>{" "}
                  or call <a className="underline decoration-dotted underline-offset-4 hover:text-white" href="tel:14049198026">404-919-8026</a>. Interiors projects are available nationwide with an Atlanta-based install team, and Secret Lifters deploy wherever loss prevention needs backup.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.36em] text-white transition duration-300 ease-brand hover:border-accent-purple hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Contact Ømnilon
                </Link>
              </div>
            </HudBracket>
          </Section>

          <footer className="border-t border-white/10 bg-black/40">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent-purple">
                  Ømnilon Studio
                </span>
                <p className="mt-2 text-sm text-muted">
                  Atlanta, GA &amp; Remote • © {new Date().getFullYear()} Ømnilon
                </p>
              </div>
              <SoundToggle />
            </div>
          </footer>
        </motion.main>
      ) : null}
    </div>
  );
}
