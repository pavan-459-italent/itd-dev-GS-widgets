import { LitElement, html, css, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import type { WidgetProps } from "./types";

export class LitWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 1rem;
    }
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #324fff;
    }
    p {
      margin: 0;
      color: #4a4a4a;
    }
  `;

  @property({ type: Object }) config: WidgetProps = {};

  render() {
    return html`
      <section>
        <h3>${this.config.title ?? ""}</h3>
        ${this.config.description ? html`<p>${this.config.description}</p>` : ""}
      </section>
    `;
  }
}

customElements.define("lit-widget", LitWidget);
