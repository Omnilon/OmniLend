export default function Steps({
  title,
  steps
}: {
  title: string;
  steps: { title: string; body: string }[];
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      <h2 className="text-2xl md:text-4xl font-semibold mb-8">{title}</h2>
      <ol className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <li key={i} className="rounded-2xl border p-6">
            <div className="text-4xl font-semibold">{i + 1}</div>
            <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
            <p className="mt-2 text-sm/6 opacity-80">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
