import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Pre = memo(
  forwardRef<HTMLPreElement, HTMLAttributes<HTMLPreElement>>((props, ref) => {
    return <pre className={style.pre} {...props} ref={ref} />;
  }),
);
Pre.displayName = "Pre";
