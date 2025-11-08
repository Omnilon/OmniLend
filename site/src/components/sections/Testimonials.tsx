export default function Testimonials({
  title,
  quotes
}: {
  title?: string;
  quotes: { quote: string; author?: string; role?: string }[];
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      {title && <h2 className="text-2xl md:text-4xl font-semibold mb-8">{title}</h2>}
      <div className="grid md:grid-cols-3 gap-6">
        {quotes.map((q, i) => (
          <figure key={i} className="rounded-2xl border p-6">
            <blockquote className="text-sm/6 opacity-90">“{q.quote}”</blockquote>
            {(q.author || q.role) && (
              <figcaption className="mt-4 text-xs/5 opacity-70">
                {q.author}
                {q.role ? ` — ${q.role}` : ""}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
