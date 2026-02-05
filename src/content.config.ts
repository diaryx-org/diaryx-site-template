// src/content.config.ts - Astro 6 Content Layer API
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Content path is configurable via env for hot-swappable workspaces
// Usage: DIARYX_CONTENT_PATH=~/my-workspace bun dev
const contentBase = process.env.DIARYX_CONTENT_PATH || "./src/content/diaryx";

const diaryx = defineCollection({
  // Exclude underscore/dot folders (like _template cloned during CI builds)
  loader: glob({ pattern: ["**/*.{md,mdx}", "!_*/**", "!.*/**"], base: contentBase }),
  schema: z.object({
    // Required properties
    title: z.string(),
    author: z.string(),
    audience: z.array(z.string()),

    // Recommended properties
    created: z.date().optional(),
    updated: z.date().optional(),
    format: z.string().optional(),

    // Optional properties
    contents: z.array(z.string()).optional(),
    part_of: z.string().optional(),
    version: z.string().optional(),
    copying: z.string().optional(),
    tags: z.array(z.string()).optional(),
    aliases: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const collections = { diaryx };
