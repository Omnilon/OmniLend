"use client";

import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Camera,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  Eye,
  Layers3,
  LockKeyhole,
  MapPinned,
  ShieldCheck,
  Sofa,
  Waypoints
} from "lucide-react";
import { motion } from "framer-motion";
import { divisions, type Division, type DivisionKey } from "@/content/divisions";
import { BrandMark } from "./BrandMark";
import { DivisionLink } from "./DivisionLink";
import { HudFrame } from "./HudFrame";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { SectionLabel } from "./SectionLabel";

const routeBySlug: Record<DivisionKey, string> = {
  interiors: "/interiors",
  "asset-fortification": "/asset-fortification",
  finance: "/finance"
};

const divisionCopy = {
  interiors: {
    heroCode: "STUDIO 01",
    primaryTitle: "Services",
    secondaryTitle: "Room Transformation Process",
    detailTitle: "Visual deliverables",
    detailIntro:
      "The work becomes legible before purchase decisions are made: mood, layout, sourcing, and implementation notes stay visible.",
    detailItems: [
      "Moodboard direction with material and lighting cues",
      "Layout plan for movement, furniture scale, and focal points",
      "Sourcing map with priority buys, alternates, and implementation notes"
    ],
    visualLabel: "Gallery / Floor Plan",
    icon: Sofa
  },
  "asset-fortification": {
    heroCode: "RISK 02",
    primaryTitle: "What gets reviewed",
    secondaryTitle: "Fortification Process",
    detailTitle: "Risk categories",
    detailIntro:
      "The review focuses on practical exposure: movement, access, documentation, visibility, and staff-facing workflow gaps.",
    detailItems: [
      "Entry points, storage exposure, and access routines",
      "Camera-zone visibility, customer flow, and blind spots",
      "Incident documentation, escalation paths, and accountability loops"
    ],
    visualLabel: "Risk Map / Timeline",
    icon: ShieldCheck
  },
  finance: {
    heroCode: "INTAKE 03",
    primaryTitle: "Finance pathways",
    secondaryTitle: "Customer intake flow",
    detailTitle: "Lead qualification process",
    detailIntro:
      "The intake path separates casual interest from workable purchase conversations without promising rates, approvals, or lending terms.",
    detailItems: [
      "Capture intent, purchase amount, timing, and preferred option type",
      "Organize eligibility notes for review where financing is available",
      "Track follow-up so terms, next steps, and open questions stay clear"
    ],
    visualLabel: "Dashboard / Approval Path",
    icon: CircleDollarSign
  }
} satisfies Record<
  DivisionKey,
  {
    heroCode: string;
    primaryTitle: string;
    secondaryTitle: string;
    detailTitle: string;
    detailIntro: string;
    detailItems: string[];
    visualLabel: string;
    icon: typeof Sofa;
  }
>;

function WorldVisual({ division }: { division: Division }) {
  if (division.slug === "interiors") {
    return (
      <HudFrame className="division-visual division-visual--interiors p-5" label="Material Board">
        <div className="grid h-full min-h-[440px] grid-rows-[1fr_auto] gap-5">
          <div className="interior-board">
            <div className="interior-board__hero" />
            <div className="interior-board__swatch interior-board__swatch--a" />
            <div className="interior-board__swatch interior-board__swatch--b" />
            <div className="interior-board__plan">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-white/52">
            <span>Texture</span>
            <span>Scale</span>
            <span>Light</span>
          </div>
        </div>
      </HudFrame>
    );
  }

  if (division.slug === "asset-fortification") {
    return (
      <HudFrame className="division-visual division-visual--asset p-5" label="Exposure Scan">
        <div className="risk-map min-h-[440px]">
          <div className="risk-map__grid" />
          <div className="risk-map__scan" />
          <div className="risk-map__node risk-map__node--one">
            <Camera className="h-4 w-4" />
            Zone A
          </div>
          <div className="risk-map__node risk-map__node--two">
            <LockKeyhole className="h-4 w-4" />
            Access
          </div>
          <div className="risk-map__node risk-map__node--three">
            <Eye className="h-4 w-4" />
            Blind Spot
          </div>
          <div className="risk-map__timeline">
            <span>00 Intake</span>
            <span>01 Walkthrough</span>
            <span>02 Map</span>
            <span>03 Fixes</span>
          </div>
        </div>
      </HudFrame>
    );
  }

  return (
    <HudFrame className="division-visual division-visual--finance p-5" label="Purchase Path">
      <div className="finance-board min-h-[440px]">
        <div className="finance-board__stat">
          <span>INTENT</span>
          <strong>Captured</strong>
        </div>
        <div className="finance-board__stat">
          <span>REVIEW</span>
          <strong>Subject to approval</strong>
        </div>
        <div className="finance-board__path">
          <span />
          <span />
          <span />
        </div>
        <div className="finance-board__card finance-board__card--a">
          <CreditCard className="h-5 w-5" />
          Payment options where available
        </div>
        <div className="finance-board__card finance-board__card--b">
          <ClipboardCheck className="h-5 w-5" />
          Terms may vary by provider
        </div>
      </div>
    </HudFrame>
  );
}

export function DivisionShell({ division }: { division: Division }) {
  const config = divisionCopy[division.slug];
  const Icon = config.icon;

  return (
    <main
      className={`division-world division-world--${division.slug}`}
      style={
        {
          "--division-accent": division.accentColor,
          "--division-gradient": division.gradient
        } as CSSProperties
      }
    >
      <div className="division-bg" />
      <div className="division-grid" />

      <motion.div
        className="relative z-10 mx-auto w-[min(1220px,calc(100%-2rem))] py-6 sm:py-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
      >
        <header className="flex items-center justify-between gap-4">
          <BrandMark />
          <DivisionLink
            href="/"
            label="Gateway"
            accentColor={division.accentColor}
            className="border border-white/12 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/52 transition hover:border-white/30 hover:text-white"
          >
            Gateway
          </DivisionLink>
        </header>

        <section className="grid min-h-[calc(100vh-6rem)] items-center gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
          <div>
            <SectionLabel>{division.eyebrow}</SectionLabel>
            <div className="mt-6 inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/46">
              <Icon className="h-4 w-4 text-[color:var(--division-accent)]" />
              {config.heroCode}
            </div>
            <h1 className="mt-7 text-[clamp(2.8rem,6.2vw,5.6rem)] font-semibold uppercase leading-[0.9] text-white">
              {division.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
              {division.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lead"
                className="inline-flex items-center gap-2 border border-[color:var(--division-accent)]/50 bg-[color:var(--division-accent)] px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-black transition hover:brightness-110"
              >
                Start intake
                <ArrowDown className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center border border-white/10 px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-white/50">
                {config.visualLabel}
              </span>
            </div>
          </div>
          <WorldVisual division={division} />
        </section>

        <section className="division-section">
          <div>
            <SectionLabel>{config.primaryTitle}</SectionLabel>
            <h2 className="section-heading">{config.primaryTitle}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {division.services.map((service, index) => (
              <HudFrame key={service} className="division-card p-5">
                <div className="flex min-h-[170px] flex-col justify-between gap-6">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/34">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold leading-tight text-white">{service}</h3>
                </div>
              </HudFrame>
            ))}
          </div>
        </section>

        <section className="division-section">
          <div>
            <SectionLabel>{config.detailTitle}</SectionLabel>
            <h2 className="section-heading">{config.detailTitle}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62 md:text-base">
              {config.detailIntro}
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {config.detailItems.map((item) => (
              <HudFrame key={item} className="division-card p-5">
                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[color:var(--division-accent)]" />
                  <p className="text-sm leading-7 text-white/68">{item}</p>
                </div>
              </HudFrame>
            ))}
          </div>
        </section>

        <section className="division-section">
          <div>
            <SectionLabel>{config.secondaryTitle}</SectionLabel>
            <h2 className="section-heading">{config.secondaryTitle}</h2>
          </div>
          <div className="grid gap-3">
            {division.process.map((step, index) => (
              <HudFrame key={step} className="process-row p-5">
                <div className="grid gap-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--division-accent)]">
                    Phase {index + 1}
                  </span>
                  <h3 className="text-2xl font-semibold uppercase leading-none text-white">
                    {step}
                  </h3>
                  <Waypoints className="hidden h-5 w-5 text-white/32 md:block" />
                </div>
              </HudFrame>
            ))}
          </div>
        </section>

        <section className="division-section">
          <div>
            <SectionLabel>Proof Points</SectionLabel>
            <h2 className="section-heading">Built for practical decisions.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {division.proofPoints.map((point) => (
              <HudFrame key={point} className="division-card p-5">
                <Layers3 className="h-5 w-5 text-[color:var(--division-accent)]" />
                <p className="mt-6 text-sm leading-7 text-white/68">{point}</p>
              </HudFrame>
            ))}
          </div>
        </section>

        {division.slug === "finance" ? (
          <section className="division-section">
            <HudFrame className="border-[color:var(--division-accent)]/35 p-6">
              <SectionLabel>Compliance Note</SectionLabel>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-white/68 md:text-base">
                Financing availability, terms, and approvals may vary. OmniLend does not
                guarantee approval, specific rates, or lending terms. Final options are subject to
                review, eligibility, and applicable partner or provider requirements.
              </p>
            </HudFrame>
          </section>
        ) : null}

        <section id="lead" className="division-section scroll-mt-24">
          <HudFrame className="p-5 md:p-8">
            <LeadCaptureForm division={division} />
          </HudFrame>
        </section>

        <section className="division-section pb-16">
          <div>
            <SectionLabel>Portal Links</SectionLabel>
            <h2 className="section-heading">Move to another division.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {division.crossLinks.map((slug) => {
              const target = divisions[slug];

              return (
                <DivisionLink
                  key={target.slug}
                  href={routeBySlug[target.slug]}
                  label={target.shortName}
                  accentColor={target.accentColor}
                  className="block"
                >
                  <HudFrame
                    className="portal-card p-5"
                    label={`${target.shortName} Portal`}
                  >
                    <div
                      style={{ "--division-accent": target.accentColor } as CSSProperties}
                      className="flex items-end justify-between gap-6"
                    >
                      <div>
                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
                          Open division
                        </p>
                        <h3 className="mt-5 text-3xl font-semibold uppercase leading-none text-white">
                          {target.shortName}
                        </h3>
                      </div>
                      <ArrowUpRight className="h-6 w-6 text-[color:var(--division-accent)] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </HudFrame>
                </DivisionLink>
              );
            })}
          </div>
        </section>
      </motion.div>
    </main>
  );
}
