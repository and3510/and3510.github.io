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

export function getReadingTime(post: Post): number {
  const words = (post.body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPostUrl(post: Post): string {
  return url(`/categorias/${getCategorySlug(post)}/${getPostSlug(post)}/`);
}

export function getExcerpt(post: Post, maxChars = 700): string[] {
  const body = (post.body ?? '').replace(/```[\s\S]*?```/g, '');
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block && !/^(#|[-*+] |\d+\. |\||>|!\[|<)/.test(block))
    .map((block) =>
      block
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[*_`]+/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(Boolean);

  const excerpt: string[] = [];
  let total = 0;
  for (const paragraph of paragraphs) {
    if (total >= maxChars) break;
    const remaining = maxChars - total;
    excerpt.push(paragraph.length > remaining ? `${paragraph.slice(0, remaining).replace(/\s+\S*$/, '')}…` : paragraph);
    total += paragraph.length;
  }
  return excerpt;
}
