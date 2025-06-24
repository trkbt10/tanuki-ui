import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Dfn = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <dfn className={style.dfn} {...props} ref={ref} />;
  }),
);
Dfn.displayName = "Dfn";