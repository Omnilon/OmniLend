"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { SoundProvider } from "./SoundProvider";

type BrandProvidersProps = {
  children: ReactNode;
};

export function BrandProviders({ children }: BrandProvidersProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <SmoothScrollProvider>
        <SoundProvider>{children}</SoundProvider>
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
