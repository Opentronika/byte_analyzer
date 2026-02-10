import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://opentronika.github.io',
  base: 'byte_analyzer',
   vite: {
        plugins: [tailwindcss()],
      },
  integrations: [vue(),robotsTxt()],
});