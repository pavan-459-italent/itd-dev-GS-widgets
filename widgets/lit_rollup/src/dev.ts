import { init } from "./main";
import type { WidgetProps } from "./types";

const MOCK_PROPS: WidgetProps = {
  title: "Lit Widget",
  description: "A widget built with Lit and Rollup.",
};

init({
  whenReady: () => Promise.resolve(),
  shadowRoot: document.getElementById("widget-root") as unknown as ShadowRoot,
  getProps: () => MOCK_PROPS,
  on: () => () => {},
  emit: () => {},
});
