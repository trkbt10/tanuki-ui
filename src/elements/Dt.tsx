import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Dt = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <dt className={style.dt} {...props} ref={ref} />;
  }),
);
Dt.displayName = "Dt";