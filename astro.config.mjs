import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jaimerc.es',
  output: 'static',
  // Preservar el manejo de whitespace HTML-aware previo a Astro 7
  // (v7 cambió el default a 'jsx', que elimina espacios entre elementos inline).
  compressHTML: true,
  integrations: [
      icon(),
      sitemap({
        i18n: {
          defaultLocale: 'es',
          locales: {
            es: 'es',
            en: 'en',
          },
        },
        changefreq: 'monthly',
        lastmod: new Date(),
      })
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es","en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
});