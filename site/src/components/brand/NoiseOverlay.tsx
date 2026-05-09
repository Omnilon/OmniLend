export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.055] mix-blend-soft-light"
      style={{ backgroundImage: "url('/noise.png')" }}
    />
  );
}
