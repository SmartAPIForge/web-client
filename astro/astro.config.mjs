// @ts-check
import { defineConfig } from "astro/config";
import paraglide from "@inlang/paraglide-astro";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",

  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },

  integrations: [
    paraglide({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    react(),
  ],

  adapter: node({
    mode: "standalone",
  }),

  experimental: {
    session: true,
  }
});