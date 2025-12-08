"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HudCardProps = {
  title: string;
  body: ReactNode;
  label?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  onClose?: () => void;
  show?: boolean;
};

const positionMap: Record<
  NonNullable<HudCardProps["position"]>,
  string
> = {
  "top-left": "left-4 top-20",
  "top-right": "right-4 top-20",
  "bottom-left": "left-4 bottom-4",
  "bottom-right": "right-4 bottom-4"
};

export function HudCard({
  title,
  body,
  label,
  position = "top-left",
  onClose,
  show = true
}: HudCardProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -6 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "pointer-events-auto fixed z-40 min-w-[240px] max-w-sm rounded-2xl border border-white/20 bg-black/60 p-4 shadow-glow backdrop-blur-md",
            positionMap[position]
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-accent-orange shadow-[0_0_12px_rgba(255,83,0,0.4)]" />
              {label ? (
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/60">
                  {label}
                </span>
              ) : null}
            </div>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-md border border-white/15 bg-white/5 text-xs text-white/70 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                aria-label="Close HUD card"
              >
                ×
              </button>
            ) : null}
          </div>
          <div className="mt-3 space-y-2 text-left">
            <h4 className="font-grotesk text-lg font-semibold text-white">{title}</h4>
            <p className="text-sm text-muted">{body}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
