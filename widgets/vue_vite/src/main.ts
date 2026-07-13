import { createApp } from "vue";
import App from "./App.vue";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const container = document.createElement("div");
  (sdk.shadowRoot as unknown as Element).appendChild(container);
  const app = createApp(App, { sdk });
  app.mount(container);
  sdk.on("destroy", () => app.unmount());
}
