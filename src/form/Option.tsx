import React, { forwardRef, OptionHTMLAttributes, memo } from "react";
import style from "./form.module.css";

export const Option = memo(
  forwardRef<HTMLOptionElement, OptionHTMLAttributes<HTMLOptionElement>>((props, ref) => {
    return <option className={style.option} {...props} ref={ref} />;
  }),
);
Option.displayName = "Option";
