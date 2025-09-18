import React from "react";
import { Section, Card, Div } from "tanuki-ui";
import styles from "./DemoLayouts.module.css";

function mergeClassName(propsClass?: string, styleClass?: string) {
  return [styleClass, propsClass].filter(Boolean).join(" ");
}

export const DemoSection: React.FC<React.ComponentProps<typeof Section>> = ({ className, children, ...rest }) => (
  <Section className={mergeClassName(className, styles.section)} {...rest}>
    {children}
  </Section>
);

export const DemoCard: React.FC<React.ComponentProps<typeof Card>> = ({ className, children, ...rest }) => (
  <Card className={mergeClassName(className, styles.card)} {...rest}>
    {children}
  </Card>
);

export const DemoRow: React.FC<React.ComponentProps<typeof Div>> = ({ className, children, ...rest }) => (
  <Div className={mergeClassName(className, styles.row)} {...rest}>
    {children}
  </Div>
);

export const DemoStack: React.FC<React.ComponentProps<typeof Div>> = ({ className, children, ...rest }) => (
  <Div className={mergeClassName(className, styles.stack)} {...rest}>
    {children}
  </Div>
);

export const DemoGrid: React.FC<React.ComponentProps<typeof Div>> = ({ className, children, ...rest }) => (
  <Div className={mergeClassName(className, styles.grid)} {...rest}>
    {children}
  </Div>
);

export const DemoToolbarRow: React.FC<React.ComponentProps<typeof Div>> = ({ className, children, ...rest }) => (
  <Div className={mergeClassName(className, styles.toolbar)} {...rest}>
    {children}
  </Div>
);

export const DemoLayouts = {
  Section: DemoSection,
  Card: DemoCard,
  Row: DemoRow,
  Stack: DemoStack,
  Grid: DemoGrid,
  ToolbarRow: DemoToolbarRow,
};

export default DemoLayouts;
