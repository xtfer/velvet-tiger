import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function buildSite() {
  // 1) Copy index.html into dist/index.html with rewritten asset paths
  const indexSrc = path.join(root, 'index.html');
  const indexDest = path.join(distDir, 'index.html');
  let html = await fs.readFile(indexSrc, 'utf8');

  // Rewrite asset paths for files that live inside dist when served as root
  html = html
    .replace(/href="dist\/style.css"/g, 'href="style.css"')
    .replace(/src="dist\/components.js"/g, 'src="components.js"')
    .replace(/src="dist\/main.js"/g, 'src="main.js"');

  await ensureDir(distDir);
  await fs.writeFile(indexDest, html, 'utf8');

  // 2) Copy images directory into dist/images (if it exists)
  const imagesSrc = path.join(root, 'images');
  try {
    const stat = await fs.stat(imagesSrc);
    if (stat.isDirectory()) {
      await copyDir(imagesSrc, path.join(distDir, 'images'));
    }
  } catch (_) {
    // no images dir; ignore
  }

  // 3) Optional: copy any other static files as needed (robots.txt, favicon, etc.)
}

buildSite().catch((err) => {
  console.error('Error building site into dist:', err);
  process.exit(1);
});
