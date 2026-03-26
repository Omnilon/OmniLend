import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Proof() {
  const { proof } = omniContent;

  return (
    <Section id="proof">
      <div className="grid gap-8">
        <SectionHeading eyebrow={proof.eyebrow} title={proof.title} subtitle={proof.subtitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {proof.metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.1}>
              <div className="omni-card">
                <p className="omni-kicker">Signal</p>
                <p className="mt-3 text-4xl font-semibold text-[color:var(--text)]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">{metric.label}</p>
                {metric.note ? (
                  <p className="mt-2 text-xs text-[color:var(--muted)]">{metric.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {proof.testimonials.map((testimonial) => (
              <Reveal key={testimonial.name}>
                <div className="omni-card">
                  <p className="omni-kicker">Reference</p>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--text)]">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-4 text-xs text-[color:var(--muted)]">
                    <span className="font-semibold text-[color:var(--text)]">
                      {testimonial.name}
                    </span>{" "}
                    · {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="omni-console flex h-full flex-col justify-center gap-4">
              <p className="omni-kicker">Trusted by</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {proof.logos.map((logo) => (
                  <div
                    key={logo}
                    className="omni-card text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--text)]"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
