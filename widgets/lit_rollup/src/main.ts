import "./lit-widget";
import type { LitWidget } from "./lit-widget";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const el = document.createElement("lit-widget") as LitWidget;
  el.config = sdk.getProps();
  (sdk.shadowRoot as unknown as Element).appendChild(el);
  sdk.on("propsChanged", (p) => { el.config = p; });
  sdk.on("destroy", () => el.remove());
}
