import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Main = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <main className={style.main} {...props} ref={ref} />;
  }),
);
Main.displayName = "Main";
