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
          label: "Documentation",
          items: [
            { label: "Getting Started", link: "/getting-started" },
            { label: "How to Use", link: "/how-to-use" },
            { label: "UPI QR Format", link: "/upi-format" },
            { label: "Privacy", link: "/privacy" },
            { label: "FAQ", link: "/faq" },
          ],
        },
        {
          label: "Framework Demos",
          items: [
            { label: "React Demo", link: "/react-demo" },
            { label: "Vue Demo", link: "/vue-demo" },
            { label: "Svelte Demo", link: "/svelte-demo" },
            { label: "Plain HTML Demo", link: "/html-demo" },
          ],
        },
        {
          label: "App Pages",
          items: [
            { label: "Overview", link: "/" },
            { label: "React Island", link: "/react" },
            { label: "Vue Island", link: "/vue" },
            { label: "Svelte Island", link: "/svelte" },
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
