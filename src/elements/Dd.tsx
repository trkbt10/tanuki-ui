import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Dd = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <dd className={style.dd} {...props} ref={ref} />;
  }),
);
Dd.displayName = "Dd";