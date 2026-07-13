import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function extractFragment() {
  return {
    name: "extract-fragment",
    writeBundle() {
      const distPath = resolve(__dirname, "dist/index.html");
      const outputPath = resolve(__dirname, "dist/content.html");

      const html = readFileSync(distPath, "utf-8");

      const styleMatches =
        html.match(/<style[^>]*>([\s\S]*?)<\/style(?:\s[^>]*)?>/gi) || [];
      const scriptMatches =
        html.match(/<script\b[^>]*>([\s\S]*?)<\/script(?:\s[^>]*)?>/gi) || [];
      const linkMatches =
        html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];

      const rootMatch = html.match(/<div id="bundled-react-test-root"><\/div>/);
      const rootDiv = rootMatch
        ? rootMatch[0]
        : '<div id="bundled-react-test-root"></div>';

      const fragment = [
        ...linkMatches,
        ...styleMatches,
        rootDiv,
        ...scriptMatches,
      ]
        .join("\n")
        .replace(/\s*crossorigin/g, "");

      writeFileSync(outputPath, fragment);
      console.log("✓ Built content.html");
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), extractFragment()],
  build: {
    target: "esnext",
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 100000,
  },
});
