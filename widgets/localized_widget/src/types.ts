export interface WidgetProps {
  accent_color: string;
}

export interface ReadySDK {
  getProps(): WidgetProps;
}

export interface WidgetSDK {
  whenReady(): Promise<ReadySDK>;
  shadowRoot: ShadowRoot;
  on(event: string, callback: () => void): () => void;
}

export type Locale = "en" | "es" | "fr" | "de" | "pt";
