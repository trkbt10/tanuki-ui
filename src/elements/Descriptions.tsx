import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Descriptions = memo(
  forwardRef<HTMLDListElement, HTMLAttributes<HTMLDListElement>>((props, ref) => {
    return (
      <dl className={style.descriptions} {...props} ref={ref}>
        {props.children}
      </dl>
    );
  }),
);
Descriptions.displayName = "Descriptions";
export const Dl = Descriptions;
