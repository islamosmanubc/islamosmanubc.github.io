import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    year: z.number(),
    period: z.string(),
    organization: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    stack: z.array(z.string()),
    impact: z.string(),
    cover: z.string(),
    github: z.url().optional(),
    demo: z.url().optional(),
    paper: z.url().optional(),
    order: z.number()
  })
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    venue: z.string(),
    authors: z.string(),
    category: z.enum(["Journal", "Conference", "Accepted", "Submitted", "Abstract"]),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    links: z
      .object({
        paper: z.url().optional(),
        scholar: z.url().optional()
      })
      .optional(),
    order: z.number()
  })
});

export const collections = {
  projects,
  publications
};
