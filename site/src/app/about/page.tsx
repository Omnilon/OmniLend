import type { Metadata } from "next";
import { omniContent } from "@content/omnilend";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Overview } from "@/components/experience/sections/Overview";
import { Trust } from "@/components/experience/sections/Trust";
import { Contact } from "@/components/experience/sections/Contact";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how OmniLend integrates design, finance, and protection."
};

export default function AboutPage() {
  return (
    <SeoPageShell title="About OmniLend" subtitle={omniContent.overview.subtitle}>
      <Overview />
      <Trust />
      <Contact />
    </SeoPageShell>
  );
}
