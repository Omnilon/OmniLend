import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const { faq } = omniContent;

  return (
    <Section id="faq">
      <div className="grid gap-8">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
        <div className="grid gap-4">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="group omni-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.02em] text-[color:var(--text)] focus-visible:outline-none">
                  {item.question}
                  <span className="ml-4 text-xl leading-none text-[color:var(--text)] transition duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
