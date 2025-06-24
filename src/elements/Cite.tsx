import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Cite = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <cite className={style.cite} {...props} ref={ref} />;
  }),
);
Cite.displayName = "Cite";