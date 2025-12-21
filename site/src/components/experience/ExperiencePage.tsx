import { omniContent } from "@content/omnilend";
import { GatewayOverlay } from "@/components/gateway/GatewayOverlay";
import { HUDShell } from "@/components/hud/HUDShell";
import { ExperienceNav } from "@/components/experience/ExperienceNav";
import { ExperienceFooter } from "@/components/experience/ExperienceFooter";
import { Hero } from "@/components/experience/sections/Hero";
import { Overview } from "@/components/experience/sections/Overview";
import { Services } from "@/components/experience/sections/Services";
import { Process } from "@/components/experience/sections/Process";
import { Proof } from "@/components/experience/sections/Proof";
import { Work } from "@/components/experience/sections/Work";
import { Trust } from "@/components/experience/sections/Trust";
import { FAQ } from "@/components/experience/sections/FAQ";
import { Contact } from "@/components/experience/sections/Contact";

export function ExperiencePage() {
  return (
    <div id="omnilend-shell" className="relative">
      <GatewayOverlay />
      <HUDShell sections={omniContent.sections} />
      <ExperienceNav />
      <main className="relative z-10">
        <Hero />
        <Overview />
        <Services />
        <Process />
        <Proof />
        <Work />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <ExperienceFooter />
    </div>
  );
}
