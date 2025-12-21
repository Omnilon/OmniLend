import type { Metadata } from "next";
import { omniContent } from "@content/omnilend";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Services } from "@/components/experience/sections/Services";
import { Contact } from "@/components/experience/sections/Contact";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore OmniLend interior design, finance, and asset protection services."
};

export default function ServicesPage() {
  return (
    <SeoPageShell title="Services" subtitle={omniContent.services.subtitle}>
      <Services />
      <Contact />
    </SeoPageShell>
  );
}
