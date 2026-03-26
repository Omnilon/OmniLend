"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform
} from "framer-motion";
import type { MouseEvent } from "react";
import { useSound } from "./SoundProvider";
import { GradientBG } from "./GradientBG";

const STORAGE_KEY = "omnilend:hero-entered";

type HeroGateProps = {
  open: boolean;
  onEnter: () => void;
  activeExperienceLabel: string;
};

export function hasEnteredGate() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function HeroGate({ open, onEnter, activeExperienceLabel }: HeroGateProps) {
  const { play, enabled } = useSound();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const accentLine = useTransform(pointerX, [0, 100], ["0%", "100%"]);
  const glow = useMotionTemplate`
    radial-gradient(520px circle at ${pointerX}% ${pointerY}%, rgba(212,160,255,0.22), transparent 55%),
    radial-gradient(360px circle at ${100 - pointerX}% ${pointerY}%, rgba(255,83,0,0.16), transparent 60%)
  `;

  const handleEnter = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    play("enter");
    onEnter();
  };

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    pointerX.set(Number.isNaN(x) ? 50 : x);
    pointerY.set(Number.isNaN(y) ? 50 : y);
  };

  const handlePointerLeave = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  const heroMeters = [
    { label: "Shell", value: open ? "Unlocked" : "Awaiting entry" },
    { label: "Experience", value: activeExperienceLabel },
    { label: "Sound", value: enabled ? "HUD ticks on" : "Muted" }
  ];

  return (
    <AnimatePresence>
      {!open ? (
        <motion.section
          className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <GradientBG className="pointer-events-none" />
          <div
            className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.02] px-8 py-14 text-center shadow-glow"
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: glow }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-20 h-24 bg-gradient-to-b from-white/10 to-transparent"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent-purple">
                ØMNILON ACCESS KEY
              </span>
              <h1 className="max-w-3xl text-balance font-grotesk text-[56px] font-bold leading-[1]">
                Interiors. Asset Fortification. Tattoos. Financing.
              </h1>
              <p className="max-w-xl text-[14px] leading-[1.5] tracking-tightest text-muted">
                Explore the high-contrast surface that houses Ømnilon Interiors, asset
                fortification, the apprentice tattoo studio, and consumer financing powered by
                America&apos;s First Finance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  type="button"
                  className="group relative overflow-hidden rounded-full border border-white/30 bg-white px-8 py-3 font-mono text-[10px] uppercase tracking-[0.36em] text-black transition duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnter}
                >
                  <span className="relative z-10">Enter Ømnilon</span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 z-0 bg-gradient-to-r from-black/10 via-white/50 to-black/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  />
                </motion.button>
                <span className="text-xs text-muted">Gate unlocks the brand shell UI</span>
              </div>
            </div>

            <div className="relative z-10 mt-2 w-full rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
                <span>Live HUD status</span>
                <motion.span
                  className="flex items-center gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="h-2 w-2 rounded-full bg-accent-purple shadow-glow" aria-hidden />
                  <span>{open ? "Interactive" : "Standby"}</span>
                </motion.span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {heroMeters.map((meter) => (
                  <motion.div
                    key={meter.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                      {meter.label}
                    </p>
                    <p className="text-sm font-semibold text-white">{meter.value}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-4 bottom-4 h-px rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                style={{ backgroundPositionX: accentLine }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
