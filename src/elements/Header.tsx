import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Header = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <header className={style.header} {...props} ref={ref} />;
  }),
);
Header.displayName = "Header";
