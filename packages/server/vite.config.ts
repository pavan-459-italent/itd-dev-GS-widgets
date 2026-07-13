import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { widgetsPlugin } from "./src/vite-plugin-widgets.ts";

export default defineConfig({
  plugins: [react(), widgetsPlugin()],
  server: {
    fs: {
      allow: ["../.."],
    },
  },
});
