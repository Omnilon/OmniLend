"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GradientCardProps = {
  name: string;
  gradientVar: string;
  className?: string;
};

export function GradientCard({ name, gradientVar, className }: GradientCardProps) {
  return (
    <motion.div
      className={cn(
        "group flex h-40 flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-black/20",
        "p-4 transition duration-500 ease-brand",
        className
      )}
      style={{ backgroundImage: `var(${gradientVar})` }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-white/70">
        {name}
      </span>
    </motion.div>
  );
}
