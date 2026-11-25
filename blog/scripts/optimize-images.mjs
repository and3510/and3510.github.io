// Otimiza as imagens-fonte do blog antes do commit, para o repositório não crescer.
//
//   npm run images          converte JPG/PNG para WebP, limita a largura e atualiza os .md
//   npm run images:check    só verifica (usado no pre-commit e no CI); sai com erro se algo passar do limite
//
// As versões responsivas (640px, 1080px, ...) são geradas pelo Astro no build e não vão para o git.
import { readdir, readFile, writeFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOTS = ['src/content/posts', 'src/assets'];
const MAX_WIDTH = 1600;
const MAX_BYTES = 400 * 1024;
const CONVERT = new Set(['.jpg', '.jpeg', '.png']);
const IMAGES = new Set([...CONVERT, '.webp', '.avif']);

const checkOnly = process.argv.includes('--check');

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return files.flat();
}

const files = (await Promise.all(ROOTS.map(walk))).flat();
const images = files.filter((f) => IMAGES.has(path.extname(f).toLowerCase()));
const markdown = files.filter((f) => f.endsWith('.md'));

const problems = [];
const renamed = new Map(); // caminho antigo absoluto -> novo absoluto

for (const file of images) {
  const ext = path.extname(file).toLowerCase();
  const { size } = await stat(file);
  const { width = 0 } = await sharp(file).metadata();
  const needsWork = CONVERT.has(ext) || width > MAX_WIDTH || size > MAX_BYTES;
  if (!needsWork) continue;

  if (checkOnly) {
    problems.push(`${file} (${ext}, ${width}px, ${Math.round(size / 1024)} KB)`);
    continue;
  }

  const out = file.slice(0, -ext.length) + '.webp';
  // .rotate() aplica a orientação do EXIF; o sharp descarta os metadados (inclusive GPS de foto de celular).
  const data = await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: ext === '.png' ? 90 : 80, effort: 6 })
    .toBuffer();
  await writeFile(out, data);
  if (out !== file) {
    await unlink(file);
    renamed.set(path.resolve(file), path.resolve(out));
  }
  console.log(`${file}: ${Math.round(size / 1024)} KB -> ${path.basename(out)} ${Math.round(data.length / 1024)} KB`);
  if (data.length > MAX_BYTES) problems.push(`${out} ainda tem ${Math.round(data.length / 1024)} KB`);
}

// Atualiza referências relativas nos .md (corpo e frontmatter `cover:`).
if (renamed.size) {
  for (const md of markdown) {
    const src = await readFile(md, 'utf8');
    const dir = path.dirname(md);
    const next = src.replace(/\.{1,2}\/[^\s)"']+\.(?:jpe?g|png)/gi, (ref) => {
      const target = renamed.get(path.resolve(dir, ref));
      return target ? ref.slice(0, -path.extname(ref).length) + '.webp' : ref;
    });
    if (next !== src) {
      await writeFile(md, next);
      console.log(`referências atualizadas: ${md}`);
    }
  }
}

if (problems.length) {
  console.error(
    `\nImagens fora do padrão (WebP/AVIF, até ${MAX_WIDTH}px e ${MAX_BYTES / 1024} KB):\n  ` +
      problems.join('\n  ') +
      (checkOnly ? '\n\nRode `npm run images` dentro de blog/ para corrigir.' : ''),
  );
  process.exit(1);
}
if (checkOnly) console.log(`${images.length} imagem(ns) dentro do padrão.`);
