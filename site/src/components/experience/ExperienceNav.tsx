import Link from "next/link";
import { omniContent } from "@content/omnilend";
import { cn } from "@/lib/utils";

export function ExperienceNav({ anchorBase = "" }: { anchorBase?: string }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0b11]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href={anchorBase ? `${anchorBase}#hero` : "#hero"}
          className="font-mono text-[11px] uppercase tracking-[0.4em]"
        >
          OMNILEND
        </Link>
        <nav
          aria-label="Primary"
          className="flex max-w-full items-center gap-4 overflow-x-auto text-xs text-white/70"
        >
          {omniContent.nav.map((item) => {
            const href = item.href.startsWith("#")
              ? `${anchorBase}${item.href}`
              : item.href;
            return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "whitespace-nowrap border-b border-transparent pb-1 transition",
                "hover:border-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              )}
            >
              {item.label}
            </Link>
          );
          })}
        </nav>
      </div>
    </div>
  );
}
