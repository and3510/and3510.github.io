// Gera public/og-default.jpg: a imagem do card de compartilhamento (LinkedIn, etc.)
// usada pelos posts sem `cover`. Rode `npm run og:default` se mudar o visual do blog.
import sharp from 'sharp';

const W = 1200;
const H = 627;
const paper = '#fbf8f2';
const ink = '#1c1917';
const muted = '#6b6359';
const accent = '#1d4e89';
const rule = '#e4ddd0';
const font = "'Noto Serif', 'DejaVu Serif', serif";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="${paper}"/>
  <rect x="0" y="0" width="${W}" height="14" fill="${accent}"/>
  <text x="600" y="150" text-anchor="middle" font-family="${font}" font-size="26"
        letter-spacing="6" fill="${muted}">NOTAS DE ESTUDO</text>
  <line x1="120" y1="190" x2="1080" y2="190" stroke="${ink}" stroke-width="2"/>
  <line x1="120" y1="197" x2="1080" y2="197" stroke="${ink}" stroke-width="2"/>
  <text x="600" y="345" text-anchor="middle" font-family="${font}" font-size="132"
        font-weight="800" fill="${ink}">DevOpsOne</text>
  <line x1="120" y1="400" x2="1080" y2="400" stroke="${rule}" stroke-width="2"/>
  <text x="600" y="470" text-anchor="middle" font-family="${font}" font-size="34"
        font-style="italic" fill="${muted}">DevOps, Cloud e SRE: cultura e infraestrutura para escalar</text>
  <text x="600" y="560" text-anchor="middle" font-family="${font}" font-size="28"
        fill="${accent}">and3510.github.io/blog</text>
</svg>`;

const info = await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile('public/og-default.jpg');
console.log(`public/og-default.jpg ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
