import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://opentronika.github.io',
  base: 'byte_analyzer',
  // Astro 7 defaults to JSX whitespace compression; keep the v6 HTML behavior.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [vue()],
});
