import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Caption = memo(
  forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>((props, ref) => {
    return <caption className={style.caption} {...props} ref={ref} />;
  }),
);
Caption.displayName = "Caption";