import { createSignal, onCleanup, Show } from "solid-js";
import type { WidgetSDK, WidgetProps } from "./types";

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [props, setProps] = createSignal<WidgetProps>(sdk.getProps());
  const unsubscribe = sdk.on("propsChanged", setProps);
  onCleanup(unsubscribe);

  return (
    <section class="solid-widget-section">
      <h3 class="solid-widget-title">{props().title}</h3>
      <Show when={props().description}>
        <p class="solid-widget-description">{props().description}</p>
      </Show>
    </section>
  );
}
