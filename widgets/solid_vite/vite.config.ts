import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      fileName: "widget",
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web"],
    },
  },
});
