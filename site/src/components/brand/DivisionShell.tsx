"use client";

/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Eye,
  LockKeyhole
} from "lucide-react";
import { divisions, type Division, type DivisionKey } from "@/content/divisions";
import { DivisionLink } from "./DivisionLink";
import { LeadCaptureForm } from "./LeadCaptureForm";

const routeBySlug: Record<DivisionKey, string> = {
  interiors: "/interiors",
  "asset-fortification": "/asset-fortification",
  finance: "/finance"
};

const assets = {
  interiors: {
    hero: "/assets/divisions/interiors/interior-hero.webp"
  },
  finance: {
    hero: "/assets/divisions/finance/finance-hero.webp",
    panel: "/assets/divisions/finance/finance-panel.webp",
    flow: "/assets/divisions/finance/finance-flow.webp",
    thumbs: [
      "/assets/divisions/finance/Makhno_Thumbnail_e6008952f7.webp",
      "/assets/divisions/finance/Eminente_Thumbnail_d7767e1666.webp",
      "/assets/divisions/finance/Grids_Thumbnail_674aa5712c.webp",
      "/assets/divisions/finance/Glyphic_Biotechnologies_Thumbnail_50ecd8bb9a.webp"
    ]
  }
};

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
  variant: "pk" | "obys" | "ow";
}) {
  return (
    <div className={`world-crosslinks world-crosslinks--${variant}`}>
      {division.crossLinks.map((slug) => {
        const target = divisions[slug];

        return (
          <DivisionLink
            key={target.slug}
            href={routeBySlug[target.slug]}
            label={target.shortName}
            accentColor={target.accentColor}
            className={`world-crosslink world-crosslink--${variant}`}
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
      className="pk-page"
      style={{ "--division-accent": division.accentColor } as CSSProperties}
    >
      <header className="pk-nav">
        <a href="/" className="pk-nav__brand">
          ØMNILON Interiors
        </a>
        <span className="pk-nav__ticks">IIIII</span>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#lead">Contact</a>
        <a href="#lead" className="pk-nav__cta">
          Request room review
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </header>

      <section className="pk-hero">
        <div className="pk-hero__copy">
          <p className="pk-kicker">{division.eyebrow}</p>
          <h1>
            <span>Rooms change</span>
            <span>everything.</span>
            <em>Except intention.</em>
          </h1>
          <p>{division.heroSubtitle}</p>
          <a href="#lead" className="pk-button">
            Start interiors intake
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
        <figure className="pk-hero__art">
          <img src={assets.interiors.hero} alt="" />
          <figcaption>ØMNILON Interiors - spatial redesign / staging / visual direction</figcaption>
        </figure>
      </section>

      <section id="services" className="pk-section pk-section--split">
        <div>
          <p className="pk-kicker">How it works</p>
          <h2>Design direction that survives the first purchase.</h2>
        </div>
        <div className="pk-service-list">
          {division.services.map((service, index) => (
            <article key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="pk-section pk-process">
        <p className="pk-kicker">Transformation process</p>
        <div className="pk-process__rows">
          {division.process.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="pk-section pk-proof">
        {division.proofPoints.map((point) => (
          <p key={point}>{point}</p>
        ))}
      </section>

      <section id="lead" className="pk-section pk-lead">
        <LeadCaptureForm division={division} />
      </section>

      <section className="pk-section pk-portals">
        <p className="pk-kicker">Other OmniLend divisions</p>
        <CrossDivisionLinks division={division} variant="pk" />
      </section>
    </AnimatedPage>
  );
}

function FinanceWorld({ division }: { division: Division }) {
  return (
    <AnimatedPage
      className="obys-page"
      style={{ "--division-accent": division.accentColor } as CSSProperties}
    >
      <header className="obys-top">
        <nav>
          <a href="#work">Work</a>
          <a href="#lead">Intake</a>
        </nav>
        <span>Subject to approval</span>
        <a href="#lead">Contact</a>
      </header>

      <section id="work" className="obys-hero">
        <h1 className="obys-logo">
          OMNILEND
          <br />
          FINANCE<sup>®</sup>
        </h1>
        <aside className="obys-index">
          {division.services.map((service, index) => (
            <span key={service} className={index === 2 ? "is-active" : ""}>
              {service}
            </span>
          ))}
        </aside>
        <div className="obys-gallery" aria-hidden="true">
          <img src={assets.finance.thumbs[0]} alt="" />
          <img src={assets.finance.panel} alt="" />
          <div className="obys-gallery__focus">
            <span className="obys-bracket obys-bracket--left" />
            <img src={assets.finance.hero} alt="" />
            <span className="obys-bracket obys-bracket--right" />
          </div>
          <img src={assets.finance.flow} alt="" />
          <img src={assets.finance.thumbs[3]} alt="" />
        </div>
        <aside className="obys-copy">
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
        <div className="obys-case-meta">
          <span>Purchase planning, customer intake</span>
          <span>Terms may vary</span>
          <span>03</span>
        </div>
      </section>

      <section className="obys-section obys-pathways">
        <div>
          <p>Finance pathways</p>
          <h2>{division.heroTitle}</h2>
        </div>
        <div className="obys-pathways__cards">
          {division.process.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="obys-section obys-proof">
        {division.proofPoints.map((point) => (
          <p key={point}>{point}</p>
        ))}
      </section>

      <section className="obys-disclaimer">
        Financing availability, terms, and approvals may vary. OmniLend does not guarantee
        approval, specific rates, or lending terms. Final options are subject to review,
        eligibility, and applicable partner or provider requirements.
      </section>

      <section id="lead" className="obys-lead">
        <LeadCaptureForm division={division} />
      </section>

      <section className="obys-portals">
        <p>Other OmniLend divisions</p>
        <CrossDivisionLinks division={division} variant="obys" />
      </section>
    </AnimatedPage>
  );
}

function Meter({ label, value, count, lit }: { label: string; value: string; count: number; lit: number }) {
  return (
    <div className="ow-meter">
      <div className="ow-meter__head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="ow-meter__cells">
        {Array.from({ length: count }).map((_, index) => (
          <span key={index} className={index < lit ? "is-lit" : ""} />
        ))}
      </div>
    </div>
  );
}

function AssetFortificationWorld({ division }: { division: Division }) {
  return (
    <AnimatedPage
      className="ow-page"
      style={{ "--division-accent": division.accentColor } as CSSProperties}
    >
      <div className="ow-dots" aria-hidden="true" />
      <header className="ow-topbar">
        <a href="/" className="ow-brand">
          <span />
          ØMNILON OVERWATCH
        </a>
        <div>
          <span>RISK_ACTIVE: 03</span>
          <span className="ow-live">LIVE_FEED_ACTIVE</span>
        </div>
      </header>

      <section className="ow-hero">
        <span className="ow-corner ow-corner--tl" />
        <span className="ow-corner ow-corner--tr" />
        <span className="ow-corner ow-corner--bl" />
        <span className="ow-corner ow-corner--br" />
        <div className="ow-intro">
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
        <Meter label="Exposure review aggregate" value="156,967" count={32} lit={32} />
        <Meter label="Documentation gap aggregate" value="109,154" count={32} lit={22} />
        <div className="ow-stat-grid">
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

      <section className="ow-command-row">
        <div className="ow-terminal">
          <span>{">"} Establishing site walkthrough protocol...</span>
          <span>{">"} Loading dataset ACCESS_CAMERA_DOCUMENTATION...</span>
          <span>{">"} Reindexing {division.services.length} review vectors...</span>
          <span>{">"} Verifying prevention block 0x4F... OK</span>
          <strong>{">"} SYSTEM_READY_FOR_QUERY</strong>
        </div>
        <a href="#lead" className="ow-command">
          <span>Command input</span>
          <strong>{">"} ENTER</strong>
        </a>
      </section>

      <section className="ow-section ow-review">
        <div>
          <p>Review vectors</p>
          <h2>What gets reviewed</h2>
        </div>
        <div className="ow-review__grid">
          {division.services.map((service, index) => (
            <article key={service}>
              {index % 3 === 0 ? <Camera /> : index % 3 === 1 ? <LockKeyhole /> : <Eye />}
              <span>0{index + 1}</span>
              <h3>{service}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="ow-section ow-process">
        {division.process.map((step, index) => (
          <article key={step}>
            <span>0{index}</span>
            <h3>{step}</h3>
            <CheckCircle2 className="h-5 w-5" />
          </article>
        ))}
      </section>

      <section id="lead" className="ow-lead">
        <LeadCaptureForm division={division} />
      </section>

      <section className="ow-portals">
        <p>Portal transfer</p>
        <CrossDivisionLinks division={division} variant="ow" />
      </section>
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
