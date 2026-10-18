import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      // ids "categoria/slug" de outros posts
      prerequisites: z.array(z.string()).default([]),
      related: z.array(z.string()).default([]),
      cover: z.union([image(), z.string().url()]).optional(),
      coverAlt: z.string().optional(),
    }),
});

export const collections = { posts };
