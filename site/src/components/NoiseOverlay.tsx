"use client";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] opacity-[var(--noise-opacity)] mix-blend-soft-light"
      style={{
        backgroundImage: "url(/noise.png)",
        backgroundRepeat: "repeat"
      }}
    />
  );
}
