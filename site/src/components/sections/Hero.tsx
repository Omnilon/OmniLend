export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative isolate px-6 py-24 md:py-32">
      {eyebrow && (
        <p className="mb-3 text-sm/6 uppercase tracking-wide opacity-70">{eyebrow}</p>
      )}
      <h1 className="text-4xl md:text-6xl font-semibold">{title}</h1>
      {subtitle && <p className="mt-4 text-base/7 max-w-2xl opacity-80">{subtitle}</p>}
      {ctaLabel && ctaHref && (
        <div className="mt-8">
          <a href={ctaHref} className="inline-flex items-center rounded-2xl px-5 py-3 border">
            {ctaLabel} →
          </a>
        </div>
      )}
    </section>
  );
}
