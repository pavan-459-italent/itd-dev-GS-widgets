import { useState, useEffect } from "react";
import styled from "styled-components";
import type { WidgetSDK, WidgetProps } from "./types";

const Section = styled.section`
  padding: 2rem;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  border-radius: 12px;
  background: linear-gradient(135deg, #f97316 0%, #db2777 100%);
  color: #ffffff;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

const Description = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1rem;
  opacity: 0.85;
  line-height: 1.6;
`;

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [props, setProps] = useState<WidgetProps>(sdk.getProps());

  useEffect(() => sdk.on("propsChanged", setProps), [sdk]);

  return (
    <Section>
      <Title>{props.title}</Title>
      {props.description && <Description>{props.description}</Description>}
    </Section>
  );
}
