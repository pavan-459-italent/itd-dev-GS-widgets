export async function init(sdk) {
  await sdk.whenReady();

  const section = document.createElement("section");
  const title = document.createElement("h3");
  const desc = document.createElement("p");

  Object.assign(section.style, { fontFamily: "sans-serif", padding: "1rem" });
  Object.assign(title.style, { margin: "0 0 0.5rem", fontSize: "1.25rem", color: "#d04a02" });
  Object.assign(desc.style, { margin: "0", color: "#4a4a4a" });

  section.append(title, desc);
  sdk.shadowRoot.appendChild(section);

  const render = ({ title: t, description: d } = sdk.getProps()) => {
    title.textContent = t ?? "Vanilla Widget";
    desc.textContent = d ?? "";
    desc.hidden = !d;
  };

  render(sdk.getProps());
  sdk.on("propsChanged", render);
  sdk.on("destroy", () => section.remove());
}
