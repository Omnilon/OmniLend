import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const { process } = omniContent;

  return (
    <Section id="process">
      <div className="grid gap-12">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />
        <ol className="grid gap-6 md:grid-cols-5">
          {process.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <li className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/70">{step.description}</p>
                {index < process.steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-[1px] w-6 -translate-y-1/2 bg-white/20 md:block"
                  />
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
