export default function CTA({
  title,
  body,
  ctaLabel,
  ctaHref
}: {
  title: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="rounded-3xl border p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">{title}</h2>
        {body && <p className="mt-4 text-base/7 opacity-80">{body}</p>}
        <a href={ctaHref} className="inline-flex mt-8 rounded-2xl px-5 py-3 border">
          {ctaLabel} →
        </a>
      </div>
    </section>
  );
}
