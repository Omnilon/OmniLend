import { MDXRemote } from "next-mdx-remote/rsc";

export default function Prose({ title, body }: { title?: string; body: string }) {
  return (
    <section className="px-6 py-12 md:py-16">
      {title && <h2 className="text-2xl md:text-4xl font-semibold mb-6">{title}</h2>}
      <article className="prose prose-invert max-w-none">
        <MDXRemote source={body} />
      </article>
    </section>
  );
}
