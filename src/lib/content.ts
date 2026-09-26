import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

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
