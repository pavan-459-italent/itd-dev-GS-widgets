import { useState, useEffect } from "react";
import type { WidgetSDK, WidgetProps } from "./types";

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [config, setConfig] = useState<WidgetProps>(sdk.getProps());

  useEffect(() => sdk.on("propsChanged", setConfig), [sdk]);

  return (
    <section className="react-webpack-section">
      <h3 className="react-webpack-title">{config.title}</h3>
      {config.description && (
        <p className="react-webpack-description">{config.description}</p>
      )}
    </section>
  );
}
