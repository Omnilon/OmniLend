"use client";

import Image from "next/image";
import { useRef } from "react";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { omniContent } from "@content/omnilend";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.3 });
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const floatY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -60]);
  const combinedY = useTransform([springY, floatY], ([pointerY, scrollOffset]) => {
    return pointerY + scrollOffset;
  });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 40);
    y.set(py * 40);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pb-24 pt-32 md:pb-32 md:pt-40"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">
            {omniContent.site.heroLabel}
          </p>
          <h1 className="mt-6 text-4xl font-semibold text-white md:text-6xl">
            {omniContent.site.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
            {omniContent.site.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="#overview" size="lg">
              {omniContent.site.heroCtaPrimary}
            </ButtonLink>
            <ButtonLink href="#services" variant="ghost" size="lg">
              {omniContent.site.heroCtaSecondary}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Signal-led lending journeys",
              "Human-first product strategy",
              "Audit-friendly documentation",
              "Precision rollout support"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative flex h-[360px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 md:h-[440px]"
        >
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(155,107,255,0.18),transparent_55%)]" />
          <motion.div
            style={{ x: springX, y: combinedY }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <Image
              src="/assets/hero-orb.svg"
              alt="OmniLend luminous orb"
              width={420}
              height={420}
              sizes="(max-width: 768px) 320px, 420px"
              className="h-full w-full object-contain"
              priority
            />
          </motion.div>
          <motion.div
            className="absolute inset-6 rounded-2xl border border-white/10"
            style={{ x: springX, y: springY }}
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute left-[-40%] top-1/3 h-[2px] w-[60%] bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-sweep" />
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-accent" />
            System active
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-20 h-64 w-64 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-64 w-64 rounded-full bg-white/10 blur-[140px]" />
      </div>
    </section>
  );
}
