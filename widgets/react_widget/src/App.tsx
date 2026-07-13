import { useState, useEffect } from "react";
import type { WidgetSDK, WidgetProps } from "./types";

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [props] = useState<WidgetProps>(sdk.getProps());

  return (
    <section className="react-widget-section">
      <h3 className="react-widget-title">{props.title}</h3>
      {props.description && (
        <p className="react-widget-description">{props.description}</p>
      )}
    </section>
  );
}
