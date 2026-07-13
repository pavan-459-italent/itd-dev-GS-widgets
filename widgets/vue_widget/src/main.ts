import { createApp } from "vue";
import App from "./App.vue";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const app = createApp(App, { sdk });
  app.mount(sdk.getContainer());
  sdk.on("destroy", () => app.unmount());
}
