import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import { App } from "./App";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();

  const root = createRoot(sdk.getContainer());
  root.render(
    <StyleSheetManager target={sdk.shadowRoot}>
      <App sdk={sdk} />
    </StyleSheetManager>
  );
  sdk.on("destroy", () => root.unmount());
}
