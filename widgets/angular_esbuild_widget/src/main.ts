import '@angular/compiler';
import 'zone.js';
import { createComponent } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import type { WidgetSDK, WidgetProps } from './types';

export async function init(sdk: WidgetSDK) {
  await sdk.whenReady();

  const container = sdk.getContainer();
  const props = sdk.getProps();

  // Bootstrap Angular application
  const appRef = await createApplication({ providers: [] });

  // Mount the component directly into the SDK container element
  const componentRef = createComponent(AppComponent, {
    environmentInjector: appRef.injector,
    hostElement: container,
  });

  // Set initial props
  componentRef.instance.title = props.title ?? 'Angular Widget';
  componentRef.instance.description = (props.description as string) ?? '';
  componentRef.changeDetectorRef.detectChanges();

  appRef.attachView(componentRef.hostView);

  // React to prop updates
  sdk.on('propsChanged', (newProps: WidgetProps) => {
    componentRef.instance.title = newProps.title ?? 'Angular Widget';
    componentRef.instance.description = (newProps.description as string) ?? '';
    componentRef.changeDetectorRef.detectChanges();
  });

  sdk.on('destroy', () => {
    componentRef.destroy();
    appRef.destroy();
  });
}
