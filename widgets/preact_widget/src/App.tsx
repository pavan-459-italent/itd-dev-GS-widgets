import { useState, useEffect } from "preact/hooks";
import type { WidgetSDK, WidgetProps } from "./types";

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [props, setProps] = useState<WidgetProps>(sdk.getProps());

  useEffect(() => sdk.on("propsChanged", setProps), [sdk]);

  return (
    <section class="preact-widget-section">
      <h3 class="preact-widget-title">{props.title}</h3>
      {!!props.description && (
        <p class="preact-widget-description">{props.description}</p>
      )}
    </section>
  );
}
