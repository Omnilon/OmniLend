"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";

type Props = {
  label: string;
  position?: Position;
  onClick?: () => void;
  icon?: ReactNode;
};

const positionStyles: Record<Position, string> = {
  "bottom-right": "right-4 bottom-4",
  "bottom-left": "left-4 bottom-4",
  "top-right": "right-4 top-24",
  "top-left": "left-4 top-24"
};

export function CornerHudBadge({ label, position = "bottom-right", onClick, icon }: Props) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "fixed z-30 inline-flex items-center gap-2 rounded-xl border border-accent-green/50 bg-black/70 px-4 py-3 text-[11px] font-mono uppercase tracking-[0.3em] text-white shadow-[0_0_20px_rgba(110,200,92,0.25)] backdrop-blur",
        positionStyles[position]
      )}
    >
      <span className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_10px_rgba(110,200,92,0.7)]" />
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
