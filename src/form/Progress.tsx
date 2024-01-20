import React, { forwardRef, ProgressHTMLAttributes, memo } from "react";
import style from "./form.module.css";

export const Progress = memo(
  forwardRef<HTMLProgressElement, ProgressHTMLAttributes<HTMLProgressElement>>((props, ref) => {
    return <progress className={style.progress} {...props} ref={ref} />;
  }),
);
Progress.displayName = "Progress";
