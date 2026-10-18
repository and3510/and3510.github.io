import { fileURLToPath } from 'node:url';
import { buildPostIndex, postHref } from './post-index.mjs';

const WIKILINK = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;
const SKIP_PARENTS = new Set(['link', 'linkReference']);

// Plugin mdast do Sätteri: converte [[slug]], [[categoria/slug]] e [[slug|texto]]
// (sintaxe do Obsidian) em links para os posts.
export default function wikilinks({ base = '' } = {}) {
  const { bySlug, byId } = buildPostIndex();

  function resolve(target) {
    const key = target.trim();
    if (byId.has(key)) return byId.get(key);
    const matches = bySlug.get(key);
    if (matches?.length === 1) return byId.get(matches[0]);
    return { error: matches?.length > 1 ? `ambíguo (${matches.join(', ')})` : 'não encontrado' };
  }

  return (factoryCtx) => {
    if (!factoryCtx.source.includes('[[')) return null;
    const filePath = factoryCtx.fileURL ? fileURLToPath(factoryCtx.fileURL) : '(desconhecido)';

    return {
      name: 'wikilinks',
      text(node, ctx) {
        if (!node.value.includes('[[') || SKIP_PARENTS.has(ctx.parent(node)?.type)) return;

        const out = [];
        let last = 0;
        for (const m of node.value.matchAll(WIKILINK)) {
          if (m.index > last) out.push({ type: 'text', value: node.value.slice(last, m.index) });
          const post = resolve(m[1]);
          const label = m[2] ?? post.title ?? m[1];
          if (post.error) {
            console.warn(`[wikilinks] ${filePath}: [[${m[1]}]] ${post.error}`);
            out.push({ type: 'text', value: label });
          } else {
            out.push({ type: 'link', url: postHref(base, post.id), children: [{ type: 'text', value: label }] });
          }
          last = m.index + m[0].length;
        }
        if (out.length === 0) return;
        if (last < node.value.length) out.push({ type: 'text', value: node.value.slice(last) });
        ctx.replaceNode(node, out);
      },
    };
  };
}
