import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { contact } = omniContent;

  return (
    <Section id="contact" className="pb-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle} />
        <Reveal>
          <div className="glass-panel flex h-full flex-col gap-6 rounded-2xl p-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                Contact channel
              </p>
              <p className="mt-2 text-sm text-white/80">hello@omnilend.pro</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                Availability
              </p>
              <p className="mt-2 text-sm text-white/70">New engagements accepted quarterly.</p>
            </div>
            <div className="mt-auto space-y-3">
              <ButtonLink href="mailto:hello@omnilend.pro" size="lg">
                {contact.ctaLabel}
              </ButtonLink>
              <p className="text-xs text-white/50">{contact.ctaNote}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
