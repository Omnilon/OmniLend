"use client";

import Link from "next/link";
import { useState } from "react";
import { omniContent } from "@content/omnilend";
import { cn } from "@/lib/utils";

export function ExperienceNav({ anchorBase = "" }: { anchorBase?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const brandHref = anchorBase ? `${anchorBase}#hero` : "#hero";

  return (
    <header className="fixed inset-x-0 top-3 z-50">
      <div className="omni-header-shell">
        <div className="omni-panel omni-header-panel">
          <div className="flex flex-wrap items-start gap-4 lg:items-center">
            <Link href={brandHref} className="omni-brand mr-auto" onClick={() => setIsOpen(false)}>
              <span className="omni-brand-main">{omniContent.site.name}</span>
              <span className="omni-brand-sub">Integrated Systems</span>
            </Link>
            <button
              type="button"
              className="omni-menu-toggle lg:hidden"
              aria-expanded={isOpen}
              aria-controls="omnilend-nav"
              onClick={() => setIsOpen((value) => !value)}
            >
              Menu
            </button>
            <nav
              id="omnilend-nav"
              aria-label="Primary"
              className={cn(
                "w-full flex-col gap-2 lg:flex lg:w-auto lg:flex-row lg:flex-wrap lg:items-center lg:justify-end",
                isOpen ? "flex" : "hidden"
              )}
            >
              {omniContent.nav.map((item) => {
                const href = item.href.startsWith("#") ? `${anchorBase}${item.href}` : item.href;

                return (
                  <Link
                    key={item.href}
                    href={href}
                    className="omni-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
