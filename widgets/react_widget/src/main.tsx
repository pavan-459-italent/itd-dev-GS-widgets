import { createRoot } from "react-dom/client";
import { App } from "./App";
import type { WidgetSDK, WidgetProps } from "./types";

const MOCK_PROPS: WidgetProps = {
  title: "React Widget",
  description: "A widget built with React and the Widget SDK.",
};

export function init(sdk: WidgetSDK) {
  const container = sdk.shadowRoot.querySelector("#widget-root") ?? sdk.shadowRoot;

  sdk.whenReady().then(() => {
    const root = createRoot(container);
    root.render(<App sdk={sdk} />);
    sdk.on("destroy", () => root.unmount());
  });
}

const devContainer = document.getElementById("widget-root");
if (devContainer) {
  init({
    whenReady: () => Promise.resolve(),
    shadowRoot: devContainer as unknown as ShadowRoot,
    getProps: () => MOCK_PROPS,
    on: () => () => {},
    emit: () => {},
  });
}
