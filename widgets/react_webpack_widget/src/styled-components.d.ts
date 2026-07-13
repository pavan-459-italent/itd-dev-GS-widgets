import 'styled-components';

declare module 'styled-components' {
  interface StyleSheetManagerProps {
    target?: HTMLElement | ShadowRoot;
  }
}
