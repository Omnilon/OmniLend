"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { HudBracket } from "./HudBracket";
import { useSound } from "./SoundProvider";
import { cn } from "@/lib/utils";

const MODES = [
  {
    id: "text",
    label: "Text Display",
    description: "Secret Lifter readouts with shrink deltas, blind spots, and recommended fixes.",
    accent: "var(--accent-purple)"
  },
  {
    id: "highlight",
    label: "Highlight",
    description: "Call attention to fraud routes, ticket swaps, or VIP interventions instantly.",
    accent: "var(--accent-orange)"
  },
  {
    id: "environment",
    label: "Environment",
    description: "Ambient cues set the tone for calm interiors or late-night asset sweeps.",
    accent: "var(--accent-green)"
  }
] as const;

type ModeId = (typeof MODES)[number]["id"];

export function HudDemo() {
  const [mode, setMode] = useState<ModeId>("text");
  const { play } = useSound();

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <HudBracket className="min-h-[320px] bg-black/40" label={mode.toUpperCase()}>
        <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/10 bg-black/60">
          <Image
            src="/images/hud-demo.png"
            alt="HUD demonstration"
            fill
            className="object-cover opacity-60"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: mode === "environment" ? 0.8 : 0.4,
              filter:
                mode === "highlight"
                  ? "drop-shadow(0 0 28px rgba(255,83,0,0.45))"
                  : "drop-shadow(0 0 18px rgba(212,160,255,0.35))"
            }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background:
                mode === "environment"
                  ? "radial-gradient(120% 120% at 50% 0%, rgba(69,57,92,0.9) 0%, rgba(10,10,10,0) 70%)"
                  : "linear-gradient(135deg, rgba(212,160,255,0.25), rgba(10,10,10,0))"
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              backgroundImage:
                mode === "highlight"
                  ? "radial-gradient(circle at 60% 40%, rgba(255,83,0,0.35), transparent 60%)"
                  : "radial-gradient(circle at 20% 20%, rgba(212,160,255,0.3), transparent 60%)"
            }}
          />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)] opacity-20 mix-blend-screen" />
          <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-6">
            <div className="grid gap-1 text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-white/80">
                {MODES.find((item) => item.id === mode)?.label}
              </span>
              <p className="text-sm text-white/90">
                {MODES.find((item) => item.id === mode)?.description}
              </p>
            </div>
            <motion.div
              className="grid grid-cols-2 gap-2 text-[12px] uppercase tracking-[0.15em] text-muted"
              animate={{ opacity: mode === "text" ? 1 : 0.4 }}
            >
              <span>APR</span>
              <span className="text-right text-white">6.4%</span>
              <span>Term</span>
              <span className="text-right text-white">24 months</span>
              <span>Limit</span>
              <span className="text-right text-accent-purple">$250K</span>
            </motion.div>
          </div>
        </div>
      </HudBracket>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMode(item.id);
                play("hover");
              }}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.36em] transition duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                mode === item.id
                  ? "border-white/50 bg-white/20 text-white"
                  : "border-white/10 bg-white/5 text-muted hover:border-accent-purple hover:text-accent-purple"
              )}
              aria-pressed={mode === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-muted">
          Adjust HUD states to preview how Ømnilon briefs interiors clients, LP directors,
          and tattoo guests—switching between dense intel, attention highlights, and
          atmospheric calm without overwhelming anyone in the loop.
        </div>
      </div>
    </div>
  );
}
