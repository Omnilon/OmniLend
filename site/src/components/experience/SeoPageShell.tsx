import { ReactNode } from "react";
import { ExperienceNav } from "@/components/experience/ExperienceNav";
import { ExperienceFooter } from "@/components/experience/ExperienceFooter";

export function SeoPageShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div id="omnilend-shell" className="relative">
      <div className="omni-backdrop-grid" aria-hidden="true" />
      <ExperienceNav anchorBase="/" />
      <main className="relative z-10 pb-2 pt-24 md:pt-28">
        <section className="scroll-mt-24 py-3 md:scroll-mt-32">
          <div className="omni-page-shell">
            <div className="omni-panel omni-section-panel">
              <p className="omni-chip">OmniLend // Briefing</p>
              <h1 className="mt-4 text-[clamp(2.2rem,8vw,5.4rem)] font-semibold uppercase leading-[0.9] tracking-[0.015em] text-[color:var(--text)]">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)] md:text-lg">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        {children}
      </main>
      <ExperienceFooter />
    </div>
  );
}
