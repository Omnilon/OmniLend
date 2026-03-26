import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  const { work } = omniContent;

  return (
    <Section id="work">
      <div className="grid gap-8">
        <SectionHeading eyebrow={work.eyebrow} title={work.title} subtitle={work.subtitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {work.cases.map((caseStudy, index) => (
            <Reveal key={caseStudy.title} delay={index * 0.08}>
              <div className="omni-card flex h-full flex-col gap-4">
                <p className="omni-kicker">Case-{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-lg font-semibold uppercase leading-snug text-[color:var(--text)]">
                  {caseStudy.title}
                </h3>
                <p className="text-sm leading-6 text-[color:var(--muted)]">
                  {caseStudy.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center border border-[color:var(--line)] bg-white/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs leading-5 text-[color:var(--muted)]">
                  Outcome: {caseStudy.outcome}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
