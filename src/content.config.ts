// src/content.config.ts - Astro 6 Content Layer API
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { diaryxLoader } from "./loaders/diaryx";

const diaryx = defineCollection({
  // Uses @diaryx/wasm-node for frontmatter parsing (diaryx_core is the single source of truth).
  // Content path configurable via DIARYX_CONTENT_PATH env or defaults to ./src/content/diaryx.
  loader: diaryxLoader(),
  schema: z.object({
    // Required properties
    title: z.string(),
    author: z.string().optional(),
    audience: z.array(z.string()).optional(),

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
