import type { WidgetProps } from "./types";

export class App {
  private section: HTMLElement;
  private title: HTMLHeadingElement;
  private description: HTMLParagraphElement;

  constructor(container: Element) {
    this.section = document.createElement("section");
    this.section.className = "rollup-widget-section";
    this.title = document.createElement("h3");
    this.title.className = "rollup-widget-title";
    this.description = document.createElement("p");
    this.description.className = "rollup-widget-description";
    this.section.append(this.title, this.description);
    container.append(this.section);
  }

  render(props: WidgetProps) {
    this.title.textContent = props.title ?? "";
    this.description.textContent = props.description ?? "";
    this.description.style.display = props.description ? "" : "none";
  }

  destroy() {
    this.section.remove();
  }
}
