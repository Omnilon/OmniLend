import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Page, type PageT } from "@content/schema";

export type LoadedPage = PageT;

export async function loadPage(slug: string): Promise<LoadedPage> {
  const p = path.join(process.cwd(), "content", "pages", `${slug}.mdx`);
  const raw = fs.readFileSync(p, "utf8");
  const { data, content } = matter(raw);
  const { sections: initialSections, ...frontmatter } = data as Record<string, any>;
  const sections = Array.isArray(initialSections) ? [...initialSections] : [];
  if (content.trim().length) {
    sections.push({ type: "prose", body: content });
  }
  const parsed = Page.parse({ frontmatter, sections });
  return parsed;
}
