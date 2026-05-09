"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PortalTransition({
  active,
  accentColor,
  label,
  origin
}: {
  active: boolean;
  accentColor: string;
  label: string;
  origin?: { x: number; y: number } | null;
}) {
  const reduceMotion = useReducedMotion();

  if (!active || reduceMotion) {
    return null;
  }

  const point = origin ? `${origin.x}px ${origin.y}px` : "50% 50%";

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[120] overflow-hidden bg-black"
      initial={{ clipPath: `circle(0px at ${point})`, opacity: 0.88 }}
      animate={{ clipPath: `circle(150vmax at ${point})`, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${point}, ${accentColor} 0%, rgba(255,255,255,0.18) 16%, rgba(0,0,0,0.94) 50%)`
        }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 w-1/3 bg-white/12 blur-2xl"
        initial={{ x: "-120%" }}
        animate={{ x: "360%" }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
      <div className="absolute bottom-8 left-8 font-mono text-[0.62rem] uppercase tracking-[0.42em] text-white/65">
        Opening {label}
      </div>
    </motion.div>
  );
}
