import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Footer = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <footer className={style.footer} {...props} ref={ref} />;
  }),
);
Footer.displayName = "Footer";
