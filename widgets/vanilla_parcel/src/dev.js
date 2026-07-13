import { init } from "./main.js";

const MOCK_PROPS = {
  title: "Vanilla Widget",
  description: "A widget built with plain JavaScript and Parcel.",
};

init({
  whenReady: () => Promise.resolve(),
  shadowRoot: document.getElementById("widget-root"),
  getProps: () => MOCK_PROPS,
  on: () => () => {},
  emit: () => {},
});
