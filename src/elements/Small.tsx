import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Small = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <small className={style.small} {...props} ref={ref} />;
  }),
);
Small.displayName = "Small";