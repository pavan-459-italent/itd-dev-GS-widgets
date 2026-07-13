export interface WidgetSource {
  path: string;
  entry: string;
}

export interface WidgetEntry {
  type: string;
  title: string;
  source: WidgetSource;
  [key: string]: unknown;
}

export interface Registry {
  widgets: WidgetEntry[];
}

export interface RunningWidget {
  widget: WidgetEntry;
  vitePort: number | null;
  colorIndex: number;
  endpoint: string;
  active: boolean;
}
