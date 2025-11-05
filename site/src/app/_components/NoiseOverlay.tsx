"use client";
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay text-black dark:text-white noise"
    />
  );
}
