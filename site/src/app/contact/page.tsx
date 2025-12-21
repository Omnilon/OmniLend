import type { Metadata } from "next";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Contact } from "@/components/experience/sections/Contact";
import { FAQ } from "@/components/experience/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start an OmniLend engagement in design, finance, or protection."
};

export default function ContactPage() {
  return (
    <SeoPageShell title="Contact" subtitle="Tell us about your design, finance, or protection goals.">
      <Contact />
      <FAQ />
    </SeoPageShell>
  );
}
