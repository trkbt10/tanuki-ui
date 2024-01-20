import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Div = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
    return <div className={style.div} {...props} ref={ref} />;
  }),
);
Div.displayName = "Div";
