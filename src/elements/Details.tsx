import React, { AllHTMLAttributes, forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Details = memo(
  forwardRef<HTMLDetailsElement, AllHTMLAttributes<HTMLDetailsElement>>((props, ref) => {
    return (
      <details className={style.details} {...props} ref={ref}>
        {props.children}
      </details>
    );
  }),
);
Details.displayName = "Details";
