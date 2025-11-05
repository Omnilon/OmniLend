"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { SoundToggle } from "./SoundToggle";

const STORAGE_KEY = "omnilend:preloader-seen";

export function hasSeenPreloader() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const controls = useAnimationControls();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1800;

    const tick = () => {
      const elapsed = performance.now() - start;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);
      controls.start({ width: `${nextProgress}%` });
      if (nextProgress >= 100) {
        window.localStorage.setItem(STORAGE_KEY, "true");
        onComplete();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [controls, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 1.9, duration: 0.6 } }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-muted">
          Calibrating SITE_OWNER Shell
        </span>
        <div className="relative h-1 w-64 overflow-hidden rounded-full border border-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-accent-purple"
            initial={{ width: "0%" }}
            animate={controls}
          />
        </div>
        <span className="font-grotesk text-sm text-muted">{progress}%</span>
      </div>
      <SoundToggle />
    </motion.div>
  );
}
