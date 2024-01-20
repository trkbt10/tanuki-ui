import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./table.module.css";

export const Table = memo(
  forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>((props, ref) => {
    return (
      <table className={style.table} {...props} ref={ref}>
        {props.children}
      </table>
    );
  }),
);
Table.displayName = "Table";
