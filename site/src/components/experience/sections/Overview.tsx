import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Overview() {
  const { overview } = omniContent;

  return (
    <Section id="overview">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <SectionHeading
          eyebrow={overview.eyebrow}
          title={overview.title}
          subtitle={overview.subtitle}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {overview.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="omni-card h-full">
                <p className="omni-kicker">SYS-{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-lg font-semibold uppercase leading-snug text-[color:var(--text)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
