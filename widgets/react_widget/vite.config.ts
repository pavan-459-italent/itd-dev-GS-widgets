import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const devOrigin = process.env.DEV_SERVER_ORIGIN;

const absolutizeDevHtml = () => ({
  name: "absolutize-dev-html",
  transformIndexHtml(html: string) {
    if (!devOrigin) return html;

    return html
      .replace(/(href|src)=["']\/([^"']+)["']/g, `$1="${devOrigin}/$2"`)
      .replace(/from "\/([^"]+)"/g, `from "${devOrigin}/$1"`);
  },
});

export default defineConfig({
  plugins: [react(), absolutizeDevHtml()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5173,
    strictPort: true,
    allowedHosts: true,
    origin: process.env.DEV_SERVER_ORIGIN || undefined,
  },
  build: {
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      fileName: "widget",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-dom/client",
      ],
    },
  },
});
