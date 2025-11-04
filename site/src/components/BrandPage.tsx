"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandNavbar } from "@/components/BrandNavbar";
import { HudBracket } from "@/components/HudBracket";
import { HudDemo } from "@/components/HudDemo";
import { PaletteGrid } from "@/components/PaletteGrid";
import { GradientCard } from "@/components/GradientCard";
import { Section } from "@/components/Section";
import { TypeSpecimen } from "@/components/TypeSpecimen";
import { SoundToggle } from "@/components/SoundToggle";
import { HeroGate, hasEnteredGate } from "@/components/HeroGate";
import { Preloader, hasSeenPreloader } from "@/components/Preloader";

const GUIDELINE_CARDS = [
  {
    tag: "Light",
    title: "Luminous Layers",
    description:
      "Blend dark glass, subtle bloom, and precision glints to surface the moments that matter."
  },
  {
    tag: "Grid",
    title: "Measured Rhythm",
    description:
      "Align data, copy, and controls on a high-contrast 8pt grid that flexes from HUD to mobile."
  },
  {
    tag: "Iconography",
    title: "Neutral Signals",
    description:
      "Deploy sharp, minimal icon strokes that reinforce speed without stealing the narrative."
  },
  {
    tag: "Emotional Tech",
    title: "Human Pulse",
    description:
      "Warm micro-animations and tone cues reassure SITE_OWNER customers in high-stakes flows."
  },
  {
    tag: "Focus",
    title: "Guided Attention",
    description:
      "Corner brackets frame action zones, ensuring SITE_OWNER teams lock onto priority tasks."
  },
  {
    tag: "Sound",
    title: "Sensory Feedback",
    description:
      "Discrete toggles, chimes, and spatial cues signal state changes without overwhelming."
  }
];

const COLOR_ITEMS = [
  {
    name: "Background",
    hex: "#0A0A0A",
    description: "Primary canvas for 80% of surfaces."
  },
  {
    name: "Interface",
    hex: "#101010",
    description: "Secondary elevations and cards."
  },
  {
    name: "Copy",
    hex: "#FFFFFF",
    description: "High-contrast typography."
  },
  {
    name: "Support",
    hex: "#A3A3A3",
    description: "Muted labels for secondary data."
  },
  {
    name: "Serenity Purple",
    hex: "#D4A0FF",
    description: "Primary accent for glow states."
  }
];

const SIGNAL_ITEMS = [
  {
    name: "Safety Orange",
    hex: "#FF5300",
    description: "High-energy CTA and alert surfaces."
  },
  {
    name: "Success Green",
    hex: "#6EC85C",
    description: "Positive confirmation banners."
  },
  {
    name: "Alert Red",
    hex: "#E40046",
    description: "Blocking errors and urgency moments."
  }
];

const TYPE_SAMPLES = [
  {
    label: "H1",
    description: "Space Grotesk 56/1.0",
    sample: "Free From Compromise",
    sizeClass: "text-[56px] leading-[1] tracking-tight font-bold"
  },
  {
    label: "H2",
    description: "Space Grotesk 32/1.0",
    sample: "Command the Channel",
    sizeClass: "text-[32px] leading-[1] font-bold"
  },
  {
    label: "Body",
    description: "Space Grotesk 14/1.5",
    sample:
      "SITE_OWNER communicates clearly with crisp body copy, balancing authority with warmth.",
    sizeClass: "text-[14px] leading-[1.5] tracking-tightest"
  },
  {
    label: "Label",
    description: "JetBrains Mono 10/1",
    sample: "Telemetry Synced",
    sizeClass: "font-mono text-[10px] uppercase tracking-[0.36em]"
  }
];

const VOICE_BLOCKS = [
  {
    title: "Overview",
    copy:
      "SITE_OWNER speaks with precision and intent—never loud, always clear. Every interaction feels engineered and trustworthy."
  },
  {
    title: "The Voice",
    copy:
      "We combine technical confidence with human clarity. We celebrate momentum, but we never hype beyond the data."
  },
  {
    title: "The Tone",
    copy:
      "Assertive, not aggressive. Calm, not cold. We lead with focus and give teams the confidence to execute."
  },
  {
    title: "Inclusive & Accessible",
    copy:
      "We meet every operator where they are. Layered color contrast, motion control, and descriptive copy ensure equity."
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
            id="guidelines"
            label="Guidelines"
            title="Frame the future with SITE_OWNER"
            intro="A modular system of brackets, signals, and sensory cues keeps the SITE_OWNER command center sharp, legible, and deeply human."
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
            title="Type speaks velocity"
            intro="Space Grotesk delivers confident statements, while JetBrains Mono keeps telemetry crisp. Download assets to integrate instantly."
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
            intro="SITE_OWNER lives in a world that is mostly black and white. Accents are purposeful bursts of Serenity Purple, Safety Orange, and a trio of status colors."
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
            intro="Interactive HUD frames keep SITE_OWNER operators anchored. Cycle through modes to see how light, data, and environment respond."
          >
            <HudDemo />
          </Section>

          <Section
            id="voice"
            label="Voice"
            title="Design for confident calm"
            intro="Our narrative architecture balances precision with warmth so SITE_OWNER always sounds trustworthy, efficient, and empathetic."
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
                  SITE_OWNER Command Center
                </span>
                <p className="mt-2 text-sm text-muted">Gridline City • © {new Date().getFullYear()} SITE_OWNER</p>
              </div>
              <SoundToggle />
            </div>
          </footer>
        </motion.main>
      ) : null}
    </div>
  );
}
