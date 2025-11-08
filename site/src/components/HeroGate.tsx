"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSound } from "./SoundProvider";
import { GradientBG } from "./GradientBG";

const STORAGE_KEY = "omnilend:hero-entered";

type HeroGateProps = {
  open: boolean;
  onEnter: () => void;
};

export function hasEnteredGate() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function HeroGate({ open, onEnter }: HeroGateProps) {
  const { play } = useSound();

  const handleEnter = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    play("enter");
    onEnter();
  };

  return (
    <AnimatePresence>
      {!open ? (
        <motion.section
          className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <GradientBG className="pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent-purple">
            ØMNILON ACCESS KEY
          </span>
          <h1 className="max-w-3xl text-balance font-grotesk text-[56px] font-bold leading-[1]">
            Interiors. Secret Lifters. Ink. One shell.
          </h1>
          <p className="max-w-xl text-[14px] leading-[1.5] tracking-tightest text-muted">
            Explore the high-contrast surface that houses Ømnilon Interiors, covert asset-protection
            engagements, and the apprentice tattoo studio—three disciplines, one disciplined system.
          </p>
          <motion.button
            type="button"
            className="rounded-full border border-white/20 bg-white/10 px-8 py-3 font-mono text-[10px] uppercase tracking-[0.36em] text-white transition duration-300 ease-brand hover:border-accent-orange hover:text-accent-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEnter}
          >
            Enter Ømnilon
          </motion.button>
        </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
