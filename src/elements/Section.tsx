import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Section = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <section className={style.section} {...props} ref={ref} />;
  }),
);
Section.displayName = "Section";
