import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Trust() {
  const { trust } = omniContent;

  return (
    <Section id="trust">
      <div className="grid gap-12">
        <SectionHeading
          eyebrow={trust.eyebrow}
          title={trust.title}
          subtitle={trust.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {trust.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="glass-panel relative h-full rounded-2xl p-6">
                <div className="absolute left-5 top-5 h-8 w-8 rounded-full border border-white/10 bg-white/5" />
                <h3 className="mt-10 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/70">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
