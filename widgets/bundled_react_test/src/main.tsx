import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

function mount(container: HTMLElement) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

function findInShadowDom(id: string): HTMLElement | null {
  const fromDocument = document.getElementById(id);
  if (fromDocument) return fromDocument;

  function search(root: Document | ShadowRoot): HTMLElement | null {
    for (const el of root.querySelectorAll("*")) {
      if (el.shadowRoot) {
        const found = el.shadowRoot.getElementById(id);
        if (found) return found;
        const deeper = search(el.shadowRoot);
        if (deeper) return deeper;
      }
    }
    return null;
  }

  return search(document);
}

function waitForRoot(id: string) {
  const existing = findInShadowDom(id);
  if (existing) {
    mount(existing);
    return;
  }

  const observer = new MutationObserver(() => {
    const el = findInShadowDom(id);
    if (el) {
      observer.disconnect();
      mount(el);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

waitForRoot("bundled-react-test-root");
