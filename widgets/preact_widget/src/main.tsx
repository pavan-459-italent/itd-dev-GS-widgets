import { render } from "preact";
import { App } from "./App";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  render(<App sdk={sdk} />, sdk.getContainer());
  sdk.on("destroy", () => render(null, sdk.getContainer()));
}
