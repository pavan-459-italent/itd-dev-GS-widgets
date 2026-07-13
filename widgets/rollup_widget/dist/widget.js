
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
class App {
    constructor(container) {
        this.section = document.createElement("section");
        this.section.className = "rollup-widget-section";
        this.title = document.createElement("h3");
        this.title.className = "rollup-widget-title";
        this.description = document.createElement("p");
        this.description.className = "rollup-widget-description";
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

async function init(sdk) {
    await sdk.whenReady();
    const app = new App(sdk.getContainer());
    app.render(sdk.getProps());
    sdk.on("propsChanged", (props) => app.render(props));
    sdk.on("destroy", () => app.destroy());
}

export { init };
