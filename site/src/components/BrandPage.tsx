"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandNavbar } from "./BrandNavbar";
import { HudBracket } from "./HudBracket";
import { HudDemo } from "./HudDemo";
import { PaletteGrid } from "./PaletteGrid";
import { GradientCard } from "./GradientCard";
import { Section } from "./Section";
import { TypeSpecimen } from "./TypeSpecimen";
import { SoundToggle } from "./SoundToggle";
import { HeroGate, hasEnteredGate } from "./HeroGate";
import { Preloader, hasSeenPreloader } from "./Preloader";
import { ExperienceDeck } from "./ExperienceDeck";

const GUIDELINE_CARDS = [
  {
    tag: "INTERIORS",
    title: "Calm, livable spaces",
    description:
      "Residential refreshes, staging, and boutique installs with milestone billing and client-funded purchasing."
  },
  {
    tag: "SECURITY",
    title: "Secret Lifter intel",
    description:
      "Covert crews simulate organized theft, refund abuse, and policy loopholes so you can close the gaps first."
  },
  {
    tag: "INK",
    title: "Apprentice tattoo studio",
    description:
      "Flash minis, sticker discounts, and thoughtful placements with transparent deposits and aftercare."
  },
  {
    tag: "PROCESS",
    title: "Momentum over mystery",
    description:
      "Quick replies, human updates, and scopes written in plain English keep every engagement grounded."
  },
  {
    tag: "DEPOSITS",
    title: "50% reserves resources",
    description:
      "Deposits lock design time, Secret Lifter operatives, or tattoo seats so we never overbook or underdeliver."
  },
  {
    tag: "ACCESS",
    title: "Atlanta base + remote",
    description:
      "On-site interiors in ATL, remote e-design nationwide, and security charters across any store or ecommerce stack."
  }
];

const COLOR_ITEMS = [
  {
    name: "Background",
    hex: "#0A0A0A",
    description: "80% charcoal canvas that mirrors the interiors studio and security dashboards."
  },
  {
    name: "Interface",
    hex: "#101010",
    description: "Secondary cards for scopes, LP intel, and tattoo booking states."
  },
  {
    name: "Copy",
    hex: "#FFFFFF",
    description: "High-contrast typography so clients, LP leads, and guests never guess."
  },
  {
    name: "Support",
    hex: "#A3A3A3",
    description: "Muted labels for secondary data, disclaimers, and aftercare notes."
  },
  {
    name: "Serenity Purple",
    hex: "#D4A0FF",
    description: "Primary accent for flash promos, Secret Lifter wins, and CTA halos."
  }
];

const SIGNAL_ITEMS = [
  {
    name: "Safety Orange",
    hex: "#FF5300",
    description: "High-energy CTA hue for booking forms, fraud alerts, and rush requests."
  },
  {
    name: "Success Green",
    hex: "#6EC85C",
    description: "Used for paid invoices, cleared installs, or tattoo healing check-ins."
  },
  {
    name: "Alert Red",
    hex: "#E40046",
    description: "Flags blocking issues—policy holes, double-bookings, or consent waivers."
  }
];

const TYPE_SAMPLES = [
  {
    label: "H1",
    description: "Space Grotesk 56/1.0",
    sample: "Intentional spaces. Decisive intel.",
    sizeClass: "text-[56px] leading-[1] tracking-tight font-bold"
  },
  {
    label: "H2",
    description: "Space Grotesk 32/1.0",
    sample: "Secret Lifters, Interiors, Ink — one rhythm.",
    sizeClass: "text-[32px] leading-[1] font-bold"
  },
  {
    label: "Body",
    description: "Space Grotesk 14/1.5",
    sample:
      "Ømnilon answers fast, writes scopes in plain language, and keeps budgets transparent from deposit to delivery.",
    sizeClass: "text-[14px] leading-[1.5] tracking-tightest"
  },
  {
    label: "Label",
    description: "JetBrains Mono 10/1",
    sample: "Secret Lifter run · Flash slot · Deposit locked",
    sizeClass: "font-mono text-[10px] uppercase tracking-[0.36em]"
  }
];

const VOICE_BLOCKS = [
  {
    title: "Overview",
    copy:
      "Ømnilon speaks plainly, even when the work is complex. Interiors clients, LP teams, and tattoo guests all deserve the same clarity."
  },
  {
    title: "The Voice",
    copy:
      "Confident but never hyped. We share context, options, and consequences up front so every decision feels grounded."
  },
  {
    title: "The Tone",
    copy:
      "Calm, warm, and direct. Milestone emails, Secret Lifter reports, and studio reminders read like a trusted teammate."
  },
  {
    title: "Inclusive & Accessible",
    copy:
      "High contrast palettes, reduced-motion fallbacks, plain-language agreements, and aftercare PDFs keep everyone seen."
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

  const guidelines = useMemo(() => GUIDELINE_CARDS, []);

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
            intro="The shell now mirrors Ledger’s cinematic choose screen—three divisions, one immersive language. Toggle each card to explore the art direction, copy posture, and onboarding beats for Interiors, Secret Lifters, and the tattoo studio."
          >
            <ExperienceDeck />
          </Section>

          <Section
            id="guidelines"
            label="Experience Grid"
            title="Pick your Ømnilon lane"
            intro="One shell carries interiors installs, Secret Lifter field work, and the Ømnilon Ink studio. Start anywhere—each card shows how we scope, bill, and keep momentum."
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {guidelines.map((card) => (
                <HudBracket key={card.title} className="min-h-[220px] bg-white/5 p-6" label={card.tag}>
                  <div className="flex h-full flex-col justify-between gap-4">
                    <h3 className="font-grotesk text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted">{card.description}</p>
                  </div>
                </HudBracket>
              ))}
            </div>
          </Section>

          <Section
            id="typography"
            label="Typography"
            title="Type locks in trust"
            intro="Space Grotesk keeps headings warm yet decisive for interiors decks and tattoo promos, while JetBrains Mono handles Secret Lifter telemetry and booking labels."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {TYPE_SAMPLES.map((sample) => (
                <TypeSpecimen key={sample.label} {...sample} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.36em] text-white transition duration-300 ease-brand hover:border-accent-purple hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                href="#"
              >
                Download Space Grotesk
              </a>
              <a
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.36em] text-white transition duration-300 ease-brand hover:border-accent-purple hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                href="#"
              >
                Download JetBrains Mono
              </a>
            </div>
          </Section>

          <Section
            id="color"
            label="Color"
            title="80/20 contrast discipline"
            intro="Ømnilon keeps 80% of the canvas near-black for calm focus. Accents spotlight deposits, approvals, and Secret Lifter wins without overwhelming the page."
          >
            <PaletteGrid items={COLOR_ITEMS} />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <GradientCard name="Gradient One" gradientVar="--grad-1" />
              <GradientCard name="Gradient Two" gradientVar="--grad-2" />
              <GradientCard name="Gradient Three" gradientVar="--grad-3" />
            </div>
            <div className="mt-8">
              <PaletteGrid items={SIGNAL_ITEMS} className="md:grid-cols-3" />
            </div>
            <p className="mt-6 text-sm text-muted">
              Tip: Maintain an 80/20 ratio of neutral-to-accent surfaces for a disciplined, cinematic interface.
            </p>
          </Section>

          <Section
            id="hud"
            label="HUD & 3D"
            title="Bracket brilliant decisions"
            intro="Interactive HUD frames mirror how we brief LP directors and interiors clients—highlighting threats, placements, or flash slots while the rest of the shell stays calm."
          >
            <HudDemo />
          </Section>

          <Section
            id="voice"
            label="Voice"
            title="Design for confident calm"
            intro="Our copy keeps timelines honest, explains risk in plain language, and welcomes every guest into the process."
          >
            <div className="grid gap-6 md:grid-cols-2">
              {VOICE_BLOCKS.map((block) => (
                <HudBracket key={block.title} className="min-h-[200px] bg-white/5 p-6" label={block.title}>
                  <p className="text-sm text-muted">{block.copy}</p>
                </HudBracket>
              ))}
            </div>
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
