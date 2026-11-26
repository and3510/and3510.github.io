// Gera no build o card de compartilhamento (LinkedIn etc.) de cada post: /og/<categoria>/<slug>.jpg
// Usado como og:image dos posts sem `cover`. Layout "jornal": marca + categoria, linha dupla, título grande.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { getPublishedPosts, getCategorySlug, formatCategoryName, type Post } from '../../lib/content';

const W = 1200;
const H = 627;
const C = { paper: '#fbf8f2', ink: '#1c1917', muted: '#6b6359', rule: '#e4ddd0', accent: '#1d4e89' };

const fontDir = path.join(process.cwd(), 'src/assets/fonts');
const fontsPromise = Promise.all(
  [
    ['Inter-Medium.ttf', 500],
    ['Inter-Bold.ttf', 700],
    ['Inter-ExtraBold.ttf', 800],
  ].map(async ([file, weight]) => ({
    name: 'Inter',
    data: await readFile(path.join(fontDir, file as string)),
    weight: weight as 500 | 700 | 800,
    style: 'normal' as const,
  })),
);

// Mesmo tamanho de título que cabe em até 3–4 linhas no espaço do card.
function titleSize(title: string): number {
  if (title.length <= 34) return 100;
  if (title.length <= 46) return 88;
  if (title.length <= 70) return 76;
  return 64;
}

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

function card(post: Post): Node {
  const title = post.data.title;
  const size = titleSize(title);
  return el('div', {
    // O satori soma o padding ao tamanho (content-box), então desconta aqui.
    width: W - 180,
    height: H - 44,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 44,
    paddingLeft: 90,
    paddingRight: 90,
    background: C.paper,
    color: C.ink,
    fontFamily: 'Inter',
  }, [
    el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, [
      el('div', { fontSize: 44, fontWeight: 800, letterSpacing: -1.3 }, 'DevOpsOne'),
      el('div', { fontSize: 28, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.accent, paddingBottom: 6 },
        formatCategoryName(getCategorySlug(post))),
    ]),
    // Linha dupla, como a do menu do blog.
    el('div', { display: 'flex', height: 8, marginTop: 16, borderTop: `2px solid ${C.ink}`, borderBottom: `2px solid ${C.ink}` }),
    el('div', { display: 'flex', flexGrow: 1, alignItems: 'center' }, [
      el('div', { fontSize: size, fontWeight: 800, letterSpacing: -size * 0.035, lineHeight: 1.04, textWrap: 'balance' }, title),
    ]),
    el('div', {
      display: 'flex',
      borderTop: `2px solid ${C.rule}`,
      paddingTop: 24,
      paddingBottom: 38,
      fontSize: 30,
      fontWeight: 500,
      color: C.muted,
    }, 'and3510.github.io/blog'),
  ]);
}

export const getStaticPaths = (async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const svg = await satori(card((props as { post: Post }).post) as never, { width: W, height: H, fonts: await fontsPromise });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
  const jpg = await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
};
