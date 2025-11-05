export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="max-w-3xl w-full rounded-2xl border border-white/10 p-8">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight">OmniLend Brand System</h1>
        <p className="mt-4 text-base/7 text-muted">
          High-contrast shell. Tailwind tokens: <code className="font-mono">bg</code>, <code className="font-mono">text</code>,{" "}
          <code className="font-mono">brand</code>. Fonts wired: Inter (sans) + JetBrains Mono.
        </p>
        <div className="mt-8 h-24 rounded-xl bg-brand/20 ring-1 ring-brand/40 grid place-items-center">
          <span className="text-brand font-medium">brand swatch</span>
        </div>
      </div>
    </main>
  );
}
