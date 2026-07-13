var s = Object.defineProperty;
var o = (e, t, i) => t in e ? s(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var n = (e, t, i) => o(e, typeof t != "symbol" ? t + "" : t, i);
class c {
  constructor(t) {
    n(this, "section");
    n(this, "title");
    n(this, "description");
    this.section = document.createElement("section"), this.section.className = "vite-widget-section", this.title = document.createElement("h3"), this.title.className = "vite-widget-title", this.description = document.createElement("p"), this.description.className = "vite-widget-description", this.section.append(this.title, this.description), t.append(this.section);
  }
  render(t) {
    this.title.textContent = t.title ?? "", this.description.textContent = t.description ?? "", this.description.style.display = t.description ? "" : "none";
  }
  destroy() {
    this.section.remove();
  }
}
async function d(e) {
  await e.whenReady();
  const t = new c(e.getContainer());
  t.render(e.getProps()), e.on("propsChanged", (i) => t.render(i)), e.on("destroy", () => t.destroy());
}
export {
  d as init
};
