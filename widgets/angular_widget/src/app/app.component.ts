import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { NgIf } from "@angular/common";
import { WIDGET_SDK } from "../widget-sdk.token";
import type { WidgetSDK, WidgetProps } from "../types";

@Component({
  selector: "angular-widget-root",
  standalone: true,
  imports: [NgIf],
  styleUrl: "../../public/widget.css",
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <section class="angular-widget-section">
      <h3 class="angular-widget-title">{{ props.title }}</h3>
      <p *ngIf="props.description" class="angular-widget-description">{{ props.description }}</p>
    </section>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  props: WidgetProps = {};
  private unsubscribe?: () => void;

  constructor(@Inject(WIDGET_SDK) private sdk: WidgetSDK) {}

  ngOnInit() {
    this.props = this.sdk.getProps();
    this.unsubscribe = this.sdk.on("propsChanged", (newProps: WidgetProps) => {
      this.props = newProps;
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }
}
