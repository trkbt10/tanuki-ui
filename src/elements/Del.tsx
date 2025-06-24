import React, { forwardRef, DelHTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Del = memo(
  forwardRef<HTMLModElement, DelHTMLAttributes<HTMLModElement>>((props, ref) => {
    return <del className={style.del} {...props} ref={ref} />;
  }),
);
Del.displayName = "Del";