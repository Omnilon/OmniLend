import type { Metadata } from "next";
import { omniContent } from "@content/omnilend";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Work } from "@/components/experience/sections/Work";
import { Contact } from "@/components/experience/sections/Contact";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected OmniLend engagements across interiors, asset fortification, tattoos, and financing."
};

export default function WorkPage() {
  return (
    <SeoPageShell title="Work" subtitle={omniContent.work.subtitle}>
      <Work />
      <Contact />
    </SeoPageShell>
  );
}
