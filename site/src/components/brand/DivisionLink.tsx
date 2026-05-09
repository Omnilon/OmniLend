"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PortalTransition } from "./PortalTransition";

export function DivisionLink({
  href,
  label,
  accentColor,
  className,
  children
}: {
  href: string;
  label: string;
  accentColor: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const timeoutRef = useRef<number | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    router.prefetch(href);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [href, router]);

  return (
    <>
      <button
        type="button"
        className={cn(
          "group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          className
        )}
        onClick={(event) => {
          if (reduceMotion) {
            router.push(href);
            return;
          }

          setOrigin({ x: event.clientX, y: event.clientY });
          timeoutRef.current = window.setTimeout(() => router.push(href), 520);
        }}
      >
        {children}
      </button>
      <PortalTransition
        active={Boolean(origin)}
        accentColor={accentColor}
        label={label}
        origin={origin}
      />
    </>
  );
}
