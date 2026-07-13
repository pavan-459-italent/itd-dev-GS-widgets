import { useState, useEffect } from "react";
import styled, { StyleSheetManager } from "styled-components";
import type { WidgetSDK, WidgetProps } from "./types";

const Card = styled.div`
  padding: 2rem;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
  border-radius: 12px;
  font-weight: 700;
  background: pink;
  color: black;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1rem;
  opacity: 0.7;
`;

const Counter = styled.button`
  align-self: flex-start;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  background: #6c63ff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #574fd6;
  }
`;

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [props, setProps] = useState<WidgetProps>(sdk.getProps());
  const [count, setCount] = useState(0);

  useEffect(
    () => sdk.on("propsChanged", (data) => setProps(data as WidgetProps)),
    [sdk],
  );

  return (
    <StyleSheetManager target={sdk.shadowRoot as unknown as HTMLElement}>
      <Card>
        <Label>{props.label ?? "Styled Widget"}</Label>
        <Counter onClick={() => setCount((n) => n + 1)}>
          Clicked {count} {count === 1 ? "time" : "times"}
        </Counter>
      </Card>
    </StyleSheetManager>
  );
}
