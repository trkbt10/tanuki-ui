import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Code = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <code className={style.code} {...props} ref={ref} />;
  }),
);
Code.displayName = "Code";