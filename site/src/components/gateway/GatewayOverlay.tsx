"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo } from "react";
import { omniContent } from "@content/omnilend";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { Button } from "@/components/ui/Button";
import { useSound } from "@/components/SoundProvider";

const bootLines = [
  "SYSTEM [LOAD]",
  "Initializing modules...",
  "Calibrating trust layer...",
  "Handshake ready"
];

export function GatewayOverlay() {
  const reducedMotion = useReducedMotion();
  const [hasEntered, setHasEntered, hydrated] = useLocalStorageState("hasEntered", false);
  const { enabled, toggle, play } = useSound();
  const bootSequence = useMemo(() => bootLines, []);
  const titleId = useId();

  useEffect(() => {
    if (!hydrated) return;
    if (!hasEntered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [hasEntered, hydrated]);

  if (!hydrated) return null;

  return (
    <AnimatePresence>
      {!hasEntered ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b0b11]/95 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
        >
          <div className="absolute inset-0 scanlines opacity-20" aria-hidden />
          <div className="absolute inset-0 noise-overlay" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" aria-hidden />

          <motion.div
            className="relative mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f111a]/90 p-8 text-center shadow-soft"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: [0.23, 1, 0.32, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-white/50">
              {omniContent.site.introLabel}
            </p>
            <h1
              id={titleId}
              className="mt-6 text-2xl font-semibold text-white md:text-3xl"
            >
              {omniContent.site.gatewayTagline}
            </h1>
            <p className="mt-4 text-sm text-white/70">
              Secure access to the OmniLend experience. Your session is private and controlled.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => {
                  setHasEntered(true);
                  void play("enter");
                }}
                size="lg"
              >
                Enter
              </Button>
              <Button
                onClick={() => toggle(!enabled)}
                variant="secondary"
                size="lg"
              >
                {enabled ? "Mute" : "Unmute"}
              </Button>
            </div>

            <div className="mt-8 space-y-2 text-left font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              {bootSequence.map((line, index) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.2 + index * 0.15 }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/50">
              {enabled
                ? "Sound enabled. You can mute anytime from the HUD."
                : "Sound is optional and stays off until you enable it."}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
