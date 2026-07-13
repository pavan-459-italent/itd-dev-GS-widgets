import { mount, unmount } from "svelte";
import App from "./App.svelte";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const target = sdk.shadowRoot as unknown as Element;
  const app = mount(App, { target, props: { sdk } });
  sdk.on("destroy", () => unmount(app));
}
