import React, { forwardRef, OutputHTMLAttributes, memo } from "react";
import style from "./form.module.css";

export const Output = memo(
  forwardRef<HTMLOutputElement, OutputHTMLAttributes<HTMLOutputElement>>((props, ref) => {
    return <output className={style.output} {...props} ref={ref} />;
  }),
);
Output.displayName = "Output";
