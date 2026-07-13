import { renameSync, writeFileSync, existsSync } from "fs";

const distDir = existsSync("dist/browser") ? "dist/browser" : "dist";

renameSync(`${distDir}/main.js`, `${distDir}/widget.js`);

const polyfillsLine = existsSync(`${distDir}/polyfills.js`)
  ? `<script type="module" src="./polyfills.js"></script>\n`
  : "";

writeFileSync(
  `${distDir}/index.html`,
  `<link rel="stylesheet" href="./styles.css">\n${polyfillsLine}<script type="module" src="./widget.js"></script>\n`
);
