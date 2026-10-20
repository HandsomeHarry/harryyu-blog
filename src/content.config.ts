import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    year: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    status: z.enum(["shipped", "in progress", "archived"]),
    category: z.enum(["work", "making", "play"]),
    featured: z.boolean().default(false),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    cover: z.string().optional(),
    order: z.number(),
  }),
});

const garage = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/garage" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    mileage: z.number().optional(),
    parts: z.array(z.string()).default([]),
    cost: z.string().optional(),
    difficulty: z.number().min(1).max(5),
    status: z.string(),
    summary: z.string(),
  }),
});

export const collections = { projects, garage };
