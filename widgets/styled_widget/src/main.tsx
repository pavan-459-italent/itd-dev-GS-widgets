import { createRoot } from "react-dom/client";
import { App } from "./App";
import type { WidgetSDK, WidgetProps } from "./types";

const MOCK_PROPS: WidgetProps = {
  label: "Styled Widget",
};

export function init(sdk: WidgetSDK) {
  const container = sdk.shadowRoot.querySelector("#styled_widget-root") ?? sdk.shadowRoot;

  sdk.whenReady().then(() => {
    const root = createRoot(container);
    root.render(<App sdk={sdk} />);
    sdk.on("destroy", () => root.unmount());
  });
}

const devContainer = document.getElementById("styled_widget-root");
if (devContainer) {
  init({
    whenReady: () => Promise.resolve(),
    shadowRoot: devContainer as unknown as ShadowRoot,
    getProps: () => MOCK_PROPS,
    on: () => () => {},
    emit: () => {},
  });
}
