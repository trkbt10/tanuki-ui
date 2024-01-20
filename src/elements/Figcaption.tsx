import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Figcaption = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <figcaption className={style.figcaption} {...props} ref={ref} />;
  }),
);
Figcaption.displayName = "Figcaption";
