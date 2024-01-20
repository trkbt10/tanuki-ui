import type { PropsWithChildren } from "react";
import * as React from "react";
import { forwardRef, memo } from "react";
import style from "./form.module.css";
export const Legend = memo(
  forwardRef<HTMLLegendElement, PropsWithChildren<{}>>((props, ref) => {
    return (
      <legend className={style.legend} ref={ref}>
        {props.children}
      </legend>
    );
  }),
);
Legend.displayName = "Legend";
