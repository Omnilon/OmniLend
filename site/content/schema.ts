import { z } from "zod";

export const Section = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional()
  }),
  z.object({
    type: z.literal("features"),
    title: z.string(),
    items: z
      .array(
        z.object({
          title: z.string(),
          body: z.string()
        })
      )
      .min(3)
  }),
  z.object({
    type: z.literal("steps"),
    title: z.string(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          body: z.string()
        })
      )
      .min(3)
  }),
  z.object({
    type: z.literal("testimonials"),
    title: z.string().optional(),
    quotes: z
      .array(
        z.object({
          quote: z.string(),
          author: z.string().optional(),
          role: z.string().optional()
        })
      )
      .min(1)
  }),
  z.object({
    type: z.literal("cta"),
    title: z.string(),
    body: z.string().optional(),
    ctaLabel: z.string(),
    ctaHref: z.string()
  }),
  z.object({
    type: z.literal("prose"),
    title: z.string().optional(),
    body: z.string()
  })
]);

export const PageFrontmatter = z.object({
  title: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
  slug: z.string().optional()
});

export const Page = z.object({
  frontmatter: PageFrontmatter,
  sections: z.array(Section)
});
export type SectionT = z.infer<typeof Section>;
export type PageT = z.infer<typeof Page>;
