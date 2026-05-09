import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HudFrame({
  children,
  className,
  label
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/12 bg-white/[0.035] backdrop-blur-xl",
        "shadow-[0_24px_90px_rgba(0,0,0,0.38)]",
        className
      )}
    >
      {label ? (
        <span className="absolute left-5 top-4 z-10 font-mono text-[0.58rem] uppercase tracking-[0.32em] text-white/35">
          {label}
        </span>
      ) : null}
      <span className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t border-[color:var(--division-accent)]/75" />
      <span className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r border-t border-[color:var(--division-accent)]/75" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b border-l border-[color:var(--division-accent)]/75" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b border-r border-[color:var(--division-accent)]/75" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
