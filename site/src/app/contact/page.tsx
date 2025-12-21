import type { Metadata } from "next";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Contact } from "@/components/experience/sections/Contact";
import { FAQ } from "@/components/experience/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact | OmniLend",
  description: "Start a lending experience engagement with OmniLend."
};

export default function ContactPage() {
  return (
    <SeoPageShell title="Contact" subtitle="Tell us about your lending platform and goals.">
      <Contact />
      <FAQ />
    </SeoPageShell>
  );
}
