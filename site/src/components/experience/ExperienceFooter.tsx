import Link from "next/link";
import { omniContent } from "@content/omnilend";

export function ExperienceFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-10 text-sm text-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/70">
            OMNILEND
          </p>
          <p className="mt-2 text-xs text-white/50">{omniContent.site.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/process" className="hover:text-white">
            Process
          </Link>
          <Link href="/work" className="hover:text-white">
            Work
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
