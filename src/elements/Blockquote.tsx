import React, { forwardRef, BlockquoteHTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Blockquote = memo(
  forwardRef<HTMLQuoteElement, BlockquoteHTMLAttributes<HTMLQuoteElement>>((props, ref) => {
    return <blockquote className={style.blockquote} {...props} ref={ref} />;
  }),
);
Blockquote.displayName = "Blockquote";
