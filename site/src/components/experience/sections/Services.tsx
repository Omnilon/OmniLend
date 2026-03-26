import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  const { services } = omniContent;

  return (
    <Section id="services">
      <div className="grid gap-8">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {services.items.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08}>
              <article className="omni-card flex h-full flex-col">
                <p className="omni-kicker">SVC-{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl font-semibold uppercase leading-snug text-[color:var(--text)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {service.summary}
                </p>
                <p className="mt-4 text-sm leading-6 text-[color:var(--text)]">
                  {service.description}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="omni-kicker">Outcomes</p>
                    <ul className="mt-3 space-y-2">
                      {service.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2 text-sm leading-6 text-[color:var(--muted)]"
                        >
                          <span className="mt-[0.55rem] h-[5px] w-[5px] rounded-full bg-[color:var(--text)]" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="omni-kicker">Deliverables</p>
                    <ul className="mt-3 space-y-2">
                      {service.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-start gap-2 text-sm leading-6 text-[color:var(--muted)]"
                        >
                          <span className="mt-[0.55rem] h-[5px] w-[5px] rounded-full bg-[color:var(--text)]" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-5 border-t border-[color:var(--line)] pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {service.pricing}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
