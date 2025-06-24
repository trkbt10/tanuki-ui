import React, { forwardRef, ThHTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Th = memo(
  forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>((props, ref) => {
    return <th className={style.th} {...props} ref={ref} />;
  }),
);
Th.displayName = "Th";