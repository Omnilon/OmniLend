import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById, getServiceHref, omniContent, serviceItems } from "@content/omnilend";
import { SeoPageShell } from "@/components/experience/SeoPageShell";
import { Section } from "@/components/ui/Section";

type ServiceRouteProps = {
  params: {
    serviceId: string;
  };
};

export function generateStaticParams() {
  return serviceItems.map((service) => ({ serviceId: service.id }));
}

export function generateMetadata({ params }: ServiceRouteProps): Metadata {
  const service = getServiceById(params.serviceId);

  if (!service) {
    return {
      title: "Service",
      description: omniContent.site.description
    };
  }

  return {
    title: service.title,
    description: service.summary
  };
}

export default function ServicePage({ params }: ServiceRouteProps) {
  const service = getServiceById(params.serviceId);

  if (!service) {
    notFound();
  }

  const relatedServices = serviceItems.filter((item) => item.id !== service.id);

  return (
    <SeoPageShell title={service.title} subtitle={service.summary}>
      <Section id={`service-${service.id}`}>
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="grid gap-4">
            <div className="omni-card">
              <p className="omni-kicker">Service overview</p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text)]">
                {service.description}
              </p>
              <p className="mt-5 border-t border-[color:var(--line)] pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {service.pricing}
              </p>
            </div>

            <div className="omni-card">
              <p className="omni-kicker">Booking</p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                Start through the contact page and note this service in your message so intake can
                route you correctly.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="omni-button omni-button--primary">
                  Start contact
                </Link>
                <a
                  href={`mailto:${omniContent.contact.email}`}
                  className="omni-button omni-button--ghost"
                >
                  Email direct
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="omni-card">
              <p className="omni-kicker">Outcomes</p>
              <ul className="mt-4 space-y-3">
                {service.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-3 text-sm leading-7 text-[color:var(--muted)]"
                  >
                    <span className="mt-[0.75rem] h-[5px] w-[5px] rounded-full bg-[color:var(--text)]" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="omni-card">
              <p className="omni-kicker">Deliverables</p>
              <ul className="mt-4 space-y-3">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-start gap-3 text-sm leading-7 text-[color:var(--muted)]"
                  >
                    <span className="mt-[0.75rem] h-[5px] w-[5px] rounded-full bg-[color:var(--text)]" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="related-services">
        <div className="grid gap-8">
          <div>
            <p className="omni-chip">Other lanes</p>
            <h2 className="mt-4 text-[clamp(1.9rem,5vw,3.8rem)] font-semibold uppercase leading-[0.92] tracking-[0.015em] text-[color:var(--text)]">
              Browse the other service pages.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {relatedServices.map((item) => (
              <article key={item.id} className="omni-card flex h-full flex-col">
                <p className="omni-kicker">{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{item.summary}</p>
                <Link href={getServiceHref(item)} className="omni-button omni-button--ghost mt-6">
                  Open page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </SeoPageShell>
  );
}
