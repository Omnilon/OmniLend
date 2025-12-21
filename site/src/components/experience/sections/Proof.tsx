import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Proof() {
  const { proof } = omniContent;

  return (
    <Section id="proof">
      <div className="grid gap-12">
        <SectionHeading
          eyebrow={proof.eyebrow}
          title={proof.title}
          subtitle={proof.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {proof.metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.1}>
              <div className="glass-panel rounded-2xl p-6">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm text-white/70">{metric.label}</p>
                {metric.note ? (
                  <p className="mt-2 text-xs text-white/40">{metric.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {proof.testimonials.map((testimonial) => (
              <Reveal key={testimonial.name}>
                <div className="glass-panel rounded-2xl p-6">
                  <p className="text-sm text-white/80">“{testimonial.quote}”</p>
                  <div className="mt-4 text-xs text-white/60">
                    <span className="font-semibold text-white">{testimonial.name}</span> ·
                    {" "}
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="glass-panel flex h-full flex-col justify-center gap-4 rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
                Trusted by
              </p>
              <div className="grid gap-3">
                {proof.logos.map((logo) => (
                  <div key={logo} className="text-sm uppercase tracking-[0.2em] text-white/60">
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
