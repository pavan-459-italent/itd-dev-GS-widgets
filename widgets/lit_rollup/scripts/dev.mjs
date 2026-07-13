import { watch } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";

const PORT = 3003;
const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
};

createServer((req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  for (const base of [".", "dist"]) {
    const file = join(process.cwd(), base, url);
    if (existsSync(file)) {
      res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "text/plain" });
      res.end(readFileSync(file));
      return;
    }
  }
  res.writeHead(404);
  res.end("Not found");
}).listen(PORT, () => console.log(`Local: http://localhost:${PORT}/`));

watch({
  input: "src/dev.ts",
  output: { file: "dist/dev.js", format: "es" },
  plugins: [resolve(), typescript()],
});
