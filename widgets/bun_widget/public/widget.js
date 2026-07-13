// src/App.ts
class App {
  section;
  title;
  description;
  constructor(container) {
    this.section = document.createElement("section");
    this.section.className = "bun-widget-section";
    this.title = document.createElement("h3");
    this.title.className = "bun-widget-title";
    this.description = document.createElement("p");
    this.description.className = "bun-widget-description";
    this.section.append(this.title, this.description);
    container.append(this.section);
  }
  render(props) {
    this.title.textContent = props.title ?? "";
    this.description.textContent = props.description ?? "";
    this.description.style.display = props.description ? "" : "none";
  }
  destroy() {
    this.section.remove();
  }
}

// src/main.ts
async function init(sdk) {
  await sdk.whenReady();
  const app = new App(sdk.getContainer());
  app.render(sdk.getProps());
  sdk.on("propsChanged", (props) => app.render(props));
  sdk.on("destroy", () => app.destroy());
}
export {
  init
};
