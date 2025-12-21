import { omniContent } from "@content/omnilend";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const { faq } = omniContent;

  return (
    <Section id="faq">
      <div className="grid gap-12">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
        <div className="grid gap-4">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="group rounded-2xl border border-white/10 bg-white/5 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  {item.question}
                  <span className="ml-4 text-accent transition duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-white/70">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
