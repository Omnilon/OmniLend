"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SoundToggle } from "./SoundToggle";

const navItems = [
  { href: "#guidelines", label: "Guidelines" },
  { href: "#typography", label: "Typography" },
  { href: "#color", label: "Color" },
  { href: "#hud", label: "HUD & 3D" },
  { href: "#voice", label: "Voice" }
];

export function BrandNavbar() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const blurValue = useTransform(scrollY, [0, 120], [0, 16]);
  const backgroundColor = useTransform(scrollY, [0, 120], [
    "rgba(10,10,10,0)",
    "rgba(10,10,10,0.85)"
  ]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const backdropFilter = useTransform(blurValue, (value) => `blur(${value}px)`);
  const borderBottom = useTransform(
    borderOpacity,
    (value) => `1px solid rgba(255,255,255,${0.1 * value})`
  );

  useEffect(() => setIsMounted(true), []);

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full"
      style={isMounted ? { backdropFilter, backgroundColor, borderBottom } : undefined}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="font-grotesk text-sm font-semibold tracking-tight text-white"
        >
          SITE_OWNER • Brand Shell
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-5 text-xs uppercase tracking-[0.3em] text-muted md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors duration-300 ease-brand hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <SoundToggle />
        </div>
      </div>
    </motion.nav>
  );
}
