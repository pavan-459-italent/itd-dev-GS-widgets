import { watch } from "fs";

async function rebuild() {
  await Bun.build({
    entrypoints: ["./src/main.ts"],
    outdir: "./public",
    naming: "widget.js",
    format: "esm",
  });
}

await rebuild();

watch("./src", { recursive: true }, () => { rebuild(); });

const server = Bun.serve({
  port: 5451,
  fetch(req) {
    const url = new URL(req.url);
    const filePath = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const file = Bun.file(`./public/${filePath}`);
    return new Response(file);
  },
});

