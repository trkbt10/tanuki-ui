import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Paragraph = memo(
  forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => {
    return <p className={style.paragraph} {...props} ref={ref} />;
  }),
);
Paragraph.displayName = "Paragraph";
export const P = Paragraph;
