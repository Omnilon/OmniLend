import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-grid gap-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        className
      )}
      aria-label="Open OmniLend gateway"
    >
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.42em] text-white/45">
        OmniLend.pro
      </span>
      <span className="font-sans text-[1.02rem] font-semibold uppercase tracking-[0.2em] text-white transition group-hover:text-white/80">
        ØMNILON
      </span>
    </Link>
  );
}
