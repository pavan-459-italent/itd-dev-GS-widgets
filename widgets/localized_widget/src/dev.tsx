import { init } from "./main";
import type { WidgetSDK } from "./types";

const mockSDK: WidgetSDK = {
  whenReady: () =>
    Promise.resolve({
      getProps: () => ({ accent_color: "#6366f1" }),
    }),
  shadowRoot: document.getElementById("widget-root")! as unknown as ShadowRoot,
  on: () => () => {},
};

init(mockSDK);
