import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Kbd = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <kbd className={style.kbd} {...props} ref={ref} />;
  }),
);
Kbd.displayName = "Kbd";