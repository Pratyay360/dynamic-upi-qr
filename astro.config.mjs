// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  integrations: [
    starlight({
      title: "Dynamic UPI",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },
      sidebar: [
        {
          label: "Framework Demos",
          items: [
            { label: "Overview", link: "/" },
            { label: "React", link: "/react" },
            { label: "Vue", link: "/vue" },
            { label: "Svelte", link: "/svelte" },
            { label: "Plain HTML", link: "/html" },
          ],
        },
      ],
    }),
    react(),
    vue(),
    svelte(),
  ],
});
