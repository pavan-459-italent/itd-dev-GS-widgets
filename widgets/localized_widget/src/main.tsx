import { createRoot } from "react-dom/client";
import { App } from "./App";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  const readySDK = await sdk.whenReady();
  const props = readySDK.getProps();
  console.log(props);

  const root = createRoot(sdk.shadowRoot);
  root.render(<App accentColor={props.accent_color} />);
  sdk.on("destroy", () => root.unmount());
}
