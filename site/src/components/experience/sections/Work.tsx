import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  const { work } = omniContent;

  return (
    <Section id="work">
      <div className="grid gap-12">
        <SectionHeading eyebrow={work.eyebrow} title={work.title} subtitle={work.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {work.cases.map((caseStudy, index) => (
            <Reveal key={caseStudy.title} delay={index * 0.08}>
              <div className="glass-panel flex h-full flex-col gap-4 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white">{caseStudy.title}</h3>
                <p className="text-sm text-white/70">{caseStudy.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-white/60">Outcome: {caseStudy.outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
