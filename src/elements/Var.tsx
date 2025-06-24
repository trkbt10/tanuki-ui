import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Var = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <var className={style.var} {...props} ref={ref} />;
  }),
);
Var.displayName = "Var";