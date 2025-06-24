import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Samp = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <samp className={style.samp} {...props} ref={ref} />;
  }),
);
Samp.displayName = "Samp";