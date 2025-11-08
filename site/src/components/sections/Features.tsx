export default function Features({
  title,
  items
}: {
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      <h2 className="text-2xl md:text-4xl font-semibold mb-8">{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl border p-6">
            <h3 className="text-lg font-medium">{it.title}</h3>
            <p className="mt-2 text-sm/6 opacity-80">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
