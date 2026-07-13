import * as esbuild from 'esbuild';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

const outdir = 'dist';

if (!existsSync(outdir)) {
  mkdirSync(outdir, { recursive: true });
}

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: `${outdir}/widget.js`,
  format: 'esm',
  target: 'es2020',
  platform: 'browser',
  minify: true,
  tsconfig: 'tsconfig.json',
  define: {
    ngDevMode: 'false',
    ngI18nClosureMode: 'false',
    ngJitMode: 'true',
  },
});

writeFileSync(`${outdir}/index.html`, '<script type="module" src="./widget.js"></script>\n');

console.log('Build complete!');
