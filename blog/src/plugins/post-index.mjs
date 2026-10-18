import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const POSTS_DIR = fileURLToPath(new URL('../content/posts', import.meta.url));

// Índice dos posts lido direto do disco, para os plugins remark (que rodam fora da content collection).
// bySlug: "slug" -> ["categoria/slug", ...]; byId: "categoria/slug" -> { id, title }
export function buildPostIndex() {
  const bySlug = new Map();
  const byId = new Map();
  for (const category of fs.readdirSync(POSTS_DIR, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    for (const file of fs.readdirSync(path.join(POSTS_DIR, category.name))) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const id = `${category.name}/${slug}`;
      const raw = fs.readFileSync(path.join(POSTS_DIR, category.name, file), 'utf8');
      const title = raw.match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1] ?? slug;
      byId.set(id, { id, title });
      bySlug.set(slug, [...(bySlug.get(slug) ?? []), id]);
    }
  }
  return { bySlug, byId };
}

export function postHref(base, id) {
  return `${base}/categorias/${id}/`;
}
