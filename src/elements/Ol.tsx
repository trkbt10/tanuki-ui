import React, { forwardRef, OlHTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Ol = memo(
  forwardRef<HTMLOListElement, OlHTMLAttributes<HTMLOListElement>>((props, ref) => {
    return <ol className={style.ol} {...props} ref={ref} />;
  }),
);
Ol.displayName = "Ol";