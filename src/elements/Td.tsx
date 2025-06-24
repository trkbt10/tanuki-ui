import React, { forwardRef, TdHTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Td = memo(
  forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>((props, ref) => {
    return <td className={style.td} {...props} ref={ref} />;
  }),
);
Td.displayName = "Td";