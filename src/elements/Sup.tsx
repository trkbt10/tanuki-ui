import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Sup = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <sup className={style.sup} {...props} ref={ref} />;
  }),
);
Sup.displayName = "Sup";