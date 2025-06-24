import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Abbr = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <abbr className={style.abbr} {...props} ref={ref} />;
  }),
);
Abbr.displayName = "Abbr";