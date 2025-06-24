import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Em = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <em className={style.em} {...props} ref={ref} />;
  }),
);
Em.displayName = "Em";