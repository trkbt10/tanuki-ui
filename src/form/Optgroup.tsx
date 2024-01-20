import React, { forwardRef, OptgroupHTMLAttributes, memo } from "react";
import style from "./form.module.css";

export const Optgroup = memo(
  forwardRef<HTMLOptGroupElement, OptgroupHTMLAttributes<HTMLOptGroupElement>>((props, ref) => {
    return <optgroup className={style.optgroup} {...props} ref={ref} />;
  }),
);
Optgroup.displayName = "Optgroup";
