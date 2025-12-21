import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Overview() {
  const { overview } = omniContent;

  return (
    <Section id="overview">
      <div className="grid gap-12">
        <SectionHeading
          eyebrow={overview.eyebrow}
          title={overview.title}
          subtitle={overview.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {overview.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="glass-panel relative h-full rounded-2xl p-6">
                <div className="absolute left-4 top-4 h-6 w-6 rounded-full border border-white/15" />
                <h3 className="mt-8 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/70">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
