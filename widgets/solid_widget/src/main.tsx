import { render } from "solid-js/web";
import { App } from "./App";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const dispose = render(() => <App sdk={sdk} />, sdk.getContainer());
  sdk.on("destroy", dispose);
}
