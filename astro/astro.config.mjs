// @ts-check
import { defineConfig } from "astro/config";

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
    react(),
  ],

  adapter: node({
    mode: "standalone",
  }),

  experimental: {
    session: true,
  },
});
