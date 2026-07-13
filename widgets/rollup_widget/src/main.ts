import type { WidgetSDK, WidgetProps } from "./types";
import { App } from "./App";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const app = new App(sdk.getContainer());
  app.render(sdk.getProps());
  sdk.on("propsChanged", (props: WidgetProps) => app.render(props));
  sdk.on("destroy", () => app.destroy());
}
