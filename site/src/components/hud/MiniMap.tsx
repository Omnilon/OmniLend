"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { SectionNav } from "@content/omnilend";

export function MiniMap({
  sections,
  activeId,
  className
}: {
  sections: SectionNav[];
  activeId: string;
  className?: string;
}) {
  const handleClick = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  }, []);

  const active = sections.find((section) => section.id === activeId) ?? sections[0];

  return (
    <div className={cn("glass-panel rounded-2xl px-4 py-3 text-xs", className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
        Mini map
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{active?.label}</p>
      <div className="mt-4 flex flex-col gap-2">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <button
              key={section.id}
              type="button"
              aria-label={`Scroll to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
              className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              onClick={() => handleClick(section.id)}
            >
              <span
                className={cn(
                  "relative flex h-2.5 w-2.5 items-center justify-center rounded-full border",
                  isActive
                    ? "border-accent bg-accent/60 shadow-[0_0_12px_rgba(155,107,255,0.6)]"
                    : "border-white/20 bg-white/5"
                )}
              >
                <span
                  className={cn(
                    "absolute h-4 w-4 rounded-full border border-white/10 opacity-0",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              </span>
              <span className={cn("text-xs", isActive ? "text-white" : "text-white/50")}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
