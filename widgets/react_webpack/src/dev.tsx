import { init } from "./main";
import type { WidgetProps } from "./types";

const MOCK_PROPS: WidgetProps = {
  title: "React + webpack Widget",
  description: "A widget built with React 19 and webpack 5.",
};

init({
  whenReady: () => Promise.resolve(),
  shadowRoot: document.getElementById("widget-root") as unknown as ShadowRoot,
  getProps: () => MOCK_PROPS,
  on: () => () => {},
  emit: () => {},
});
