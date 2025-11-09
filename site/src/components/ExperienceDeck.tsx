"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HudBracket } from "./HudBracket";
import { useSound } from "./SoundProvider";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {
    id: "interiors",
    label: "Interiors",
    title: "Ømnilon Interiors",
    tagline: "Calm, functional spaces",
    description:
      "Residential refreshes, staging, and boutique installs that honor your rituals while keeping budgets transparent.",
    highlights: [
      "Client-funded purchasing so we never float materials",
      "Milestone billing mapped to each install phase",
      "Material libraries curated for durability and warmth"
    ],
    image:
      "https://images.unsplash.com/photo-1616594039964-5d3f4360a3bb?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "security",
    label: "Secret Lifters",
    title: "Ømnilon Security",
    tagline: "Proactive loss intelligence",
    description:
      "Covert Secret Lifters simulate organized theft, refund abuse, and policy loopholes before real crews ever touch them.",
    highlights: [
      "Field-ready playbooks for every vulnerable zone",
      "Ticket swaps, RFID gaps, and OMS exploits documented",
      "48-hour remediation briefs with annotated footage"
    ],
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "ink",
    label: "Ømnilon Ink",
    title: "Tattoo Apprenticeship",
    tagline: "Intentional flash & custom line work",
    description:
      "Sticker-discount flash sheets, thoughtful placements, and transparent deposits while the craft keeps leveling up.",
    highlights: [
      "Monthly flash drops with apprentice pricing",
      "Placement previews using real-world scale references",
      "Aftercare follow-ups so every piece heals clean"
    ],
    image:
      "https://images.unsplash.com/photo-1504292008362-316e7ebbeb1f?q=80&w=1600&auto=format&fit=crop"
  }
] as const;

type Experience = (typeof EXPERIENCES)[number];

export function ExperienceDeck() {
  const [activeId, setActiveId] = useState<Experience["id"]>("interiors");
  const { play } = useSound();

  const activeExperience = useMemo(
    () => EXPERIENCES.find((item) => item.id === activeId) ?? EXPERIENCES[0],
    [activeId]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExperience.id}
            className="relative h-[320px] w-full overflow-hidden sm:h-[420px]"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeExperience.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,160,255,0.25),transparent_55%)] mix-blend-screen" />
            <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-6 sm:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-white/70">
                {activeExperience.tagline}
              </span>
              <div className="space-y-2">
                <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                  {activeExperience.title}
                </h3>
                <p className="max-w-xl text-sm text-white/80 sm:text-base">
                  {activeExperience.description}
                </p>
              </div>
              <div className="grid gap-2 text-sm text-white/80 sm:max-w-lg">
                {activeExperience.highlights.map((item) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent-purple" aria-hidden />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 border border-white/10" />
          </motion.div>
        </AnimatePresence>
        <div className="relative z-20 flex justify-center gap-2 border-t border-white/10 bg-black/40 px-4 py-3">
          {EXPERIENCES.map((experience) => (
            <button
              key={experience.id}
              type="button"
              onClick={() => {
                setActiveId(experience.id);
                play("hover");
              }}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.36em] transition duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                activeId === experience.id
                  ? "border-white/60 bg-white/20 text-white"
                  : "border-white/10 bg-white/5 text-muted hover:border-accent-purple hover:text-accent-purple"
              )}
              aria-pressed={activeId === experience.id}
            >
              {experience.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <HudBracket label="Entry Flow" className="h-full w-full bg-white/5 p-6">
          <p className="text-sm text-muted">
            Each experience inherits the Ømnilon shell: the hero gate fades into a tailored world,
            hover reveals surface microcopy, and motion respects prefers-reduced-motion while still
            delivering a Ledger-level intro.
          </p>
          <p className="mt-4 text-sm text-muted">
            Use these toggles to storyboard the onboarding moment for interiors clients, Secret
            Lifter partners, or ink guests. The active frame mirrors the cinematic camera pan and HUD
            overlays planned for production.
          </p>
        </HudBracket>
      </div>
    </div>
  );
}
