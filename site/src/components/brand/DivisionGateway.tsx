"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, Building2, CircleDollarSign, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { Division } from "@/content/divisions";
import { BrandMark } from "./BrandMark";
import { DivisionLink } from "./DivisionLink";
import { HudFrame } from "./HudFrame";
import { SectionLabel } from "./SectionLabel";

const iconBySlug = {
  interiors: Building2,
  "asset-fortification": ShieldCheck,
  finance: CircleDollarSign
};

const gatewayAssets = {
  interiors: "/assets/divisions/interiors/interior-hero.webp",
  finance: "/assets/divisions/finance/finance-hero.webp"
};

function divisionPath(division: Division) {
  return `/${division.slug}`;
}

function GatewayCardGraphic({ division }: { division: Division }) {
  if (division.slug === "interiors") {
    return (
      <div className="gateway-asset gateway-asset--interiors">
        <Image
          src={gatewayAssets.interiors}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <div className="gateway-asset__caption">
          <span>Spatial entry</span>
          <strong>Design the space</strong>
        </div>
      </div>
    );
  }

  if (division.slug === "asset-fortification") {
    return (
      <div className="gateway-asset gateway-asset--asset">
        <div className="gateway-asset__signal">
          <span />
          <span />
          <span />
        </div>
        <div className="gateway-asset__caption">
          <span>Risk surface</span>
          <strong>Protect the asset</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="gateway-asset gateway-asset--finance">
      <Image
        src={gatewayAssets.finance}
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <div className="gateway-asset__caption">
        <span>Intake path</span>
        <strong>Structure the purchase</strong>
      </div>
    </div>
  );
}

export function DivisionGateway({ divisions }: { divisions: Division[] }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="gateway-atmosphere" aria-hidden="true">
        <Image
          src={gatewayAssets.interiors}
          alt=""
          width={720}
          height={720}
          className="gateway-atmosphere__media gateway-atmosphere__media--interiors"
        />
        <Image
          src={gatewayAssets.finance}
          alt=""
          width={900}
          height={900}
          className="gateway-atmosphere__media gateway-atmosphere__media--finance"
        />
        <span className="gateway-atmosphere__beam gateway-atmosphere__beam--violet" />
        <span className="gateway-atmosphere__beam gateway-atmosphere__beam--orange" />
        <span className="gateway-atmosphere__beam gateway-atmosphere__beam--green" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-[min(1180px,calc(100%-2rem))] flex-col px-1 py-6 sm:px-0 sm:py-8">
        <header className="flex items-center justify-between gap-4">
          <BrandMark />
          <span className="hidden border border-white/12 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-white/42 sm:inline-flex">
            Umbrella Gateway
          </span>
        </header>

        <section className="grid flex-1 content-center gap-8 py-10 md:py-12">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <SectionLabel>Animated Brand Intro</SectionLabel>
            <h1 className="mt-5 max-w-5xl text-[clamp(2.7rem,7vw,5.8rem)] font-semibold uppercase leading-[0.88] text-white">
              Choose your OmniLend division.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
              OmniLend is a multi-division creative and operational house built around design,
              protection, and purchasing pathways. Choose which side of the umbrella you need.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {divisions.map((division, index) => {
              const Icon = iconBySlug[division.slug];

              return (
                <motion.div
                  key={division.slug}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.08 * index, ease: [0.23, 1, 0.32, 1] }}
                >
                  <DivisionLink
                    href={divisionPath(division)}
                    label={division.shortName}
                    accentColor={division.accentColor}
                    className="block h-full w-full"
                  >
                    <HudFrame
                      className="gateway-card flex h-full min-h-[300px] flex-col justify-between p-5"
                      label={division.eyebrow}
                    >
                      <div
                        style={
                          {
                            "--division-accent": division.accentColor,
                            "--division-gradient": division.gradient
                          } as CSSProperties
                        }
                        className="grid h-full gap-8"
                      >
                        <GatewayCardGraphic division={division} />
                        <div className="mt-auto">
                          <div className="mb-5 flex items-center justify-between">
                            <Icon className="h-6 w-6 text-[color:var(--division-accent)]" />
                            <ArrowUpRight className="h-5 w-5 text-white/45 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                          </div>
                          <h2 className="text-2xl font-semibold uppercase leading-none text-white">
                            {division.shortName}
                          </h2>
                          <p className="mt-4 text-sm leading-6 text-white/62">
                            {division.heroTitle}
                          </p>
                        </div>
                      </div>
                    </HudFrame>
                  </DivisionLink>
                </motion.div>
              );
            })}
          </div>

          <div className="grid gap-3 border-t border-white/10 pt-6 font-mono text-[0.66rem] uppercase tracking-[0.32em] text-white/42 sm:grid-cols-3">
            <span>Design the space</span>
            <span>Protect the asset</span>
            <span>Structure the purchase</span>
          </div>
        </section>
      </div>
    </main>
  );
}
