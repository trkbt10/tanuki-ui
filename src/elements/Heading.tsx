import React, { forwardRef, HTMLAttributes, memo, createElement } from "react";
import style from "./elements.module.css";
const levelToHeadingType = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

type HeadingLevel = keyof typeof levelToHeadingType;
export const Heading = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement> & { level: HeadingLevel }>(
    ({ level, children, ...props }, ref) => {
      const type = levelToHeadingType[level] ?? "h3";
      return createElement(
        type,
        {
          ...props,
          ref,
          className: style.heading,
        },
        children,
      );
    },
  ),
);
Heading.displayName = "Heading";

export const H1 = forwardRef<HTMLHeadingElement, React.JSX.IntrinsicElements["h1"]>((props, ref) => (
  <Heading level={1} {...props} ref={ref} />
));

export const H2 = forwardRef<HTMLHeadingElement, React.JSX.IntrinsicElements["h2"]>((props, ref) => (
  <Heading level={2} {...props} ref={ref} />
));

export const H3 = forwardRef<HTMLHeadingElement, React.JSX.IntrinsicElements["h3"]>((props, ref) => (
  <Heading level={3} {...props} ref={ref} />
));

export const H4 = forwardRef<HTMLHeadingElement, React.JSX.IntrinsicElements["h4"]>((props, ref) => (
  <Heading level={4} {...props} ref={ref} />
));

export const H5 = forwardRef<HTMLHeadingElement, React.JSX.IntrinsicElements["h5"]>((props, ref) => (
  <Heading level={5} {...props} ref={ref} />
));

export const H6 = forwardRef<HTMLHeadingElement, React.JSX.IntrinsicElements["h6"]>((props, ref) => (
  <Heading level={6} {...props} ref={ref} />
));
