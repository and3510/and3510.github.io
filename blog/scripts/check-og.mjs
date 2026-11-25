// Valida as meta tags Open Graph (card do LinkedIn etc.) de todas as páginas em dist/.
// Roda no CI depois do build: npm run check:og
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const blog = process.cwd();
const dist = path.join(blog, 'dist');
const SITE = 'https://and3510.github.io';

async function walk(d) {
  const out = [];
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const meta = (html, prop) => {
  const m = html.match(new RegExp(`<meta (?:property|name)="${prop}" content="([^"]*)"`));
  return m ? m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"') : null;
};

const errors = [], warnings = [];
const imgCache = new Map();
let pages = 0, withCover = 0;
for (const file of await walk(dist)) {
  const rel = path.relative(dist, file);
  if (rel === '404.html') continue;
  const html = await readFile(file, 'utf8');
  pages++;
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
    if (!meta(html, p)) errors.push(`${rel}: falta ${p}`);
  }
  const title = meta(html, 'og:title') ?? '';
  const desc = meta(html, 'og:description') ?? '';
  const img = meta(html, 'og:image') ?? '';
  const url = meta(html, 'og:url') ?? '';
  if (!url.startsWith(SITE + '/blog/')) errors.push(`${rel}: og:url inesperada ${url}`);
  if (title.length > 70) warnings.push(`${rel}: título com ${title.length} caracteres (LinkedIn corta perto de 70)`);
  if (desc === 'Notas de estudo, projetos e prática de DevOps e infraestrutura.' && rel.startsWith('categorias/') && rel.split('/').length === 4)
    warnings.push(`${rel}: post sem description própria`);
  if (!img.startsWith('https://')) { errors.push(`${rel}: og:image não é URL absoluta https: ${img}`); continue; }
  if (!img.startsWith(SITE)) continue; // imagem externa: validada só no site publicado
  if (!img.endsWith('og-default.jpg')) withCover++;
  const local = path.join(dist, decodeURI(new URL(img).pathname.replace(/^\/blog\//, '')));
  if (!imgCache.has(local)) {
    try {
      const { size } = await stat(local);
      const m = await sharp(local).metadata();
      imgCache.set(local, { size, ...m });
    } catch { imgCache.set(local, null); }
  }
  const info = imgCache.get(local);
  if (!info) errors.push(`${rel}: og:image não existe em dist (${img})`);
  else {
    if (info.width < 1200 || info.height < 627) errors.push(`${rel}: og:image ${info.width}x${info.height}, menor que 1200x627`);
    if (!['jpeg', 'png'].includes(info.format)) errors.push(`${rel}: og:image em ${info.format}, use JPG/PNG`);
    if (info.size > 5 * 1024 * 1024) errors.push(`${rel}: og:image passa de 5 MB`);
  }
}
console.log(`${pages} páginas verificadas, ${withCover} com imagem de capa própria, ${imgCache.size} imagem(ns) de card distintas`);
for (const [f, i] of imgCache) i && console.log(`  ${path.relative(dist, f)}: ${i.width}x${i.height} ${i.format} ${Math.round(i.size / 1024)} KB`);
if (warnings.length) console.log('\nAvisos:\n  ' + warnings.join('\n  '));
if (errors.length) { console.log('\nErros:\n  ' + errors.join('\n  ')); process.exit(1); }
console.log('\nSem erros.');
