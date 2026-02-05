// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import { remarkTransformLinks } from "./src/plugins/remarkTransformLinks";

// https://astro.build/config
export default defineConfig({
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  markdown: {
    remarkPlugins: [remarkTransformLinks],
  },

  integrations: [mdx()],
});