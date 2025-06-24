import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Ruby = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <ruby className={style.ruby} {...props} ref={ref} />;
  }),
);
Ruby.displayName = "Ruby";