import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const HorizontalRule = memo(
  forwardRef<HTMLHRElement, React.PropsWithChildren<HTMLAttributes<HTMLHRElement>>>((props, ref) => {
    return (
      <hr className={style.horizontalrule} {...props} ref={ref}>
        {props.children}
      </hr>
    );
  }),
);
HorizontalRule.displayName = "HorizontalRule";
export const Hr = HorizontalRule;
