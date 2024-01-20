import { AllHTMLAttributes, forwardRef, memo } from "react";
import style from "./elements.module.css";
import React from "react";
import { ChevronMark } from "../blocks/ChevronMark";

export const Summary = memo(
  forwardRef<HTMLElement, AllHTMLAttributes<HTMLElement>>((props, ref) => {
    return (
      <summary className={style.summary} {...props} ref={ref}>
        <span className={style.label}>{props.children}</span>
        <i className={style.marker}>
          <ChevronMark />
        </i>
      </summary>
    );
  }),
);
Summary.displayName = "Summary";
