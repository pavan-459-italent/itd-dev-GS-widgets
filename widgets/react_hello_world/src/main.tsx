import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

function renderWidget(container: HTMLElement) {
  if (container.hasAttribute("data-hello-world-initialized")) return;
  container.setAttribute("data-hello-world-initialized", "true");

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

class HelloWorldWidgetElement extends HTMLElement {
  connectedCallback() {
    renderWidget(this);
  }
}

if (!customElements.get("hello-world-widget")) {
  customElements.define("hello-world-widget", HelloWorldWidgetElement);
}
