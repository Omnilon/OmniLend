"use client";

/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Radio,
  ShieldCheck
} from "lucide-react";
import { divisions, type Division, type DivisionKey } from "@/content/divisions";
import { DivisionLink } from "./DivisionLink";
import { LeadCaptureForm } from "./LeadCaptureForm";

const routeBySlug: Record<DivisionKey, string> = {
  interiors: "/interiors",
  "asset-fortification": "/asset-fortification",
  finance: "/finance"
};

const divisionAssets = {
  interiors: {
    hero: "/assets/divisions/interiors/interior-hero.webp",
    detail: "/assets/divisions/interiors/interior-detail.avif",
    videoFrame: "/assets/divisions/interiors/68414b36c5bc5cd43e314e77_Videoframe.webp"
  },
  finance: {
    hero: "/assets/divisions/finance/finance-hero.webp",
    panel: "/assets/divisions/finance/finance-panel.webp",
    flow: "/assets/divisions/finance/finance-flow.webp",
    thumbs: [
      "/assets/divisions/finance/Makhno_Thumbnail_e6008952f7.webp",
      "/assets/divisions/finance/Source_Unknown_Thumbnail_7e7a08561b.webp",
      "/assets/divisions/finance/Eminente_Thumbnail_d7767e1666.webp",
      "/assets/divisions/finance/Grids_Thumbnail_674aa5712c.webp",
      "/assets/divisions/finance/Glyphic_Biotechnologies_Thumbnail_50ecd8bb9a.webp",
      "/assets/divisions/finance/Peter_Thumbnail_bee0ce3a78.webp"
    ]
  }
};

const assetIcons = [Camera, LockKeyhole, ShieldCheck, Radio, FileText, CheckCircle2];

function AnimatedPage({
  children,
  className,
  style
}: {
  children: ReactNode;
  className: string;
  style?: CSSProperties;
}) {
  return (
    <main className={`${className} world-page-enter`} style={style}>
      {children}
    </main>
  );
}

function CrossDivisionLinks({
  division,
  variant
}: {
  division: Division;
  variant: "interiors" | "finance" | "asset";
}) {
  return (
    <div className={`division-portals division-portals--${variant}`}>
      {division.crossLinks.map((slug) => {
        const target = divisions[slug];

        return (
          <DivisionLink
            key={target.slug}
            href={routeBySlug[target.slug]}
            label={target.shortName}
            accentColor={target.accentColor}
            className={`division-portal division-portal--${variant}`}
          >
            <span>{target.shortName}</span>
            <ArrowUpRight className="h-4 w-4" />
          </DivisionLink>
        );
      })}
    </div>
  );
}

function InteriorsWorld({ division }: { division: Division }) {
  return (
    <AnimatedPage
      className="interiors-world"
      style={{ "--division-accent": division.accentColor } as CSSProperties}
    >
      <header className="interiors-nav">
        <a href="/" className="interiors-nav__brand">
          ØMNILON Interiors
        </a>
        <span className="interiors-nav__ticks">•••••</span>
        <nav aria-label="Interiors">
          <a href="#how">How it works</a>
          <a href="#stories">Stories</a>
          <a href="#lead">Contact</a>
        </nav>
        <a href="#lead" className="interiors-nav__cta">
          Request room review
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </header>

      <section className="interiors-hero">
        <div className="interiors-hero__copy">
          <p className="interiors-label">{division.eyebrow}</p>
          <h1>
            Rooms change everything.
            <em>Except intention.</em>
          </h1>
          <p>
            Interior styling, staging, virtual redesign, and environment planning for homes,
            offices, rentals, and commercial spaces.
          </p>
          <a href="#lead" className="interiors-button">
            Start interiors intake
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
        <figure className="interiors-hero__image">
          <img src={divisionAssets.interiors.hero} alt="" />
          <figcaption>ØMNILON Interiors - spatial redesign / staging / visual direction</figcaption>
        </figure>
      </section>

      <section className="interiors-proof" aria-label="Interior design proof points">
        {division.proofPoints.map((point) => (
          <article key={point}>
            <p>{point}</p>
          </article>
        ))}
      </section>

      <section id="how" className="interiors-story interiors-story--process">
        <div>
          <p className="interiors-label">How it works</p>
          <h2>You look. Then the room answers back.</h2>
        </div>
        <div className="interiors-process">
          {division.process.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="stories" className="interiors-story interiors-story--media">
        <div className="interiors-media-pair">
          <img src={divisionAssets.interiors.detail} alt="" />
          <img src={divisionAssets.interiors.videoFrame} alt="" />
        </div>
        <div>
          <p className="interiors-label">What you can request</p>
          <h2>Design direction before the buying starts.</h2>
          <div className="interiors-services">
            {division.services.map((service, index) => (
              <article key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lead" className="interiors-lead">
        <LeadCaptureForm division={division} />
      </section>

      <footer className="interiors-footer">
        <div>
          <p className="interiors-label">Continue through OmniLend</p>
          <h2>Choose another specialist world.</h2>
        </div>
        <CrossDivisionLinks division={division} variant="interiors" />
      </footer>
    </AnimatedPage>
  );
}

function FinanceWorld({ division }: { division: Division }) {
  return (
    <AnimatedPage
      className="finance-world"
      style={{ "--division-accent": division.accentColor } as CSSProperties}
    >
      <header className="finance-top">
        <nav aria-label="Finance">
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
        <span>Subject to approval</span>
        <a href="#lead">Contact</a>
      </header>

      <section id="work" className="finance-editorial">
        <h1 className="finance-logo">
          OMNILEND
          <br />
          FINANCE<sup>®</sup>
        </h1>

        <aside className="finance-index" aria-label="Finance service index">
          {division.services.map((service, index) => (
            <a key={service} href={`#finance-case-${index + 1}`} className={index === 2 ? "is-active" : ""}>
              {service}
            </a>
          ))}
        </aside>

        <div className="finance-rail" aria-hidden="true">
          <img src={divisionAssets.finance.panel} alt="" />
          <img src={divisionAssets.finance.flow} alt="" />
          <div className="finance-feature">
            <span className="finance-bracket finance-bracket--left" />
            <img src={divisionAssets.finance.hero} alt="" />
            <span className="finance-bracket finance-bracket--right" />
          </div>
          <img src={divisionAssets.finance.thumbs[3]} alt="" />
        </div>

        <aside id="about" className="finance-note">
          <p>
            Finance intake shaped like a clean editorial workflow: purchase intent, eligibility
            notes, option presentation, and follow-up status without invented terms.
          </p>
          <p>
            Contact:
            <br />
            <a href="mailto:Omnilend.co@gmail.com">Omnilend.co@gmail.com</a>
          </p>
        </aside>

        <div className="finance-meta">
          <span>Purchase planning</span>
          <span>Customer intake</span>
          <span>Terms may vary</span>
          <span>03</span>
        </div>
      </section>

      <section className="finance-taxonomy" aria-label="Finance workflow taxonomy">
        {division.process.map((step, index) => (
          <p key={step}>
            {step}
            <span>{division.services[index] ?? "Structured follow-up"}</span>
            <b>{String(index + 1).padStart(2, "0")}</b>
          </p>
        ))}
      </section>

      <section className="finance-work-grid" aria-label="Finance pathways">
        {division.services.slice(0, 6).map((service, index) => (
          <article id={`finance-case-${index + 1}`} key={service}>
            <a href="#lead">
              <img src={divisionAssets.finance.thumbs[index]} alt="" />
              <h2>{service}</h2>
              <p>{division.process[index % division.process.length]}</p>
              <p>Finance intake / purchase planning</p>
            </a>
          </article>
        ))}
      </section>

      <section className="finance-disclaimer">
        Financing availability, terms, and approvals may vary. OmniLend does not guarantee
        approval, specific rates, or lending terms. Final options are subject to review,
        eligibility, and applicable partner or provider requirements.
      </section>

      <section id="lead" className="finance-lead">
        <LeadCaptureForm division={division} />
      </section>

      <footer className="finance-footer">
        <p>All rights reserved. ©2026 OmniLend</p>
        <CrossDivisionLinks division={division} variant="finance" />
      </footer>
    </AnimatedPage>
  );
}

function SignalBars({ lit = 24 }: { lit?: number }) {
  return (
    <div className="asset-bars" aria-hidden="true">
      {Array.from({ length: 34 }).map((_, index) => (
        <span key={index} className={index < lit ? "is-lit" : ""} />
      ))}
    </div>
  );
}

function AssetFortificationWorld({ division }: { division: Division }) {
  return (
    <AnimatedPage
      className="asset-world"
      style={{ "--division-accent": division.accentColor } as CSSProperties}
    >
      <header className="asset-topbar">
        <a href="/" className="asset-brand">
          <span />
          ØMNILON Overwatch
        </a>
        <div>
          <span>RISK_ACTIVE: 03</span>
          <b>LIVE_FEED_ACTIVE</b>
        </div>
      </header>

      <section className="asset-command">
        <span className="asset-corner asset-corner--tl" />
        <span className="asset-corner asset-corner--tr" />
        <span className="asset-corner asset-corner--bl" />
        <span className="asset-corner asset-corner--br" />

        <div className="asset-intro">
          <p>Operational security platform</p>
          <h1>
            Asset
            <br />
            Fortification<span>_</span>
          </h1>
          <div>
            <p>{division.heroSubtitle}</p>
          </div>
        </div>

        <div className="asset-aggregate asset-aggregate--primary">
          <div>
            <span>Exposure review aggregate</span>
            <strong>156,967</strong>
          </div>
          <SignalBars lit={28} />
        </div>

        <div className="asset-aggregate">
          <div>
            <span>Documentation gap aggregate</span>
            <strong>109,154</strong>
          </div>
          <SignalBars lit={21} />
        </div>

        <div className="asset-stats">
          {[
            ["Total reviews", "1,145"],
            ["Prevention rate", "75.4%"],
            ["Active session", "02"],
            ["Last sync", "22d AGO"]
          ].map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="asset-query">
        <div className="asset-terminal">
          <p>&gt; Establishing site walkthrough protocol...</p>
          <p>&gt; Loading dataset ACCESS_CAMERA_DOCUMENTATION...</p>
          <p>&gt; Reindexing {division.services.length} review vectors...</p>
          <p>&gt; Verifying prevention block 0x4F... OK</p>
          <strong>&gt; SYSTEM_READY_FOR_QUERY</strong>
        </div>
        <a href="#lead" className="asset-input">
          <span>Command input</span>
          <strong>&gt; ENTER</strong>
        </a>
      </section>

      <section className="asset-review">
        <div>
          <p className="asset-label">Review vectors</p>
          <h2>What gets reviewed</h2>
        </div>
        <div className="asset-review__grid">
          {division.services.map((service, index) => {
            const Icon = assetIcons[index % assetIcons.length];

            return (
              <article key={service}>
                <Icon />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service}</h3>
              </article>
            );
          })}
        </div>
      </section>

      <section className="asset-review asset-review--process">
        <div>
          <p className="asset-label">Fortification process</p>
          <h2>Prioritized fixes, not theater.</h2>
        </div>
        <div className="asset-process">
          {division.process.map((step, index) => (
            <article key={step}>
              <span>{String(index).padStart(2, "0")}</span>
              <h3>{step}</h3>
              <CheckCircle2 />
            </article>
          ))}
        </div>
      </section>

      <section id="lead" className="asset-lead">
        <LeadCaptureForm division={division} />
      </section>

      <footer className="asset-footer">
        <div>
          <p className="asset-label">Portal transfer</p>
          <h2>Other OmniLend divisions</h2>
        </div>
        <CrossDivisionLinks division={division} variant="asset" />
      </footer>
    </AnimatedPage>
  );
}

export function DivisionShell({ division }: { division: Division }) {
  if (division.slug === "interiors") {
    return <InteriorsWorld division={division} />;
  }

  if (division.slug === "finance") {
    return <FinanceWorld division={division} />;
  }

  return <AssetFortificationWorld division={division} />;
}
