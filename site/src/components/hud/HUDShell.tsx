"use client";

import { useEffect, useMemo, useState } from "react";
import type { SectionNav } from "@content/omnilend";
import { useSectionObserver } from "@/lib/useSectionObserver";
import { MiniMap } from "./MiniMap";
import { HudSoundToggle } from "./SoundToggle";
import { cn } from "@/lib/utils";

const corners = [
  "left-6 top-6 border-l border-t",
  "right-6 top-6 border-r border-t",
  "right-6 bottom-6 border-r border-b",
  "left-6 bottom-6 border-l border-b"
];

export function HUDShell({ sections }: { sections: SectionNav[] }) {
  const activeId = useSectionObserver(sections.map((section) => section.id));
  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeId) ?? sections[0],
    [activeId, sections]
  );
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const progressIndex = Math.max(0, sections.findIndex((s) => s.id === activeId));
  const progress = ((progressIndex + 1) / sections.length) * 100;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
        {corners.map((corner) => (
          <span
            key={corner}
            aria-hidden
            className={cn(
              "absolute h-8 w-8 border-white/25",
              corner,
              "shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            )}
          />
        ))}
        <div className="pointer-events-auto absolute left-6 top-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.36em] text-white/60">
          <span className="inline-flex h-2 w-2 rounded-full bg-accent/80 shadow-[0_0_10px_rgba(155,107,255,0.6)]" />
          OMNILEND // SYSTEM
        </div>
        <div className="pointer-events-auto absolute right-6 top-6 flex items-center gap-4">
          <div className="text-right font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            {formattedTime}
          </div>
          <HudSoundToggle />
        </div>
        <div className="pointer-events-none absolute left-6 top-14 h-[1px] w-40 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[3.5rem] h-[1px] w-40 bg-accent/40" />
        <div className="pointer-events-none absolute left-6 top-[3.65rem] h-[2px] w-32 bg-accent/10" />
        <div className="pointer-events-none absolute left-6 top-16 h-[2px] w-32 bg-white/5" />
        <div className="pointer-events-none absolute left-6 top-[4.6rem] h-[2px] w-24 bg-white/5" />
        <div className="pointer-events-none absolute left-6 top-[5.2rem] h-[1px] w-20 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[5.7rem] h-[1px] w-16 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[6.2rem] h-[1px] w-12 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[6.7rem] h-[1px] w-8 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[7.2rem] h-[1px] w-6 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[7.7rem] h-[1px] w-4 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[8.2rem] h-[1px] w-2 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-[8.7rem] h-[1px] w-1 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-20 h-[2px] w-28 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-24 h-[2px] w-12 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-28 h-[2px] w-20 bg-white/10" />
        <div className="pointer-events-none absolute left-6 top-32 h-[1px] w-36 bg-white/5" />
        <div className="pointer-events-none absolute left-6 top-36 h-[1px] w-10 bg-white/5" />
        <div className="pointer-events-auto absolute left-6 bottom-6 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            {activeSection?.mode}
          </span>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="pointer-events-auto absolute right-6 bottom-6">
          <MiniMap sections={sections} activeId={activeId} />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-40 md:hidden">
        <div className="pointer-events-auto absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          <span className="h-2 w-2 rounded-full bg-accent/70" />
          OMNILEND
        </div>
        <div className="pointer-events-auto absolute right-4 top-4">
          <HudSoundToggle className="text-[9px]" />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
          {activeSection?.label}
        </div>
      </div>
    </>
  );
}
