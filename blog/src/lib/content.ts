import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  return `${BASE}${path}`;
}

const CATEGORY_NAMES: Record<string, string> = {
  'ci-cd': 'CI/CD',
};

export function getCategorySlug(post: Post): string {
  return post.id.split('/')[0];
}

export function getPostSlug(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

export function formatCategoryName(slug: string): string {
  if (CATEGORY_NAMES[slug]) return CATEGORY_NAMES[slug];
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => {
    const dateA = a.data.date?.valueOf() ?? 0;
    const dateB = b.data.date?.valueOf() ?? 0;
    return dateB - dateA;
  });
}

export async function getCategories(): Promise<{ slug: string; name: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    const slug = getCategorySlug(post);
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, name: formatCategoryName(slug), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => getCategorySlug(post) === categorySlug);
}

export function getPostUrl(post: Post): string {
  return url(`/categorias/${getCategorySlug(post)}/${getPostSlug(post)}/`);
}

// Introdução do post para o destaque: parágrafos até o primeiro subtítulo (ou lista, código,
// citação, tabela). Assim nenhum trecho aparece fora de contexto, como "Vantagens:" sem a lista.
export function getExcerpt(post: Post, maxChars = 700): string[] {
  const blocks = (post.body ?? '')
    .replace(/```[\s\S]*?```/g, '\n\n```\n\n')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const excerpt: string[] = [];
  let total = 0;
  for (const block of blocks) {
    const isParagraph = !/^(#|[-*+] |\d+\. |\||>|!\[|<|```)/.test(block);
    if (!isParagraph) {
      if (excerpt.length > 0) break; // fim da introdução
      continue; // pula o título que abre o post
    }
    if (total >= maxChars) break;
    const text = block
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!text) continue;
    const remaining = maxChars - total;
    excerpt.push(text.length > remaining ? `${text.slice(0, remaining).replace(/\s+\S*$/, '')}…` : text);
    total += text.length;
  }
  return excerpt;
}

// Resolve ids "categoria/slug" do frontmatter em posts, falhando o build se algum não existir.
export async function resolvePostRefs(post: Post, field: 'prerequisites' | 'related'): Promise<Post[]> {
  const all = await getPublishedPosts();
  return post.data[field].map((id) => {
    const found = all.find((p) => p.id === id);
    if (!found) throw new Error(`${post.id}: "${field}" referencia "${id}", que não existe`);
    return found;
  });
}
