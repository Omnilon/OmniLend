"use client";

import type { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps
} from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
};

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.2 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.2 });

  return (
    <motion.button
      {...props}
      style={reduceMotion ? undefined : { x, y }}
      onMouseMove={(event) => {
        props.onMouseMove?.(event);
        if (reduceMotion) return;

        const rect = event.currentTarget.getBoundingClientRect();
        rawX.set((event.clientX - rect.left - rect.width / 2) * 0.1);
        rawY.set((event.clientY - rect.top - rect.height / 2) * 0.1);
      }}
      onMouseLeave={(event) => {
        props.onMouseLeave?.(event);
        rawX.set(0);
        rawY.set(0);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 border border-[color:var(--division-accent)]/45",
        "bg-[color:var(--division-accent)] px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.28em]",
        "text-black shadow-[0_18px_48px_rgba(0,0,0,0.35)] transition duration-300 hover:brightness-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
