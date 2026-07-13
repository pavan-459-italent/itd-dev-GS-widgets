import { bootstrapApplication, createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { WIDGET_SDK } from "./widget-sdk.token";
import type { WidgetSDK } from "./types";

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();
  const host = document.createElement("angular-widget-root");
  sdk.getContainer().appendChild(host);
  const appRef = await createApplication({
    providers: [{ provide: WIDGET_SDK, useValue: sdk }],
  });
  appRef.bootstrap(AppComponent, host);
  sdk.on("destroy", () => {
    appRef.destroy();
    host.remove();
  });
}

const devElement = document.querySelector("angular-widget-root");
if (devElement) {
  bootstrapApplication(AppComponent, {
    providers: [
      {
        provide: WIDGET_SDK,
        useValue: {
          whenReady: () => Promise.resolve(),
          shadowRoot: null as unknown as ShadowRoot,
          getContainer: () => devElement,
          getProps: () => ({
            title: "Angular Widget",
            description: "Running in dev mode.",
          }),
          on: () => () => {},
          emit: () => {},
        } satisfies WidgetSDK,
      },
    ],
  });
}
