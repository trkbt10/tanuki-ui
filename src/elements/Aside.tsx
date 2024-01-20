import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Aside = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <aside className={style.aside} {...props} ref={ref} />;
  }),
);
Aside.displayName = "Aside";
