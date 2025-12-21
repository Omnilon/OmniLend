import { ReactNode } from "react";
import { ExperienceNav } from "@/components/experience/ExperienceNav";
import { ExperienceFooter } from "@/components/experience/ExperienceFooter";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
      <ExperienceNav anchorBase="/" />
      <main className="relative z-10">
        <section className="px-6 pb-6 pt-28 md:pt-32">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="OmniLend" title={title} subtitle={subtitle} />
          </div>
        </section>
        {children}
      </main>
      <ExperienceFooter />
    </div>
  );
}
