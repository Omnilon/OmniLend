"use client";

import { motion } from "framer-motion";
import { useSound } from "@/components/SoundProvider";
import { cn } from "@/lib/utils";

export function HudSoundToggle({ className }: { className?: string }) {
  const { enabled, toggle, play } = useSound();

  const handleClick = () => {
    toggle();
    void play(enabled ? "toggle-off" : "toggle-on");
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => void play("hover")}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5",
        "font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 transition",
        "hover:border-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      aria-pressed={enabled}
      aria-label={enabled ? "Disable sound" : "Enable sound"}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          enabled ? "bg-accent shadow-[0_0_10px_rgba(155,107,255,0.6)]" : "bg-white/30"
        )}
      />
      {enabled ? "Sound On" : "Sound Off"}
    </motion.button>
  );
}
