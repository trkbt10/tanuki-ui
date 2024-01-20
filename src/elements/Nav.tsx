import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Nav = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <nav className={style.nav} {...props} ref={ref} />;
  }),
);
Nav.displayName = "Nav";
