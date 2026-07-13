import { createSignal, onMount, onCleanup, Show } from "solid-js";
import type { WidgetSDK, WidgetProps } from "./types";

export default function App({ sdk }: { sdk: WidgetSDK }) {
  const [config, setConfig] = createSignal<WidgetProps>(sdk.getProps());

  onMount(() => {
    const cleanup = sdk.on("propsChanged", setConfig);
    onCleanup(cleanup);
  });

  return (
    <section class="solid-widget-section">
      <h3 class="solid-widget-title">{config().title}</h3>
      <Show when={config().description}>
        <p class="solid-widget-description">{config().description as string}</p>
      </Show>
    </section>
  );
}
