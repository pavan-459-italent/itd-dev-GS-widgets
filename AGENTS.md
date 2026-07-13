# AGENTS.md

## Project overview

This repository is a template for building and publishing widgets using the Widget Platform's `source` block pattern.
Widgets are defined in `widgets/<widget_name>/` with `widget.json` and `content.html` (or a `dist/` directory for
multi-file widgets), and the registry is generated into `widget_registry.json`.

## Setup commands

- Install dependency (required): `jq`
  - macOS: `brew install jq`
  - Linux: `sudo apt-get install jq` or `sudo yum install jq`

## Common commands

- Build registry: `./bin/build-registry.sh`
- Dry run (no file write): `./bin/build-registry.sh --dry-run`
- Validate existing registry: `./bin/build-registry.sh --validate`

## Repository structure

```
.
├── bin/build-registry.sh
├── config/defaults.json
├── widget_registry.json
└── widgets/
    ├── WIDGET_SETUP.md
    ├── <simple_widget>/
    │   ├── widget.json
    │   └── content.html
    └── <multi_file_widget>/
        ├── widget.json
        └── dist/
            ├── content.html
            └── assets/
                ├── styles.css
                └── script.js
```

## Widget authoring rules

- Create one directory per widget under `widgets/`.
- `widget.json` is required and must include:
  - `version` (semver), `title`, `description`
- The widget `type` is derived from the directory name; use lowercase and underscores.
- Entry file (default: `content.html`) is required:
  - For simple widgets: place `content.html` directly in the widget directory
  - For multi-file widgets: place files in a `dist/` directory with `content.html` as entry
- The entry file must be an HTML fragment (no `<html>`, `<head>`, or `<body>` tags)
- Multi-file widgets can use relative paths to assets (CSS, JS, images) - the platform automatically transforms them
- Absolute public URLs (CDNs, fonts) are always allowed
- Do not edit `widget_registry.json` manually; always run the build script.

## Source Block Schema

The registry uses the `source` block pattern for repository-hosted widgets:

```json
{
  "source": {
    "path": "widgets/my_widget",
    "entry": "content.html"
  }
}
```

- `path`: Directory path relative to repository root (auto-detected: uses `dist/` if present)
- `entry`: HTML entry point file relative to path (default: `content.html`)

The build script automatically detects if a widget has a `dist/` directory and sets the path accordingly.

## Defaults and overrides

- Global defaults live in `config/defaults.json`.
- `widget.json` can override defaults and define:
  - `category`, `imageName`, `imageSrc`, `configuration`, `defaultConfig`, and other widget settings.
  - `sourcePath` - Override the auto-detected source path
  - `sourceEntry` - Override the default entry file name
- When using `configuration`, template variables in `content.html` use `{{ variable_name }}`.

## Publishing notes

- `widget_registry.json` must be at the repo root.
- A watched GitHub branch triggers publishing when you push.
- Widget `type` values must be unique within a community.

## Quick Start for AI Agents

When helping users create widgets:

1. **Understand the widget type needed** (simple HTML, multi-file, configurable, or React/modern framework)
2. **Create widget structure** in `widgets/<widget_name>/` with `widget.json` and content files
3. **Follow the workflow** in section "AI Agent Guidelines for Widget Creation" below
4. **Build and validate** using `./bin/build-registry.sh --dry-run` before final build

## AI Agent Guidelines for Widget Creation

When helping users create widgets, follow these guidelines:

### 1. Widget Creation Workflow

**Step 1: Understand Requirements**

- Ask about widget purpose, functionality, and visual design
- Determine if widget needs configuration options
- Identify if widget needs external API calls (requires connectors/secrets)
- Decide if widget needs multiple files (CSS, JS, images) or can be a single HTML file
- Decide if widget needs a build tool (React/Vue/etc.) or can be plain HTML/CSS/JS

**Step 2: Create Widget Structure**

For simple single-file widgets:

```bash
mkdir widgets/<widget_name>
touch widgets/<widget_name>/widget.json
touch widgets/<widget_name>/content.html
```

For multi-file widgets (with separate CSS, JS, images):

```bash
mkdir -p widgets/<widget_name>/dist/assets
touch widgets/<widget_name>/widget.json
touch widgets/<widget_name>/dist/content.html
```

**Step 3: Write widget.json**

- Always include required fields: `version`, `title`, `description`
- Use semantic versioning (start with "1.0.0")
- Add `category` for organization
- Add `configuration` and `defaultConfig` if widget needs customization
- `configuration.properties` must be an **array** of property objects (not an object/map)
- See examples in `widgets/demo_widget/`, `widgets/card_grid/`, `widgets/bundled_react_test/`

**Step 4: Write content files**

- Entry file must be an HTML fragment (no `<html>`, `<head>`, `<body>` tags)
- For single-file widgets: inline all CSS in `<style>` tags and JavaScript in `<script>` tags
- For multi-file widgets: use relative paths to assets (e.g., `<link href="assets/styles.css">`)
- Use template variables `{{ variable_name }}` for configuration values
- Absolute URLs for CDNs (fonts, libraries, etc.) are always allowed

**Step 5: Build and Validate**

```bash
./bin/build-registry.sh --dry-run  # Preview first
./bin/build-registry.sh            # Build registry
```

### 2. Widget Types and Patterns

**Simple HTML Widget** (like `demo_widget`)

- Plain HTML/CSS/JavaScript in a single file
- No build step required
- Best for static content or simple interactivity

**Multi-File Widget** (like `html_paths_test`, `css_paths_test`)

- Uses `dist/` directory with `content.html` and `assets/` folder
- Can reference CSS, JS, and images with relative paths
- Platform automatically transforms relative paths to hosted URLs after publishing

**Configurable Widget** (like `card_grid`)

- Uses `configuration` in `widget.json` to define user-configurable properties
- Uses `{{ variable_name }}` template variables in `content.html`
- Supports types: `text`, `number`, `color`, `select`
- Properties are defined as an array in `configuration.properties`
- See `widgets/card_grid/widget.json` for complete example

**React/Modern Framework Widget** (like `bundled_react_test`)

- Uses build tools (Vite, Webpack, etc.)
- Build output goes to `dist/` directory with `content.html` as entry
- Can output multiple files (JS chunks, CSS, assets)
- See `widgets/bundled_react_test/vite.config.ts` for Vite example

### 3. Configuration Schema Pattern

When creating configurable widgets, use this pattern:

```json
{
  "configuration": {
    "properties": [
      {
        "name": "property_name",
        "type": "text",
        "label": "Display Label",
        "defaultValue": "default value",
        "rules": {
          "required": true
        }
      }
    ]
  },
  "defaultConfig": {
    "property_name": "default value"
  }
}
```

**Key points:**

- `properties` is an **array** of property objects (not an object/map)
- Each property must have: `name`, `type`, `label`, `defaultValue`
- `rules` object is optional and can contain: `required` (boolean), `minimum` (number), `maximum` (number)
- `required` is defined per-property in `rules`, not as a separate array

**Supported property types:**

- `text` - Single line text input
- `number` - Numeric input (can use `minimum`/`maximum` in rules)
- `color` - Color picker
- `select` - Dropdown selection (requires `options` array with `value` and `label`)

**Note:** Template variables (`{{ variable_name }}`) are simple string replacements. They cannot evaluate JavaScript expressions. For conditional logic, use CSS classes or JavaScript in `<script>` tags.

**Select type example:**

```json
{
  "name": "card_style",
  "type": "select",
  "label": "Card Style",
  "defaultValue": "shadow",
  "options": [
    { "value": "flat", "label": "Flat" },
    { "value": "shadow", "label": "Shadow" },
    { "value": "bordered", "label": "Bordered" }
  ]
}
```

Then use in `content.html`:

```html
<div style="color: {{ property_name }}">Content</div>
```

### 4. External API Integration

If widget needs to call external APIs:

**Option A: Public APIs (no auth)**

- Use `fetch()` directly in widget JavaScript
- No special setup needed

**Option B: Private APIs (requires auth)**

- Use Widget Service Connectors (server-side proxy)
- Create secrets for API keys/tokens in the Community Control Panel
- Create connectors that reference secrets in the Community Control Panel
- Visit the connectors/secrets page in the Community Control Panel to learn how to create and use them
- Widget calls connector endpoint: `/widget-service/connectors/{permalink}/execute`

**Example connector pattern:**

1. Create a secret with the API key
2. Create a connector with URL and auth config using `{{ get_secret('secret_name') }}`
3. Widget JavaScript calls the connector endpoint

### 5. Build Tool Configuration

For React/Vue/other frameworks, build output should go to `dist/` directory:

**Vite Example** (see `widgets/bundled_react_test/vite.config.ts`):

- Configure output directory to `dist/`
- Entry point should be `content.html`
- Assets can be placed in `dist/assets/`

**Key Requirements:**

- Entry file must be an HTML fragment (no `<html>`, `<head>`, `<body>` tags)
- Can use relative paths to assets in the same directory
- The platform transforms relative paths to hosted URLs after publishing
- External absolute URLs are always allowed

**Multi-File Widget Benefits:**

- Separate CSS files for better organization
- JavaScript modules with code splitting
- Image and font assets in `assets/` folder
- Platform handles URL transformation automatically

### 6. Best Practices

**Naming:**

- Widget directory names: lowercase with underscores (e.g., `my_widget`)
- Directory name becomes widget `type` field
- Keep names descriptive but concise

**Versioning:**

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Bump version when making changes
- Start new widgets at "1.0.0"

**Code Quality:**

- Write self-documenting code (avoid comments)
- Use modern CSS (Grid, Flexbox, CSS Variables)
- Use modern JavaScript (ES6+, async/await)
- Ensure responsive design (mobile-friendly)
- Test widget in isolation before building registry

**Security:**

- Never hardcode API keys or secrets in `content.html`
- Use connectors/secrets for authenticated API calls
- Sanitize user inputs if widget accepts user data
- Use HTTPS for external resources

**Performance:**

- Minimize external dependencies
- Use CDN resources when possible (faster, cached)
- Optimize images (use appropriate formats, sizes)
- Consider lazy loading for heavy widgets

### 7. Example Widget Creation

**Creating a simple banner widget:**

1. Create directory: `widgets/banner_widget/`
2. Create `widget.json`:

```json
{
  "version": "1.0.0",
  "title": "Banner Widget",
  "description": "A customizable banner with text and background color",
  "category": "Content",
  "configuration": {
    "properties": [
      {
        "name": "banner_text",
        "type": "text",
        "label": "Banner Text",
        "defaultValue": "Welcome!",
        "rules": {
          "required": true
        }
      },
      {
        "name": "background_color",
        "type": "color",
        "label": "Background Color",
        "defaultValue": "#3b82f6"
      }
    ]
  },
  "defaultConfig": {
    "banner_text": "Welcome!",
    "background_color": "#3b82f6"
  }
}
```

**Note:** `properties` is an array. Each property object includes `name`, `type`, `label`, `defaultValue`, and optionally `rules` and `options` (for `select` type).

3. Create `content.html`:

```html
<style>
  .banner {
    background-color: {{ background_color }};
    color: white;
    padding: 2rem;
    text-align: center;
    border-radius: 8px;
  }
</style>
<div class="banner">
  <h1>{{ banner_text }}</h1>
</div>
```

4. Build registry: `./bin/build-registry.sh`

### 8. Testing Widgets

**Before building registry:**

- Validate JSON syntax: `jq . widgets/<widget_name>/widget.json`
- Check HTML fragment structure (no `<html>`, `<head>`, `<body>`)
- Verify template variables match configuration properties
- Test responsive design at different screen sizes

**After building registry:**

- Run `./bin/build-registry.sh --validate` to check registry
- Verify widget appears in `widget_registry.json`
- Check source path is correct: `widgets/<widget_name>` or `widgets/<widget_name>/dist`

### 9. Common Patterns

**Responsive Grid:**

```html
<style>
  .grid {
    display: grid;
    grid-template-columns: repeat({{columns}}, 1fr);
    gap: 1rem;
  }
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Dynamic Styling:**

```html
<style>
  .widget {
    background-color: {{ bg_color }};
    color: {{ text_color }};
    padding: {{ padding }}px;
  }
</style>
```

**Conditional Rendering (using CSS classes):**
Template variables are simple string replacements, not JavaScript expressions. Use CSS classes for conditional styling:

```html
<style>
  .show-border-yes .widget {
    border: 2px solid {{ accent_color }};
  }
  .show-border-no .widget {
    border: none;
  }
</style>
<div class="widget show-border-{{ show_border }}">Content</div>
```

**Alternative: Use JavaScript for dynamic logic:**

```html
<div class="widget" data-show-border="{{ show_border }}">Content</div>
<script>
  const widget = document.querySelector(".widget");
  if (widget.dataset.showBorder === "yes") {
    widget.classList.add("bordered");
  }
</script>
```

### 10. Testing Commands

Quick reference for testing widgets:

```bash
# Validate widget JSON syntax
jq . widgets/<widget_name>/widget.json

# Preview registry build (no file write)
./bin/build-registry.sh --dry-run

# Build registry
./bin/build-registry.sh

# Validate existing registry
./bin/build-registry.sh --validate
```

### 11. Troubleshooting

**"jq: command not found"**

- Install `jq`: `brew install jq` (macOS) or `sudo apt-get install jq` (Linux)

**"Missing required field"**

- Ensure `widget.json` has: `version`, `title`, `description`
- Check JSON syntax is valid

**"Missing entry file"**

- Verify `content.html` exists in widget directory or `dist/` subdirectory
- Check filename matches `sourceEntry` in defaults (default: "content.html")
- For multi-file widgets, ensure `dist/content.html` exists

**Widget not appearing in registry**

- Run `./bin/build-registry.sh --dry-run` to see errors
- Check widget directory name matches expected pattern
- Verify all required files exist

**Template variables not working**

- Ensure variable names match between `configuration.properties` array items and `content.html`
- Each property in the `properties` array must have a matching `name` field
- Use exact syntax: `{{ variable_name }}` (double curly braces)
- Check `defaultConfig` has matching property names (keys match `name` values from properties)

**Build tool not outputting fragment**

- Configure build to output HTML fragment (no `<html>`, `<head>`, `<body>`)
- Output to `dist/` directory with `content.html` as entry
- See `widgets/bundled_react_test/vite.config.ts` for reference

### 12. Reference Examples

- **Simple widget**: `widgets/demo_widget/` - Minimal HTML widget
- **Configurable widget**: `widgets/card_grid/` - Full configuration example with multiple property types
- **Multi-file widget**: `widgets/html_paths_test/` - Widget with separate CSS, JS, and images
- **React widget**: `widgets/bundled_react_test/` - Build tool integration with Vite

For detailed documentation, see `widgets/WIDGET_SETUP.md` and https://widget-service.insided.com/docs/custom-widgets/widget-schema.html
