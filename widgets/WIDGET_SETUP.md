# Widget Setup Guide

This guide explains how to create and manage widgets in the widgets repository.

## What is This?

This repository provides a system for managing widget configurations using the Widget Platform's `source` block pattern. Each widget is defined by:

- A `widget.json` configuration file with metadata (title, description, version, etc.)
- Content files in one of two patterns:
  - **Simple widget**: A single `content.html` file directly in the widget directory
  - **Multi-file widget**: A `dist/` directory containing `content.html` and related assets (CSS, JS, images)

**Embedding Requirement**: Widgets are embedded into existing HTML pages, so the entry `content.html` file must be an HTML fragment. Do not include `<html>`, `<head>`, or `<body>` tags, as these will conflict with the host page structure.

**Multi-file widgets**: For widgets with separate CSS, JavaScript, or image files, place them in a `dist/` directory. The platform automatically transforms relative paths to hosted URLs after publishing.

The build script automatically scans all widgets, validates their configurations, and generates a unified `widget_registry.json` file using the `source` block pattern.

## Overview

The widget registry system uses individual configuration files for each widget, which are then automatically merged into a single `widget_registry.json` file using the `bin/build-registry.sh` script. This approach provides:

- **Centralized Management**: All widgets are organized in the `widgets/` directory
- **Automatic Validation**: The build script ensures all configurations are valid
- **Version Control**: Each widget can be versioned independently
- **Easy Maintenance**: Add, update, or remove widgets without manually editing the registry

## File Structure

```
widgets-repo-template/
├── bin/
│   └── build-registry.sh    # Script to build widget_registry.json
├── config/
│   └── defaults.json        # Configuration and default values
├── widget_registry.json     # Generated registry (DO NOT EDIT MANUALLY)
└── widgets/
    ├── WIDGET_SETUP.md      # This documentation file
    ├── simple_widget/       # Simple single-file widget
    │   ├── widget.json
    │   └── content.html
    └── multi_file_widget/   # Multi-file widget with assets
        ├── widget.json
        └── dist/
            ├── content.html # Entry point
            └── assets/
                ├── styles.css
                └── script.js
```

## Prerequisites

Before creating widgets, ensure you have:

- `jq` installed for JSON processing
  - macOS: `brew install jq`
  - Linux: `sudo apt-get install jq` or `sudo yum install jq`
- Basic knowledge of HTML/CSS/JavaScript (depending on your widget type)
- Git (for version control, if using)

## Content File Requirements

### Simple Widgets (Single File)

For simple widgets, the `content.html` file contains all HTML, CSS, and JavaScript inline.

**Critical Requirements:**

- **HTML Fragment**: Do not include `<html>`, `<head>`, or `<body>` tags
- **Self-contained**: All styles in `<style>` tags, all scripts in `<script>` tags
- **Public endpoints are accessible**: Absolute URLs (CDNs, fonts, etc.) are allowed

**Example of simple widget structure:**

```html
<style>
  .my-widget {
    color: blue;
    padding: 20px;
  }
</style>
<div class="my-widget">
  <h1>My Widget</h1>
</div>
<script>
  console.log("Widget loaded");
</script>
```

### Multi-File Widgets (with dist/ directory)

For widgets that need separate CSS, JavaScript, or image files, use a `dist/` directory structure.

**Critical Requirements:**

- Entry file (`content.html`) must be an HTML fragment (no `<html>`, `<head>`, `<body>` tags)
- Use relative paths to reference assets in the same directory
- The platform automatically transforms relative paths to hosted URLs after publishing

**Example multi-file widget structure:**

```
my_widget/
├── widget.json
└── dist/
    ├── content.html
    └── assets/
        ├── styles.css
        ├── script.js
        └── logo.png
```

**Example content.html with relative asset references:**

```html
<link rel="stylesheet" href="assets/styles.css" />
<div class="my-widget">
  <img src="assets/logo.png" alt="Logo" />
  <h1>My Widget</h1>
</div>
<script src="assets/script.js"></script>
```

**For React/Modern Frameworks:**
If you're using a build tool (like Vite, Webpack, etc.), configure it to output to the `dist/` directory. The entry file should be `content.html` as an HTML fragment. See `widgets/bundled_react_test/` for a Vite example.

## Configuration File

### defaults.json

This file contains default values for all widgets:

```json
{
  "sourceEntry": "content.html",
  "containers": ["Full width"],
  "widgetsLibrary": true,
  "settings": {
    "configurable": true,
    "editable": true,
    "removable": true,
    "shared": false,
    "movable": true
  }
}
```

**Configuration Fields:**

- `sourceEntry` - Default entry file name (default: "content.html")
- `containers` - Available container types for widget placement
- `widgetsLibrary` - Whether widget appears in the widget library
- `settings` - Default widget behavior settings:
  - `configurable` - Whether users can configure the widget after adding it
  - `editable` - Whether the widget content can be edited
  - `removable` - Whether users can remove the widget from pages
  - `shared` - Whether the widget is shared across pages
  - `movable` - Whether users can reposition the widget

### widget.json

Widget-specific configuration (only unique fields needed):

```json
{
  "version": "1.0.0",
  "title": "My Widget",
  "description": "Description of what this widget does",
  "category": "Demo",
  "imageName": "my_widget"
}
```

**Required fields:**

- `version` - Semantic version (e.g., "1.0.0")
- `title` - Display name of the widget
- `description` - Brief description of the widget

**Optional fields:**

- `category` - Widget category for organization
- `imageName` - Image identifier for widget thumbnail
- `imageSrc` - URL or path to thumbnail image
- `sourcePath` - Override the auto-detected source path (e.g., "widgets/my_widget/build")
- `sourceEntry` - Override the default entry file name (e.g., "index.html")
- `configuration` - Schema for user-configurable properties (see [Dynamic Widget Configuration](#dynamic-widget-configuration))
- `defaultConfig` - Default values for configurable properties
- Any other field from config/defaults.json can be overridden

## Dynamic Widget Configuration

Widgets can define configurable properties that allow users to customize widget behavior and appearance when adding the widget to a page. This is done through the `configuration` and `defaultConfig` fields in `widget.json`.

### Configuration Schema

The `configuration` field defines the blueprint for customizable properties:

```json
{
  "configuration": {
    "properties": [
      {
        "name": "propertyName",
        "label": "Display Label",
        "type": "text",
        "description": "Optional description",
        "defaultValue": "default value",
        "rules": {
          "required": true,
          "minLength": 1
        }
      }
    ]
  },
  "defaultConfig": {
    "propertyName": "default value"
  }
}
```

**Configuration Fields:**

- `properties` - An array of ConfigField definitions

**ConfigField Required Properties:**

- `name` - The property identifier used in `content.html` template variables
- `label` - Display label shown in the configuration UI
- `type` - The field type (see supported types below)

**ConfigField Optional Properties:**

- `description` - Helper text for the configuration UI
- `defaultValue` - Default value shown in the configuration UI
- `rules` - Validation rules such as `required`, `minLength`, `maxLength`, `minimum`, and `maximum`
- `options` - Required for `select` fields, array of `{ "value", "label" }`

**defaultConfig:**

- Initial default values for widget configuration properties
- Applied automatically when a new widget instance is added to a layout
- Values must match the field names defined in `configuration.properties`

### Supported ConfigField Types

| Type      | Description            |
| --------- | ---------------------- |
| `text`    | Single line text input |
| `number`  | Numeric input field    |
| `color`   | Color picker           |
| `date`    | Date picker            |
| `boolean` | Checkbox or toggle     |
| `select`  | Select dropdown        |

### Template Variables in content.html

When a widget has configuration properties, you can use template variables in `content.html` to render dynamic content. Template variables use double curly brace syntax: `{{ variable_name }}`.

**Example content.html with template variables:**

```html
<style>
  .banner {
    background-color: {{ background_color }};
    color: {{ text_color }};
    padding: 20px;
  }
</style>
<div class="banner">
  <h1>{{ title }}</h1>
  <p>{{ subtitle }}</p>
</div>
```

The host application will replace these template variables with the actual configuration values when rendering the widget.

### Complete Configurable Widget Example

**widget.json:**

```json
{
  "version": "1.0.0",
  "title": "Card Grid",
  "description": "A configurable card grid with dynamic layout and styling",
  "category": "Content",
  "imageName": "card_grid",
  "configuration": {
    "properties": [
      {
        "name": "cards_per_row",
        "label": "Cards Per Row",
        "type": "number",
        "defaultValue": 3,
        "rules": {
          "required": true,
          "minimum": 1,
          "maximum": 6
        }
      },
      {
        "name": "card_background",
        "label": "Card Background",
        "type": "color",
        "defaultValue": "#ffffff"
      },
      {
        "name": "accent_color",
        "label": "Accent Color",
        "type": "color",
        "defaultValue": "#3b82f6"
      },
      {
        "name": "card_style",
        "label": "Card Style",
        "type": "select",
        "defaultValue": "shadow",
        "options": [
          { "value": "flat", "label": "Flat" },
          { "value": "shadow", "label": "Shadow" },
          { "value": "bordered", "label": "Bordered" }
        ]
      }
    ]
  },
  "defaultConfig": {
    "cards_per_row": 3,
    "card_background": "#ffffff",
    "accent_color": "#3b82f6",
    "card_style": "shadow"
  }
}
```

**content.html:**

```html
<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat({{ cards_per_row }}, 1fr);
    gap: 20px;
  }

  .card {
    background-color: {{ card_background }};
    padding: 24px;
    border-radius: 8px;
  }

  .card-style-shadow .card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .card-style-bordered .card {
    border: 2px solid {{ accent_color }};
  }
</style>

<div class="card-grid card-style-{{ card_style }}">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

## Creating a New Widget

### Option A: Simple Single-File Widget

1. **Create a new directory** in `widgets/`:

   ```bash
   mkdir widgets/my_new_widget
   ```

2. **Create `widget.json`** with your widget configuration:

   ```bash
   cat > widgets/my_new_widget/widget.json << 'EOF'
   {
     "version": "1.0.0",
     "title": "My New Widget",
     "description": "A widget that does amazing things",
     "category": "Demo"
   }
   EOF
   ```

3. **Create `content.html`** with your widget HTML fragment (all CSS and JavaScript inline):
   ```bash
   cat > widgets/my_new_widget/content.html << 'EOF'
   <style>
     .my-widget {
       padding: 20px;
       background-color: #f0f0f0;
     }
   </style>
   <div class="my-widget">
     <h1>My New Widget</h1>
     <p>Widget content goes here</p>
   </div>
   <script>
     console.log('Widget initialized');
   </script>
   EOF
   ```

### Option B: Multi-File Widget (with separate assets)

1. **Create directory structure**:

   ```bash
   mkdir -p widgets/my_new_widget/dist/assets
   ```

2. **Create `widget.json`**:

   ```bash
   cat > widgets/my_new_widget/widget.json << 'EOF'
   {
     "version": "1.0.0",
     "title": "My New Widget",
     "description": "A widget with separate assets",
     "category": "Demo"
   }
   EOF
   ```

3. **Create entry file and assets**:
   ```bash
   cat > widgets/my_new_widget/dist/content.html << 'EOF'
   <link rel="stylesheet" href="assets/styles.css">
   <div class="my-widget">
     <h1>My New Widget</h1>
   </div>
   <script src="assets/script.js"></script>
   EOF
   ```

### Build and Commit

4. **Build the registry**:

   ```bash
   ./bin/build-registry.sh
   ```

5. **Commit your changes**:
   ```bash
   git add widgets/my_new_widget/
   git commit -m "Add my_new_widget"
   git push
   ```

## Updating an Existing Widget

1. **Edit the widget files**:
   - Modify `widgets/my_widget/widget.json` (don't forget to bump version!)
   - Or modify `widgets/my_widget/content.html`

2. **Rebuild the registry**:

   ```bash
   ./bin/build-registry.sh
   ```

3. **Commit your changes**:
   ```bash
   git add widgets/my_widget/
   git add widget_registry.json
   git commit -m "Update my_widget to v1.0.1"
   git push
   ```

## Build Script Usage

The `bin/build-registry.sh` script supports several options:

### Standard Build

```bash
./bin/build-registry.sh
```

Generates `widget_registry.json` from all widget configurations.

### Dry Run

```bash
./bin/build-registry.sh --dry-run
```

Preview the output without writing to the file.

### Validate

```bash
./bin/build-registry.sh --validate
```

Validates the existing `widget_registry.json` file.

### Help

```bash
./bin/build-registry.sh --help
```

Display usage information.

## How It Works

1. **Reads** default configuration from `config/defaults.json`
2. **Scans** the `widgets/` directory for subdirectories
3. **Reads** each widget's `widget.json` configuration
4. **Detects** widget structure:
   - If `dist/` directory exists, uses it as the source path
   - Otherwise, uses the widget directory directly
5. **Merges** widget-specific defaults and config:
   - Default values from `config/defaults.json`
   - Widget-specific values from `widget.json`
   - Auto-generated values (type, source block)
6. **Validates** required fields and entry file exist
7. **Generates** the final `widget_registry.json` with `source` blocks

### Auto-Generated Fields

- `type`: Derived from the directory name (e.g., `my_widget`)
- `source.path`: Auto-detected based on widget structure:
  - `widgets/{type}/dist` if `dist/` directory exists
  - `widgets/{type}` otherwise
- `source.entry`: From `sourceEntry` in widget.json or defaults (default: "content.html")

## Validation Rules

The build script validates:

- `widget.json` exists and is valid JSON
- Required fields are present (`version`, `title`, `description`)
- Entry file exists (in `dist/` or widget root depending on structure)
- Generated registry is valid JSON with `source` blocks

## Troubleshooting

### Script fails with "jq: command not found"

The build script requires `jq` for JSON processing. Install it:

- **macOS**: `brew install jq`
- **Linux**: `sudo apt-get install jq` or `sudo yum install jq`
- **Windows**: Download from [jq's official website](https://stedolan.github.io/jq/download/)

### Script fails with "Missing required field"

Ensure your `widget.json` includes all required fields:

- `version`
- `title`
- `description`

### Widget not showing up in registry

1. Check directory structure is correct
2. Verify `widget.json` exists and is valid JSON
3. Verify entry file exists:
   - For simple widgets: `content.html` in widget directory
   - For multi-file widgets: `dist/content.html`
4. Run with `--dry-run` to see detailed error messages

## Best Practices

1. **Always bump version** when making changes to a widget
2. **Use semantic versioning** (MAJOR.MINOR.PATCH)
3. **Run the build script** before committing
4. **Don't edit `widget_registry.json` manually** - it will be overwritten
5. **Keep widget names simple** - they become the `type` field (use lowercase, underscores)
6. **Test locally** with `--dry-run` before pushing
7. **Use HTML fragments only** - Do not include `<html>`, `<head>`, or `<body>` tags
8. **Choose the right structure**:
   - Simple widgets: single `content.html` with inline CSS/JS
   - Multi-file widgets: `dist/` directory with separate assets
9. **Use absolute URLs for external resources** - CDNs, fonts, etc. are always accessible

## Examples

See the existing widgets in the `widgets/` directory for examples:

- `widgets/demo_widget/` - A simple widget example with basic HTML content
  - Demonstrates the minimal required structure: `widget.json` and `content.html`
  - Good starting point for understanding the basic widget format

- `widgets/card_grid/` - A configurable card grid widget with dynamic layout and styling
  - Demonstrates the `configuration` and `defaultConfig` fields
  - Shows how to use template variables (`{{ variable_name }}`) in content.html
  - Includes multiple configuration types: number, color, and select

- `widgets/html_paths_test/` - A multi-file widget with separate assets
  - Demonstrates the `dist/` directory structure
  - Shows how to reference CSS, JS, and images with relative paths

- `widgets/bundled_react_test/` - A React-based widget example using Vite
  - Shows how to integrate a modern JavaScript framework
  - Includes build configuration (`vite.config.ts`, `package.json`)
  - Outputs to `dist/` directory with proper structure

For detailed schema documentation, see https://widget-service.insided.com/docs/custom-widgets/widget-schema.html
