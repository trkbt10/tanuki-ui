import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Rt = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <rt className={style.rt} {...props} ref={ref} />;
  }),
);
Rt.displayName = "Rt";