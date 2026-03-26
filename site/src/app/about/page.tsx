import type { Metadata } from "next";
import { omniContent } from "@content/omnilend";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Overview } from "@/components/experience/sections/Overview";
import { Proof } from "@/components/experience/sections/Proof";
import { Trust } from "@/components/experience/sections/Trust";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how OmniLend combines interiors, asset fortification, tattoos, and consumer financing."
};

export default function AboutPage() {
  return (
    <SeoPageShell title="About OmniLend" subtitle={omniContent.overview.subtitle}>
      <Overview />
      <Proof />
      <Trust />
    </SeoPageShell>
  );
}
