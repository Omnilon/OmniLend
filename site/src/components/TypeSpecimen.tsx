"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TypeSpecimenProps = {
  label: string;
  description: string;
  className?: string;
  sample: string;
  sizeClass: string;
};

export function TypeSpecimen({
  label,
  description,
  className,
  sample,
  sizeClass
}: TypeSpecimenProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-white/10 bg-black/30 p-6",
        className
      )}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-end justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent-purple">
          {label}
        </span>
        <span className="text-xs text-muted">{description}</span>
      </div>
      <p className={cn("font-grotesk", sizeClass)}>{sample}</p>
    </motion.div>
  );
}
