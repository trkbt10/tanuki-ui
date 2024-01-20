import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Figure = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <figure className={style.figure} {...props} ref={ref} />;
  }),
);
Figure.displayName = "Figure";
