import { InjectionToken } from "@angular/core";
import type { WidgetSDK } from "./types";

export const WIDGET_SDK = new InjectionToken<WidgetSDK>("WIDGET_SDK");
