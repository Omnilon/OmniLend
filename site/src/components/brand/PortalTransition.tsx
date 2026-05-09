"use client";

import type { CSSProperties } from "react";
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
      className="portal-transition fixed inset-0 z-[120] overflow-hidden bg-black"
      style={{ "--portal-accent": accentColor, "--portal-origin": point } as CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="portal-transition__aperture"
        initial={{ clipPath: "inset(48% 42% 48% 42%)", filter: "blur(10px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)" }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="portal-transition__slab portal-transition__slab--top"
        initial={{ y: "-105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="portal-transition__slab portal-transition__slab--bottom"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="portal-transition__sweep"
        initial={{ x: "-130%", skewX: -16 }}
        animate={{ x: "155%", skewX: -16 }}
        transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="portal-transition__thread portal-transition__thread--a"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="portal-transition__thread portal-transition__thread--b"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="portal-transition__label">
        Opening {label}
      </div>
    </motion.div>
  );
}
