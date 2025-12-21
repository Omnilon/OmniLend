import type { Metadata } from "next";
import { omniContent } from "@content/omnilend";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Process } from "@/components/experience/sections/Process";
import { Contact } from "@/components/experience/sections/Contact";

export const metadata: Metadata = {
  title: "Process",
  description: "Understand the OmniLend operating rhythm from intake to optimization."
};

export default function ProcessPage() {
  return (
    <SeoPageShell title="Process" subtitle={omniContent.process.subtitle}>
      <Process />
      <Contact />
    </SeoPageShell>
  );
}
