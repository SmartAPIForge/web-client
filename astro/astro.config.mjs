// @ts-check
import { defineConfig } from "astro/config";
import paraglide from "@inlang/paraglide-astro";

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },
  integrations: [
    paraglide({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
  ],
});
