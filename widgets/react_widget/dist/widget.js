import { jsxs as r, jsx as o } from "react/jsx-runtime";
import { createRoot as i } from "react-dom/client";
import { useState as n } from "react";
function c({ sdk: t }) {
  const [e] = n(t.getProps());
  return /* @__PURE__ */ r("section", { className: "react-widget-section", children: [
    /* @__PURE__ */ o("h3", { className: "react-widget-title", children: e.title }),
    e.description && /* @__PURE__ */ o("p", { className: "react-widget-description", children: e.description })
  ] });
}
async function d(t) {
  await t.whenReady();
  const e = i(t.shadowRoot);
  e.render(/* @__PURE__ */ o(c, { sdk: t })), t.on("destroy", () => e.unmount());
}
export {
  d as init
};
