import { render } from "solid-js/web";
import App from "./App";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const container = document.createElement("div");
  (sdk.shadowRoot as unknown as Element).appendChild(container);
  const dispose = render(() => <App sdk={sdk} />, container);
  sdk.on("destroy", dispose);
}
