import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 5179, strictPort: true },
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
      fileName: "widget",
    },
  },
});
