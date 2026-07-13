import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const css = readFileSync(join(distDir, 'widget.css'), 'utf-8').trim();
const js = readFileSync(join(distDir, 'widget.js'), 'utf-8').trim();

const content = [
  '<style>',
  css,
  '</style>',
  '<script type="module">',
  js,
  '</script>',
  '',
].join('\n');

writeFileSync(join(distDir, 'content.html'), content);
