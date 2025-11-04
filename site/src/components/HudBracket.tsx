"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HudBracketProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

const cornerPositions = [
  { key: "tl", className: "left-0 top-0", rotate: 0 },
  { key: "tr", className: "right-0 top-0", rotate: 90 },
  { key: "br", className: "right-0 bottom-0", rotate: 180 },
  { key: "bl", className: "left-0 bottom-0", rotate: 270 }
];

export function HudBracket({ children, className, label }: HudBracketProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative isolate overflow-hidden rounded-lg border border-white/10",
        "bg-white/5 backdrop-blur-sm transition-shadow duration-500 ease-brand",
        className
      )}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
    >
      {label ? (
        <span className="pointer-events-none absolute left-4 top-3 z-20 select-none font-mono text-[10px] uppercase tracking-[0.36em] text-accent-orange">
          {label}
        </span>
      ) : null}
      <div className="relative z-10">{children}</div>
      {cornerPositions.map((corner) => (
        <motion.span
          key={corner.key}
          aria-hidden
          className={cn(
            "pointer-events-none absolute h-8 w-8 border-2 border-accent-purple",
            corner.className,
            prefersReducedMotion ? "opacity-40" : "opacity-0"
          )}
          style={{ rotate: `${corner.rotate}deg`, transformOrigin: "left top" }}
          variants={{
            rest: { scale: 0.6, opacity: prefersReducedMotion ? 0.4 : 0 },
            hover: { scale: 1, opacity: 1 }
          }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        />
      ))}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg border border-white/10"
        variants={{
          rest: { background: "rgba(255,255,255,0.02)", boxShadow: "0 0 0 rgba(0,0,0,0)" },
          hover: {
            background: "rgba(255,255,255,0.05)",
            boxShadow: "0 0 50px rgba(212, 160, 255, 0.12)"
          }
        }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      />
    </motion.div>
  );
}
