import * as esbuild from "esbuild";
import { copyFileSync, mkdirSync } from "fs";

mkdirSync("dist", { recursive: true });
copyFileSync("public/index.html", "dist/index.html");
copyFileSync("public/widget.css", "dist/widget.css");

await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/widget.js",
  minify: true,
});
