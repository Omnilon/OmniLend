import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Trust() {
  const { trust } = omniContent;

  return (
    <Section id="trust">
      <div className="grid gap-8">
        <SectionHeading eyebrow={trust.eyebrow} title={trust.title} subtitle={trust.subtitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {trust.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="omni-card h-full">
                <p className="omni-kicker">Guard-{String(index + 1).padStart(2, "0")}</p>
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
