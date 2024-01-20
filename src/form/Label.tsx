import * as React from "react";
import { AllHTMLAttributes, Children, forwardRef, memo } from "react";
import { Text } from "../blocks/Text";
import style from "./form.module.css";
import { classNames } from "../utilities/classNames";

export const Label = memo(
  forwardRef<HTMLLabelElement, AllHTMLAttributes<HTMLLabelElement>>(({ children, ...props }, ref) => {
    const className = classNames(style.label, props.className);
    return (
      <label className={className} {...props} ref={ref}>
        {Children.map(children, (child) => {
          if (typeof child === "string") {
            return <Text>{child}</Text>;
          }
          return child;
        })}
      </label>
    );
  }),
);
Label.displayName = "Label";
