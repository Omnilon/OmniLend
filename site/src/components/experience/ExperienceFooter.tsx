import Link from "next/link";
import { omniContent } from "@content/omnilend";

export function ExperienceFooter() {
  return (
    <footer className="relative z-10 pb-6 pt-2">
      <div className="omni-page-shell">
        <div className="omni-panel omni-footer-panel">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="omni-chip">OmniLend // Closeout</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                {omniContent.site.tagline} Centralized intake for spaces, financing, and protection.
              </p>
              <a
                href={`mailto:${omniContent.contact.email}`}
                className="mt-3 inline-flex text-sm font-medium text-[color:var(--text)] transition hover:text-[color:var(--muted)]"
              >
                {omniContent.contact.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/" className="omni-nav-link">
                Home
              </Link>
              <Link href="/services" className="omni-nav-link">
                Services
              </Link>
              <Link href="/process" className="omni-nav-link">
                Process
              </Link>
              <Link href="/about" className="omni-nav-link">
                About
              </Link>
              <Link href="/contact" className="omni-nav-link">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
