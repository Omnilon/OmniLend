"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HudCard } from "./HudCard";
import { SoundToggle } from "./SoundToggle";

export type BrandNavItem = {
  href: string;
  label: string;
  key: string;
};

type BrandNavbarProps = {
  items: BrandNavItem[];
  activeExperienceLabel: string;
  interfaceUnlocked: boolean;
};

const NAV_HUD_COPY: Record<
  string,
  {
    title: string;
    body: string;
  }
> = {
  overview: { title: "Overview", body: "High-level map of the Ømnilon shell." },
  services: { title: "Services", body: "What we actually deliver for each world." },
  process: { title: "Process", body: "Milestones, handoffs, and how we communicate." },
  testimonials: { title: "Testimonials", body: "Proof points and client notes." },
  coverage: { title: "Coverage", body: "Where Secret Lifters operate and what you receive." },
  pricing: { title: "Pricing", body: "Deposit and pricing guidance for Ømnilon Ink." },
  contact: { title: "Contact", body: "Book a call, send a brief, or lock a slot." }
};

export function BrandNavbar({ items, activeExperienceLabel, interfaceUnlocked }: BrandNavbarProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [lockedKey, setLockedKey] = useState<string | null>(null);
  const hideTimer = useRef<number | null>(null);

  const blurValue = useTransform(scrollY, [0, 120], [0, 16]);
  const backgroundColor = useTransform(scrollY, [0, 120], [
    "rgba(10,10,10,0)",
    "rgba(10,10,10,0.85)"
  ]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const backdropFilter = useTransform(blurValue, value => `blur(${value}px)`);
  const borderBottom = useTransform(
    borderOpacity,
    value => `1px solid rgba(255,255,255,${0.1 * value})`
  );
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => setIsMounted(true), []);

  const statusCopy = useMemo(
    () => (interfaceUnlocked ? "Shell unlocked" : "Gate locked — tap Enter to unlock"),
    [interfaceUnlocked]
  );

  const currentKey = lockedKey ?? hoveredKey;
  const hudContent = currentKey ? NAV_HUD_COPY[currentKey] : null;

  const handleHide = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (!lockedKey) setHoveredKey(null);
    }, 160);
  };

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full"
      style={isMounted ? { backdropFilter, backgroundColor, borderBottom } : undefined}
      onMouseLeave={handleHide}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="#top" className="font-grotesk text-sm font-semibold tracking-tight text-white">
            ØMNILON • Brand Shell
          </Link>
          <motion.span
            className="hidden items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-white/70 sm:inline-flex"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="h-2 w-2 rounded-full bg-accent-purple shadow-glow" aria-hidden />
            {activeExperienceLabel}
          </motion.span>
        </div>
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-5 text-xs uppercase tracking-[0.3em] text-muted md:flex">
            {items.map(item => (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  onMouseEnter={() => {
                    if (hideTimer.current) window.clearTimeout(hideTimer.current);
                    setHoveredKey(item.key);
                  }}
                  onMouseLeave={handleHide}
                  onClick={e => {
                    e.preventDefault();
                    setLockedKey(prev => (prev === item.key ? null : item.key));
                    if (item.href.startsWith("#")) {
                      const target = document.querySelector(item.href);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    } else {
                      window.location.assign(item.href);
                    }
                  }}
                  className="transition-colors duration-300 ease-brand hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <motion.div
            className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-white/70 lg:flex"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className={`h-2 w-2 rounded-full ${interfaceUnlocked ? "bg-accent-green" : "bg-white/30"}`}
              aria-hidden
            />
            {statusCopy}
          </motion.div>
          <SoundToggle />
        </div>
        <motion.div
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-white/10"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-0 -bottom-[1px] h-[2px] w-full origin-left bg-white"
          style={{ scaleX: progress }}
          aria-hidden
        />
      </div>

      <HudCard
        show={Boolean(hudContent)}
        title={hudContent?.title ?? ""}
        body={hudContent?.body ?? ""}
        label="[mission]"
        position="top-left"
        onClose={() => {
          setHoveredKey(null);
          setLockedKey(null);
        }}
      />
    </motion.nav>
  );
}
