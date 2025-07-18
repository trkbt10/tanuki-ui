import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Sub = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <sub className={style.sub} {...props} ref={ref} />;
  }),
);
Sub.displayName = "Sub";