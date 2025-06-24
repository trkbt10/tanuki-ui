import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Mark = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <mark className={style.mark} {...props} ref={ref} />;
  }),
);
Mark.displayName = "Mark";