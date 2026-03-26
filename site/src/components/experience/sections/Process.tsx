import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const { process } = omniContent;

  return (
    <Section id="process">
      <div className="grid gap-8">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {process.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <li className="omni-card relative h-full">
                <span className="omni-kicker">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold uppercase leading-snug text-[color:var(--text)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {step.description}
                </p>
                {index < process.steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -right-2 top-1/2 hidden h-[1px] w-4 -translate-y-1/2 bg-[color:var(--line)] xl:block"
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
