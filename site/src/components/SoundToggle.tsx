"use client";

import { motion } from "framer-motion";
import { useSound } from "@/components/SoundProvider";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();

  const handleClick = () => {
    toggle();
    void play(enabled ? "toggle-off" : "toggle-on");
  };

  return (
    <motion.button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.36em] text-white transition duration-300 ease-brand hover:border-accent-purple hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      onMouseEnter={() => void play("hover")}
      aria-pressed={enabled}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          backgroundColor: enabled
            ? "var(--accent-orange)"
            : "rgba(255,255,255,0.3)"
        }}
      />
      {enabled ? "Sound On" : "Sound Off"}
    </motion.button>
  );
}
