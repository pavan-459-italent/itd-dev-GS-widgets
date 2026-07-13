import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget',
  standalone: true,
  template: `
    <section class="angular-widget-section">
      <h3 class="angular-widget-title">{{ title }}</h3>
      @if (description) {
        <p class="angular-widget-description">{{ description }}</p>
      }
    </section>
  `,
  styles: [
    `
      .angular-widget-section {
        font-family: system-ui, -apple-system, sans-serif;
        padding: 1.5rem;
        background: linear-gradient(135deg, #dd0031 0%, #c3002f 50%, #1976d2 100%);
        border-radius: 8px;
        color: white;
      }
      .angular-widget-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 0.5rem;
      }
      .angular-widget-description {
        font-size: 1rem;
        margin: 0;
        opacity: 0.9;
      }
    `,
  ],
})
export class AppComponent {
  @Input() title: string = 'Angular Widget';
  @Input() description: string = '';
}
