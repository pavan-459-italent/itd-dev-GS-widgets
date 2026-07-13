import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function extractFragment(): Plugin {
  return {
    name: "extract-fragment",
    writeBundle() {
      const distDir = resolve(__dirname, "dist");
      const assetsDir = resolve(distDir, "assets");
      const cssPath = resolve(__dirname, "src/App.css");
      const outputPath = resolve(__dirname, "content.html");

      const jsFile = readdirSync(assetsDir).find((f) => f.endsWith(".js"));
      const js = jsFile ? readFileSync(resolve(assetsDir, jsFile), "utf-8") : "";
      const css = readFileSync(cssPath, "utf-8");

      const fragment = `<style>${css}</style>\n<hello-world-widget></hello-world-widget>\n<script>${js}</script>`;

      writeFileSync(outputPath, fragment);
      console.log("✓ Built content.html");
    },
  };
}

export default defineConfig({
  base: "/__BASE_URL__",
  plugins: [react(), extractFragment()],
  build: {
    target: "esnext",
    minify: true,
    cssMinify: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: "images/[name][extname]",
      },
    },
  },
});
