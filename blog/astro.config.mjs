// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import wikilinks from './src/plugins/wikilinks.mjs';
import glossary from './src/plugins/glossary.mjs';

const base = '/blog';

// https://astro.build/config
export default defineConfig({
  site: 'https://and3510.github.io',
  base,
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
    processor: satteri({ mdastPlugins: [wikilinks({ base }), glossary({ base })] })
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
