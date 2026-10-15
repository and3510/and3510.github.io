// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://and3510.github.io',
  base: '/blog',
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});