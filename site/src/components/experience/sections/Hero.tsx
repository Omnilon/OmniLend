import Link from "next/link";
import { getServiceHref, omniContent } from "@content/omnilend";

export function Hero() {
  const { site, services, contact } = omniContent;
  const statusRows = [
    {
      label: "Operating lanes",
      value: String(services.items.length).padStart(2, "0")
    },
    {
      label: "Response window",
      value: contact.ctaNote
    },
    {
      label: "Availability",
      value: contact.availability
    }
  ];

  return (
    <section id="hero" className="scroll-mt-24 py-3 md:scroll-mt-32">
      <div className="omni-page-shell">
        <div className="omni-panel omni-section-panel">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="omni-chip">{site.heroLabel}</p>
              <h1 className="mt-4 text-[clamp(2.6rem,9vw,6.8rem)] font-semibold uppercase leading-[0.88] tracking-[0.015em] text-[color:var(--text)]">
                {site.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--muted)] md:text-lg">
                {site.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/services" className="omni-button omni-button--primary">
                  {site.heroCtaPrimary}
                </Link>
                <Link href="/contact" className="omni-button omni-button--ghost">
                  {site.heroCtaSecondary}
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {site.heroHighlights.map((item, index) => (
                  <div key={item} className="omni-card flex items-center gap-3 p-4">
                    <span className="omni-kicker">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-sm text-[color:var(--text)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="grid gap-4">
              <div className="omni-console">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="omni-chip">Operations Ledger</p>
                    <h2 className="mt-4 text-2xl font-semibold uppercase leading-tight text-[color:var(--text)] md:text-[2rem]">
                      Engagement console ready for intake.
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    <span className="omni-status-dot" />
                    Live
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {statusRows.map((row) => (
                    <div
                      key={row.label}
                      className="omni-meta-row border-b border-[color:var(--line)] pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[color:var(--muted)]">{row.label}</span>
                      <span className="text-right text-[color:var(--text)]">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="omni-card">
                    <p className="omni-kicker">Next step</p>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--text)]">
                      Start with the service page that matches your lane. Each one now carries its
                      own scope, deliverables, and booking path.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {services.items.map((service) => (
                        <Link
                          key={service.id}
                          href={getServiceHref(service)}
                          className="omni-nav-link"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="scan-lines absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="omni-card">
                  <p className="omni-kicker">Direct line</p>
                  <p className="mt-3 text-sm font-semibold text-[color:var(--text)]">
                    {contact.email}
                  </p>
                  <p className="mt-2 text-xs text-[color:var(--muted)]">{contact.phone}</p>
                </div>
                <div className="omni-card">
                  <p className="omni-kicker">Focus</p>
                  <p className="mt-3 text-sm font-semibold text-[color:var(--text)]">
                    {site.tagline}
                  </p>
                  <p className="mt-2 text-xs text-[color:var(--muted)]">
                    Use the homepage as a gateway, not the full brief.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
