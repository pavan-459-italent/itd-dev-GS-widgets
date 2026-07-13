import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
      fileName: "widget",
    },
    rollupOptions: {
      external: ["svelte"],
    },
  },
});
