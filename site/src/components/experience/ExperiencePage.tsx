import { ExperienceNav } from "@/components/experience/ExperienceNav";
import { ExperienceFooter } from "@/components/experience/ExperienceFooter";
import { Hero } from "@/components/experience/sections/Hero";
import { Overview } from "@/components/experience/sections/Overview";
import { Services } from "@/components/experience/sections/Services";
import { Process } from "@/components/experience/sections/Process";
import { Contact } from "@/components/experience/sections/Contact";

export function ExperiencePage() {
  return (
    <div id="omnilend-shell" className="relative">
      <div className="omni-backdrop-grid" aria-hidden="true" />
      <ExperienceNav />
      <main className="relative z-10 pb-2 pt-24 md:pt-28">
        <Hero />
        <Overview />
        <Services />
        <Process />
        <Contact showLaneCards={false} />
      </main>
      <ExperienceFooter />
    </div>
  );
}
