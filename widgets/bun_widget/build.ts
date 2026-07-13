import { copyFileSync, mkdirSync } from "fs";

mkdirSync("./dist", { recursive: true });

await Bun.build({
  entrypoints: ["./src/main.ts"],
  outdir: "./dist",
  naming: "widget.js",
  format: "esm",
  minify: true,
});

copyFileSync("./public/index.html", "./dist/index.html");
copyFileSync("./public/widget.css", "./dist/widget.css");
