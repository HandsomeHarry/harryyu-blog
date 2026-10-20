import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// Static output, no adapter, no client frameworks.
// Zero third-party requests at runtime: fonts are self-hosted via @fontsource.
export default defineConfig({
  site: "https://harryyu.dev",
  output: "static",
  integrations: [mdx()],
  build: {
    inlineStylesheets: "auto",
  },
});
