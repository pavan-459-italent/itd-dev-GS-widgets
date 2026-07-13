import fs from "node:fs";
import path from "node:path";
import { globSync } from "tinyglobby";
import type { Plugin, ViteDevServer } from "vite";

interface WidgetSource {
  path: string;
  entry: string;
}

interface WidgetEntry {
  name: string;
  dir: string;
  widgetJson: Record<string, unknown>;
  hasSource: boolean;
  indexHtml: string | null;
}

function findWorkspaceRoot(startDir: string): string {
  let dir = path.resolve(startDir);
  while (true) {
    const pkgPath = path.join(dir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.workspaces) return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(
        "Could not find a package.json with workspaces field. " +
          "Make sure the widget repository has workspaces configured in the root package.json.",
      );
    }
    dir = parent;
  }
}

function resolveWorkspaceWidgets(root: string): string[] {
  const rootPkg = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf-8"),
  );
  const workspacePatterns: string[] = rootPkg.workspaces ?? [];

  const dirs = globSync(workspacePatterns, {
    cwd: root,
    onlyDirectories: true,
    absolute: true,
  });

  return dirs.filter((dir) => fs.existsSync(path.join(dir, "widget.json")));
}

function discoverWidgets(root: string): WidgetEntry[] {
  return resolveWorkspaceWidgets(root).map((dir) => {
    const widgetJson = JSON.parse(
      fs.readFileSync(path.join(dir, "widget.json"), "utf-8"),
    );
    const indexHtmlPath = path.join(dir, "index.html");
    return {
      name: path.basename(dir),
      dir,
      widgetJson,
      hasSource: fs.existsSync(path.join(dir, "src")),
      indexHtml: fs.existsSync(indexHtmlPath) ? indexHtmlPath : null,
    };
  });
}

function buildRegistry(widgets: WidgetEntry[]) {
  return widgets.map((w) => ({
    type: w.name,
    ...w.widgetJson,
    _urls: {
      dev: `/widgets/${w.name}/`,
      preview: `/widgets/${w.name}/preview`,
      content: `/widgets/${w.name}/content`,
      metadata: `/api/widgets/${w.name}`,
    },
  }));
}

const SDK_URL =
  "https://cdn-euw1.insided.com/sdk/widgets/v1/latest/widget-sdk.js";

function getWidgetTemplateContent(widget: WidgetEntry): string | null {
  if (widget.hasSource) {
    // Dev mode: reference source files so Vite transforms them with HMR
    const cssPath = path.join(widget.dir, "public/widget.css");
    const hasCSS = fs.existsSync(cssPath);
    return [
      hasCSS
        ? `<link rel="stylesheet" href="/widgets/${widget.name}/public/widget.css" />`
        : "",
      `<script type="module" src="/widgets/${widget.name}/src/main.tsx"></script>`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // Static widget: use built content from dist/
  const source = widget.widgetJson.source as WidgetSource | undefined;
  if (!source) return null;
  const contentPath = path.join(widget.dir, source.path, source.entry);
  if (!fs.existsSync(contentPath)) return null;
  return fs.readFileSync(contentPath, "utf-8");
}

function wrapWidgetContent(
  widget: WidgetEntry,
  templateContent: string,
): string {
  const defaultConfig = widget.widgetJson.defaultConfig ?? {};
  const configAttr = JSON.stringify(defaultConfig).replace(/"/g, "&quot;");
  const title = (widget.widgetJson.title as string) || widget.name;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script type="importmap">
  {
    "imports": {
      "@insided/widget-sdk": "${SDK_URL}"
    }
  }
  </script>
  <link rel="modulepreload" href="${SDK_URL}" />
</head>
<body>
  <gs-cc-registry-widget data-widget-type="${widget.name}" data-config="${configAttr}">
    <template shadowrootmode="open">
${templateContent}
    </template>
  </gs-cc-registry-widget>

  <script type="module" src="${SDK_URL}"></script>
</body>
</html>`;
}

function sendJson(res: any, data: unknown) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data, null, 2));
}

function generateDashboard(widgets: WidgetEntry[]): string {
  const widgetCards = widgets
    .map((w) => {
      const title = (w.widgetJson.title as string) || w.name;
      const desc = (w.widgetJson.description as string) || "";
      const version = (w.widgetJson.version as string) || "0.0.0";
      return `
      <div class="widget-card">
        <div class="widget-header">
          <h2>${title}</h2>
          <span class="version">v${version}</span>
          <span class="badge ${w.hasSource ? "dynamic" : "static"}">${w.hasSource ? "Dynamic" : "Static"}</span>
        </div>
        <p class="description">${desc}</p>
        <div class="endpoints">
          <h3>Endpoints</h3>
          <a href="/widgets/${w.name}/">GET /widgets/${w.name}/</a>
          <span class="endpoint-label">Dev (HMR)</span>
          <a href="/widgets/${w.name}/preview">GET /widgets/${w.name}/preview</a>
          <span class="endpoint-label">Preview (SDK + gs-cc-registry-widget)</span>
          <a href="/widgets/${w.name}/content">GET /widgets/${w.name}/content</a>
          <span class="endpoint-label">Raw content</span>
          <a href="/api/widgets/${w.name}">GET /api/widgets/${w.name}</a>
          <span class="endpoint-label">Metadata</span>
        </div>
      </div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Widget Dev Server</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; background: #f8f9fa; color: #1a1a2e; }
    h1 { margin-bottom: 0.5rem; }
    .subtitle { color: #666; margin-bottom: 2rem; font-size: 0.95rem; }
    .global-endpoints { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.25rem; margin-bottom: 2rem; }
    .global-endpoints h2 { font-size: 1rem; margin-bottom: 0.75rem; color: #444; }
    .global-endpoints a { font-family: monospace; font-size: 0.85rem; color: #0077b6; display: block; margin-bottom: 0.25rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1rem; }
    .widget-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.25rem; }
    .widget-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
    .widget-header h2 { font-size: 1.15rem; }
    .version { font-size: 0.75rem; color: #888; font-family: monospace; }
    .badge { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; }
    .badge.dynamic { background: #d4edda; color: #155724; }
    .badge.static { background: #e8f4fd; color: #0077b6; }
    .description { font-size: 0.9rem; color: #555; margin-bottom: 1rem; }
    .endpoints { border-top: 1px solid #eee; padding-top: 0.75rem; }
    .endpoints h3 { font-size: 0.8rem; text-transform: uppercase; color: #999; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .endpoints a { font-family: monospace; font-size: 0.8rem; color: #0077b6; display: inline; }
    .endpoint-label { font-size: 0.75rem; color: #888; margin-left: 0.5rem; }
    .endpoints a + .endpoint-label { margin-bottom: 0.25rem; }
    .endpoints a + .endpoint-label::after { content: ""; display: block; }
  </style>
</head>
<body>
  <h1>Widget Dev Server</h1>
  <p class="subtitle">${widgets.length} widgets registered</p>

  <div class="global-endpoints">
    <h2>Global Endpoints</h2>
    <a href="/api/registry">GET /api/registry</a> — Full widget registry
  </div>

  <div class="grid">${widgetCards}
  </div>
</body>
</html>`;
}

export function widgetsPlugin(): Plugin {
  let repoRoot: string;
  let widgets: WidgetEntry[];

  return {
    name: "vite-plugin-widgets",
    enforce: "pre",

    configResolved(config) {
      repoRoot = findWorkspaceRoot(config.root);
      widgets = discoverWidgets(repoRoot);
    },

    resolveId(source) {
      // Rewrite /widgets/<name>/src/... and /widgets/<name>/public/... to filesystem paths
      const match = source.match(/^\/widgets\/([^/]+)\/(src|public)\/(.*)/);
      if (!match) return null;

      const [, widgetName, subDir, rest] = match;
      const widget = widgets.find((w) => w.name === widgetName);
      if (!widget) return null;

      const resolved = path.join(widget.dir, subDir, rest);
      if (fs.existsSync(resolved)) return resolved;

      return null;
    },

    configureServer(server: ViteDevServer) {
      server.watcher.add(path.join(repoRoot, "widgets/*/widget.json"));

      server.middlewares.use((req, res, next) => {
        const url = req.url || "/";

        // Dashboard
        if (url === "/" || url === "/index.html") {
          widgets = discoverWidgets(repoRoot);
          res.setHeader("Content-Type", "text/html");
          res.end(generateDashboard(widgets));
          return;
        }

        // GET /api/registry — full registry
        if (url === "/api/registry") {
          widgets = discoverWidgets(repoRoot);
          sendJson(res, buildRegistry(widgets));
          return;
        }

        // GET /api/widgets/:name — single widget metadata
        const apiMatch = url.match(/^\/api\/widgets\/([^/]+)\/?$/);
        if (apiMatch) {
          const widget = widgets.find((w) => w.name === apiMatch[1]);
          if (!widget) {
            res.statusCode = 404;
            sendJson(res, { error: `Widget "${apiMatch[1]}" not found` });
            return;
          }
          sendJson(res, {
            type: widget.name,
            ...widget.widgetJson,
            _urls: {
              dev: `/widgets/${widget.name}/`,
              preview: `/widgets/${widget.name}/preview`,
              content: `/widgets/${widget.name}/content`,
            },
          });
          return;
        }

        // /widgets/:name routes
        const widgetMatch = url.match(/^\/widgets\/([^/]+)(\/.*)?$/);
        if (!widgetMatch) return next();

        const widgetName = widgetMatch[1];
        const subPath = widgetMatch[2] || "/";
        const widget = widgets.find((w) => w.name === widgetName);

        if (!widget) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(`<h1>404</h1><p>Widget "${widgetName}" not found</p>`);
          return;
        }

        // GET /widgets/:name/content — raw HTML content
        if (subPath === "/content") {
          const source = widget.widgetJson.source as WidgetSource | undefined;
          if (source) {
            const contentPath = path.join(
              widget.dir,
              source.path,
              source.entry,
            );
            if (fs.existsSync(contentPath)) {
              res.setHeader("Content-Type", "text/html");
              res.end(fs.readFileSync(contentPath, "utf-8"));
              return;
            }
          }
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end("<p>No content source defined for this widget</p>");
          return;
        }

        // GET /widgets/:name/preview — SDK preview with gs-cc-registry-widget (HMR for dynamic widgets)
        if (subPath === "/preview") {
          const templateContent = getWidgetTemplateContent(widget);
          if (templateContent) {
            const html = wrapWidgetContent(widget, templateContent);
            server
              .transformIndexHtml(`/widgets/${widgetName}/preview`, html)
              .then((transformed) => {
                res.setHeader("Content-Type", "text/html");
                res.end(transformed);
              })
              .catch(next);
            return;
          }
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end("<p>No content source defined for this widget</p>");
          return;
        }

        // GET /widgets/:name/ — preview (dynamic or static)
        if (subPath === "/" || subPath === "/index.html") {
          // Dynamic widget with index.html — Vite-transformed dev preview
          if (widget.indexHtml) {
            const html = fs.readFileSync(widget.indexHtml, "utf-8");
            server
              .transformIndexHtml(`/widgets/${widgetName}/index.html`, html)
              .then((transformed) => {
                res.setHeader("Content-Type", "text/html");
                res.end(transformed);
              })
              .catch(next);
            return;
          }

          // Static widget — serve the content entry directly
          const source = widget.widgetJson.source as WidgetSource | undefined;
          if (source) {
            const contentPath = path.join(
              widget.dir,
              source.path,
              source.entry,
            );
            if (fs.existsSync(contentPath)) {
              res.setHeader("Content-Type", "text/html");
              res.end(fs.readFileSync(contentPath, "utf-8"));
              return;
            }
          }
        }

        // Resolve file from widget root, then fall back to the dist/source directory
        const candidates = [path.join(widget.dir, subPath)];
        const source = widget.widgetJson.source as WidgetSource | undefined;
        if (source) {
          candidates.push(path.join(widget.dir, source.path, subPath));
        }

        for (const filePath of candidates) {
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            // Rewrite to /@fs/ so Vite's transform pipeline handles HMR, JSX, etc.
            (req as any).url = `/@fs${filePath}`;
            return next();
          }
        }

        next();
      });
    },
  };
}
