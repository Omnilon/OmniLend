"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PaletteItem = {
  name: string;
  hex: string;
  foreground?: string;
  description?: string;
};

type PaletteGridProps = {
  items: PaletteItem[];
  className?: string;
};

export function PaletteGrid({ items, className }: PaletteGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {items.map((item) => (
        <motion.article
          key={item.hex}
          className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[rgba(255,255,255,0.02)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="h-24"
            style={{ backgroundColor: item.hex }}
            aria-hidden
          />
          <div className="flex flex-1 flex-col gap-2 p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-muted">
              {item.name}
            </span>
            <p className="font-grotesk text-sm text-white">{item.hex}</p>
            <p className="text-xs text-muted">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
