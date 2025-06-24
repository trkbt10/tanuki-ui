import React, { forwardRef, QuoteHTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Q = memo(
  forwardRef<HTMLQuoteElement, QuoteHTMLAttributes<HTMLQuoteElement>>((props, ref) => {
    return <q className={style.q} {...props} ref={ref} />;
  }),
);
Q.displayName = "Q";