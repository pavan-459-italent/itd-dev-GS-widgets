import { init } from "./main";
import type { WidgetProps } from "./types";

const MOCK_PROPS: WidgetProps = {
  title: "Svelte Widget",
  description: "A widget built with Svelte 5 and Vite.",
};

init({
  whenReady: () => Promise.resolve(),
  shadowRoot: document.getElementById("widget-root") as unknown as ShadowRoot,
  getProps: () => MOCK_PROPS,
  on: () => () => {},
  emit: () => {},
});
