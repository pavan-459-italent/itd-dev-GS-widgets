import { mount, unmount } from "svelte";
import App from "./App.svelte";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const app = mount(App, { target: sdk.getContainer(), props: { sdk } });
  sdk.on("destroy", () => unmount(app));
}
