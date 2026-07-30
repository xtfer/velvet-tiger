#!/usr/bin/env node
/**
 * Generate Velvet Tiger wordmark logo variants.
 * Horizontal + stacked × ink + white (+ accent) → SVG + PNG (transparent).
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const require = createRequire(import.meta.url);
const opentype = require('opentype.js');
const { Resvg } = require('@resvg/resvg-js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'logos');
const tmpDir = path.join(outDir, '.tmp');
const vfPath = path.join(tmpDir, 'Syne.ttf');
const instancePath = path.join(tmpDir, 'Syne-SemiBold.ttf');

fs.mkdirSync(tmpDir, { recursive: true });

if (!fs.existsSync(vfPath)) {
  console.error('Missing', vfPath);
  process.exit(1);
}

execFileSync('python3', [
  '-c',
  `
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
font = TTFont(${JSON.stringify(vfPath)})
instantiateVariableFont(font, {'wght': 600}, inplace=True)
font.save(${JSON.stringify(instancePath)})
print('instanced')
`,
]);

const buf = fs.readFileSync(instancePath);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const COLORS = {
  ink: '#141414',
  white: '#FFFFFF',
  accent: '#0E4D4A',
};

function round(n) {
  return Math.round(n * 1000) / 1000;
}

/** Convert opentype path commands to cubic-only absolute SVG path data (Resvg-safe). */
function toCubicD(otPath) {
  let d = '';
  let cx = 0;
  let cy = 0;
  let startX = 0;
  let startY = 0;

  for (const c of otPath.commands) {
    if (c.type === 'M') {
      cx = c.x;
      cy = c.y;
      startX = cx;
      startY = cy;
      d += `M${round(c.x)} ${round(c.y)}`;
    } else if (c.type === 'L') {
      cx = c.x;
      cy = c.y;
      d += `L${round(c.x)} ${round(c.y)}`;
    } else if (c.type === 'C') {
      d += `C${round(c.x1)} ${round(c.y1)} ${round(c.x2)} ${round(c.y2)} ${round(c.x)} ${round(c.y)}`;
      cx = c.x;
      cy = c.y;
    } else if (c.type === 'Q') {
      const x1 = cx + (2 / 3) * (c.x1 - cx);
      const y1 = cy + (2 / 3) * (c.y1 - cy);
      const x2 = c.x + (2 / 3) * (c.x1 - c.x);
      const y2 = c.y + (2 / 3) * (c.y1 - c.y);
      d += `C${round(x1)} ${round(y1)} ${round(x2)} ${round(y2)} ${round(c.x)} ${round(c.y)}`;
      cx = c.x;
      cy = c.y;
    } else if (c.type === 'Z') {
      d += 'Z';
      cx = startX;
      cy = startY;
    }
  }
  return d;
}

function layoutText(lines, fontSize, paddingX, paddingY, lineGap) {
  const probes = lines.map((t) => font.getPath(t, 0, 0, fontSize).getBoundingBox());
  const contentWidth = Math.max(...probes.map((b) => b.x2 - b.x1));
  const lineHeights = probes.map((b) => b.y2 - b.y1);
  const width = Math.ceil(contentWidth + paddingX * 2);
  const height = Math.ceil(
    lineHeights.reduce((a, h) => a + h, 0) + lineGap * (lines.length - 1) + paddingY * 2
  );

  const paths = [];
  let yCursor = paddingY;

  lines.forEach((text, i) => {
    const b = probes[i];
    const x = paddingX + (contentWidth - (b.x2 - b.x1)) / 2 - b.x1;
    const y = yCursor - b.y1;
    paths.push(toCubicD(font.getPath(text, x, y, fontSize)));
    yCursor += lineHeights[i] + lineGap;
  });

  return { width, height, paths };
}

function wrapSvg(width, height, paths, fill) {
  const pathEls = paths.map((d) => `  <path d="${d}" fill="${fill}"/>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none" role="img" aria-label="Velvet Tiger">
  <title>Velvet Tiger</title>
${pathEls}
</svg>
`;
}

function buildHorizontal(fill) {
  const { width, height, paths } = layoutText(['Velvet Tiger'], 72, 24, 28, 0);
  return wrapSvg(width, height, paths, fill);
}

function buildStacked(fill) {
  const { width, height, paths } = layoutText(['Velvet', 'Tiger'], 72, 24, 28, 8);
  return wrapSvg(width, height, paths, fill);
}

function writeSvg(name, svg) {
  const file = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(file, svg);
  console.log('wrote', path.relative(root, file));
}

function writePng(name, svg, scale = 3) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: scale },
    background: 'rgba(0,0,0,0)',
  });
  const file = path.join(outDir, `${name}.png`);
  fs.writeFileSync(file, resvg.render().asPng());
  console.log('wrote', path.relative(root, file));
}

const variants = [
  { name: 'velvet-tiger-horizontal-ink', builder: buildHorizontal, color: COLORS.ink },
  { name: 'velvet-tiger-horizontal-white', builder: buildHorizontal, color: COLORS.white },
  { name: 'velvet-tiger-stacked-ink', builder: buildStacked, color: COLORS.ink },
  { name: 'velvet-tiger-stacked-white', builder: buildStacked, color: COLORS.white },
  { name: 'velvet-tiger-horizontal-accent', builder: buildHorizontal, color: COLORS.accent },
  { name: 'velvet-tiger-stacked-accent', builder: buildStacked, color: COLORS.accent },
];

for (const v of variants) {
  const svg = v.builder(v.color);
  writeSvg(v.name, svg);
  writePng(v.name, svg);
}

console.log('Done.');
