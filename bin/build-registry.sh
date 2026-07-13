#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

WIDGETS_DIR="widgets"
DEFAULTS_FILE="config/defaults.json"
OUTPUT_FILE="widget_registry.json"

DRY_RUN=false
VALIDATE_ONLY=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --validate)
      VALIDATE_ONLY=true
      shift
      ;;
    --help)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --dry-run    Preview the output without writing to file"
      echo "  --validate   Validate existing widget_registry.json"
      echo "  --help       Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Run '$0 --help' for usage information"
      exit 1
      ;;
  esac
done

error() {
  echo -e "${RED}ERROR:${NC} $1" >&2
}

success() {
  echo -e "${GREEN}SUCCESS:${NC} $1"
}

warning() {
  echo -e "${YELLOW}WARNING:${NC} $1"
}

if ! command -v jq &> /dev/null; then
  error "jq is required but not installed. Please install it:"
  echo "  macOS: brew install jq"
  echo "  Linux: apt-get install jq or yum install jq"
  exit 1
fi

if [ "$VALIDATE_ONLY" = true ]; then
  if [ ! -f "$OUTPUT_FILE" ]; then
    error "File $OUTPUT_FILE does not exist"
    exit 1
  fi

  if jq empty "$OUTPUT_FILE" 2>/dev/null; then
    success "Valid JSON in $OUTPUT_FILE"

    widget_count=$(jq '.widgets | length' "$OUTPUT_FILE")
    success "Found $widget_count widgets in registry"

    has_source=$(jq '[.widgets[] | has("source")] | all' "$OUTPUT_FILE")
    if [ "$has_source" = "true" ]; then
      success "All widgets use source block (repository-hosted)"
    else
      has_content=$(jq '[.widgets[] | has("content")] | any' "$OUTPUT_FILE")
      if [ "$has_content" = "true" ]; then
        warning "Some widgets use content block (externally-hosted)"
      fi
    fi
    exit 0
  else
    error "Invalid JSON in $OUTPUT_FILE"
    exit 1
  fi
fi

if [ ! -f "$DEFAULTS_FILE" ]; then
  error "Defaults file $DEFAULTS_FILE not found"
  exit 1
fi

if [ ! -d "$WIDGETS_DIR" ]; then
  error "Widgets directory $WIDGETS_DIR not found"
  exit 1
fi

SOURCE_ENTRY=$(jq -r '.sourceEntry // "content.html"' "$DEFAULTS_FILE")

success "Loaded configuration from $DEFAULTS_FILE"

WIDGETS_JSON="[]"

widget_count=0
error_count=0

for widget_dir in "$WIDGETS_DIR"/*; do
  if [ ! -d "$widget_dir" ]; then
    continue
  fi

  widget_name=$(basename "$widget_dir")
  widget_config="$widget_dir/widget.json"

  echo ""
  echo "Processing widget: $widget_name"

  if [ ! -f "$widget_config" ]; then
    error "  Missing widget.json in $widget_dir"
    ((error_count++))
    continue
  fi

  if ! jq empty "$widget_config" 2>/dev/null; then
    error "  Invalid JSON in $widget_config"
    ((error_count++))
    continue
  fi

  version=$(jq -r '.version // empty' "$widget_config")
  title=$(jq -r '.title // empty' "$widget_config")
  description=$(jq -r '.description // empty' "$widget_config")

  if [ -z "$version" ]; then
    error "  Missing required field: version"
    ((error_count++))
    continue
  fi

  if [ -z "$title" ]; then
    error "  Missing required field: title"
    ((error_count++))
    continue
  fi

  if [ -z "$description" ]; then
    error "  Missing required field: description"
    ((error_count++))
    continue
  fi

  widget_source_path=$(jq -r '.sourcePath // empty' "$widget_config")
  widget_source_entry=$(jq -r '.sourceEntry // empty' "$widget_config")

  if [ -n "$widget_source_path" ]; then
    source_path="$widget_source_path"
  elif [ -d "$widget_dir/dist" ]; then
    source_path="${WIDGETS_DIR}/${widget_name}/dist"
  else
    source_path="${WIDGETS_DIR}/${widget_name}"
  fi

  if [ -n "$widget_source_entry" ]; then
    source_entry="$widget_source_entry"
  else
    source_entry="$SOURCE_ENTRY"
  fi

  if [ -n "$widget_source_path" ]; then
    entry_file="$widget_source_path/$source_entry"
  elif [ -d "$widget_dir/dist" ]; then
    entry_file="$widget_dir/dist/$source_entry"
  else
    entry_file="$widget_dir/$source_entry"
  fi

  if [ ! -f "$entry_file" ]; then
    error "  Missing entry file: $entry_file"
    ((error_count++))
    continue
  fi

  widget=$(jq -n \
    --slurpfile defaults "$DEFAULTS_FILE" \
    --slurpfile widget "$widget_config" \
    --arg type "$widget_name" \
    --arg source_path "$source_path" \
    --arg source_entry "$source_entry" \
    '
    ($defaults[0] | del(.sourceEntry)) * $widget[0] * {
      "type": $type,
      "source": {
        "path": $source_path,
        "entry": $source_entry
      }
    } |
    del(.sourcePath, .sourceEntry) |
    {
      version,
      title,
      type,
      description,
      category,
      containers,
      widgetsLibrary,
      settings,
      source,
      imageName,
      imageSrc,
      configuration,
      defaultConfig
    } + . |
    with_entries(select(.value != null))
    ')

  WIDGETS_JSON=$(echo "$WIDGETS_JSON" | jq --argjson widget "$widget" '. + [$widget]')

  success "  Processed: $title (v$version) -> source: $source_path/$source_entry"
  ((widget_count++))
done

echo ""
echo "================================"

if [ $error_count -gt 0 ]; then
  error "Failed to process $error_count widget(s)"
  exit 1
fi

if [ $widget_count -eq 0 ]; then
  error "No widgets found to process"
  exit 1
fi

success "Successfully processed $widget_count widget(s)"

REGISTRY_JSON=$(jq -n --argjson widgets "$WIDGETS_JSON" '{widgets: $widgets}')

if [ "$DRY_RUN" = true ]; then
  echo ""
  warning "DRY RUN MODE - No files will be written"
  echo ""
  echo "$REGISTRY_JSON" | jq .
else
  echo "$REGISTRY_JSON" | jq . > "$OUTPUT_FILE"
  success "Written to $OUTPUT_FILE"
fi

echo ""
success "Build complete!"

