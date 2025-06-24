import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Strong = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <strong className={style.strong} {...props} ref={ref} />;
  }),
);
Strong.displayName = "Strong";