import React, { forwardRef, InsHTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Ins = memo(
  forwardRef<HTMLModElement, InsHTMLAttributes<HTMLModElement>>((props, ref) => {
    return <ins className={style.ins} {...props} ref={ref} />;
  }),
);
Ins.displayName = "Ins";