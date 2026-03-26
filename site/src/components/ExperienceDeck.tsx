"use client";

import { useEffect, useMemo, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
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
    image: "/images/worlds/interiors.jpg" // TODO: swap with final brand asset if desired
  },
  {
    id: "security",
    label: "Asset Fortification",
    title: "Ømnilon Fortification",
    tagline: "Proactive loss intelligence",
    description:
      "In-store and ecommerce vulnerability testing that exposes theft, refund abuse, and policy loopholes before they become losses.",
    highlights: [
      "Operational playbooks mapped to your highest-risk zones",
      "Ticket swap, exit lane, and policy exploit coverage",
      "48-hour remediation briefs with evidence trails"
    ],
    image: "/images/worlds/security.jpg" // TODO: swap with final brand asset if desired
  },
  {
    id: "ink",
    label: "Tattoos",
    title: "Tattoo Apprenticeship",
    tagline: "Intentional flash & custom line work",
    description:
      "Sticker-discount flash sheets, thoughtful placements, and transparent deposits while the craft keeps leveling up.",
    highlights: [
      "Monthly flash drops with apprentice pricing",
      "Placement previews using real-world scale references",
      "Aftercare follow-ups so every piece heals clean"
    ],
    image: "/images/worlds/ink.jpg" // TODO: swap with final brand asset if desired
  },
  {
    id: "financing",
    label: "Consumer Financing",
    title: "America's First Finance",
    tagline: "Flexible approvals for big-ticket buys",
    description:
      "Offer monthly payments for mopeds, scooters, iPhones, MacBooks, computers, and PCs with clear terms and fast approvals.",
    highlights: [
      "Device-ready programs for iPhones, MacBooks, and desktop builds",
      "Mobility financing for mopeds and scooters",
      "Transparent monthly payment and term disclosures",
      "Approval workflow powered by America's First Finance"
    ],
    image: "/images/worlds/financing.jpg" // TODO: swap with final brand asset if desired
  }
];

export type ExperienceId = (typeof EXPERIENCES)[number]["id"];

type Experience = (typeof EXPERIENCES)[number];

type ExperienceDeckProps = {
  activeId: ExperienceId;
  onSelect: (id: ExperienceId) => void;
};

export function ExperienceDeck({ activeId, onSelect }: ExperienceDeckProps) {
  const { play } = useSound();
  const [highlightIndex, setHighlightIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.6, 0.6], [10, -10]), {
    stiffness: 120,
    damping: 14
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.6, 0.6], [-10, 10]), {
    stiffness: 120,
    damping: 14
  });
  const lift = useSpring(useTransform(pointerY, [-0.6, 0.6], [12, -4]), {
    stiffness: 90,
    damping: 15
  });

  const activeExperience = useMemo(
    () => EXPERIENCES.find((item) => item.id === activeId) ?? EXPERIENCES[0],
    [activeId]
  );
  const spotlightX = useTransform(pointerX, [-0.6, 0.6], ["25%", "75%"]);
  const spotlightY = useTransform(pointerY, [-0.6, 0.6], ["30%", "70%"]);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.12), transparent 65%)`;

  useEffect(() => {
    setHighlightIndex(0);
    const total = activeExperience.highlights.length || 1;
    const id = window.setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % total);
    }, 2600);
    return () => window.clearInterval(id);
  }, [activeExperience]);

  const activeHighlight = useMemo(() => {
    if (!activeExperience.highlights.length) return "";
    return activeExperience.highlights[highlightIndex % activeExperience.highlights.length];
  }, [activeExperience.highlights, highlightIndex]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - bounds.left) / bounds.width - 0.5) * 1.2;
    const py = ((event.clientY - bounds.top) / bounds.height - 0.5) * 1.2;
    pointerX.set(px);
    pointerY.set(py);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <AnimatePresence mode="wait">
          <div className="relative h-[320px] w-full overflow-hidden rounded-3xl sm:h-[420px]">
            <motion.div
              key={activeExperience.id}
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                translateZ: lift
              }}
            >
              <div className="absolute inset-[-6%] will-change-transform">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[32px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${activeExperience.image})`,
                    transform: "scale(1.08)"
                  }}
                />
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_20%_20%,rgba(212,160,255,0.25),transparent_55%)] mix-blend-screen" />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-[32px]"
                  style={{ backgroundImage: spotlight, mixBlendMode: "screen" }}
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ y: ["0%", "100%", "0%"], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-6 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-white/70">
                    {activeExperience.tagline}
                  </span>
                  <span className="hidden items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-white/70 sm:inline-flex">
                    <span
                      className="h-2 w-2 rounded-full bg-accent-purple shadow-glow"
                      aria-hidden
                    />
                    HUD Live
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                    {activeExperience.title}
                  </h3>
                  <p className="max-w-xl text-sm text-white/80 sm:text-base">
                    {activeExperience.description}
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-left text-[10px] font-mono uppercase tracking-[0.32em] text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-green" aria-hidden />
                    Mission feed:
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeHighlight}
                      className="ml-2 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium normal-case tracking-tight text-white"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {activeHighlight}
                    </motion.span>
                  </AnimatePresence>
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
            </motion.div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
          </div>
        </AnimatePresence>
        <div className="relative z-20 flex justify-center gap-2 border-t border-white/10 bg-black/40 px-4 py-3">
          {EXPERIENCES.map((experience) => (
            <button
              key={experience.id}
              type="button"
              onClick={() => {
                onSelect(experience.id);
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
        <HudBracket label="Why Ømnilon" className="h-full w-full bg-white/5 p-6">
          <div className="flex h-full flex-col justify-between gap-4">
            <p className="text-sm text-muted">
              One studio now handles interiors, asset fortification, tattoos, and consumer
              financing. Every lane keeps scopes clear, updates fast, and approvals straightforward.
            </p>
            <p className="text-sm text-muted">
              Ready to plan your project? Email{" "}
              <a
                href="mailto:omnilend.co@gmail.com"
                className="underline decoration-dotted underline-offset-4 hover:text-white"
              >
                omnilend.co@gmail.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:14702104341"
                className="underline decoration-dotted underline-offset-4 hover:text-white"
              >
                470-210-4341
              </a>
              .
            </p>
            <a
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.36em] text-white transition duration-300 ease-brand hover:border-accent-purple hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Start a project
            </a>
          </div>
        </HudBracket>
      </div>
    </div>
  );
}
