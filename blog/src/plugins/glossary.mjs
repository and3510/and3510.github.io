import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildPostIndex, postHref } from './post-index.mjs';

const GLOSSARY_PATH = fileURLToPath(new URL('../data/glossary.json', import.meta.url));
const SKIP_PARENTS = new Set(['link', 'linkReference', 'heading']);

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Plugin mdast do Sätteri: marca a primeira ocorrência de cada termo do glossário em um post
// com um tooltip (e um link, quando o termo tem um post dedicado).
export default function glossary({ base = '' } = {}) {
  const entries = JSON.parse(fs.readFileSync(GLOSSARY_PATH, 'utf8'));
  const { byId } = buildPostIndex();

  const terms = entries.flatMap((entry) => {
    if (entry.post && !byId.has(entry.post)) {
      console.warn(`[glossary] "${entry.term}": post "${entry.post}" não existe`);
    }
    return [entry.term, ...(entry.aliases ?? [])].map((text) => ({
      entry,
      regex: new RegExp(`(?<![\\p{L}\\p{N}_/-])${escapeRegex(text)}(?![\\p{L}\\p{N}_/-])`, 'u'),
    }));
  });

  return (factoryCtx) => {
    const currentId = factoryCtx.fileURL
      ? fileURLToPath(factoryCtx.fileURL).match(/posts\/([^/]+\/[^/]+)\.md$/)?.[1]
      : undefined;
    const used = new Set();

    return {
      name: 'glossary',
      text(node, ctx) {
        if (SKIP_PARENTS.has(ctx.parent(node)?.type)) return;

        let parts = [node];
        for (const { entry, regex } of terms) {
          if (used.has(entry.term)) continue;
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part.type !== 'text') continue;
            const m = regex.exec(part.value);
            if (!m) continue;
            used.add(entry.term);
            const def = escapeHtml(entry.definition);
            const link = entry.post && entry.post !== currentId && byId.has(entry.post);
            const html = link
              ? `<a class="gloss" href="${postHref(base, entry.post)}" data-def="${def}">${escapeHtml(m[0])}</a>`
              : `<span class="gloss" tabindex="0" data-def="${def}">${escapeHtml(m[0])}</span>`;
            const after = part.value.slice(m.index + m[0].length);
            parts.splice(
              i,
              1,
              ...[
                m.index > 0 && { type: 'text', value: part.value.slice(0, m.index) },
                { type: 'html', value: html },
                after && { type: 'text', value: after },
              ].filter(Boolean),
            );
            break;
          }
        }
        if (parts.length > 1) ctx.replaceNode(node, parts);
      },
    };
  };
}
