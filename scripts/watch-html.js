import { watchFile } from 'fs';
import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const indexSrc = path.join(root, 'index.html');
const indexDest = path.join(root, 'dist', 'index.html');

console.log('Watching index.html for changes...');

watchFile(indexSrc, { interval: 100 }, async (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    try {
      await fs.copyFile(indexSrc, indexDest);
      console.log('✓ Copied index.html to dist/ at', new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error copying index.html:', err);
    }
  }
});