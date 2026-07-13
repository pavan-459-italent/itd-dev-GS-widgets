import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import type { WidgetRegistry } from '../host/types'

const REGISTRY_PATH = path.join(process.cwd(), 'widget_registry.json')

export const readRegistryRaw = (): string => readFileSync(REGISTRY_PATH, 'utf-8')

export const patchRegistry = (raw: string, widgetType: string, tunnelUrl: string): string => {
  const registry = JSON.parse(raw) as WidgetRegistry
  const widget = registry.widgets.find(w => w.type === widgetType)
  if (!widget) throw new Error(`Widget "${widgetType}" not found in registry`)
  delete widget.source
  widget.content = {
    endpoint: tunnelUrl,
    method: 'GET',
    requiresAuthentication: false,
    cacheStrategy: 'none',
  }
  return JSON.stringify(registry, null, 2) + '\n'
}

export const writeRegistry = (content: string): void =>
  writeFileSync(REGISTRY_PATH, content, 'utf-8')
