import * as React from "react";
import { forwardRef, memo, TextareaHTMLAttributes } from "react";
import style from "./input.module.css";

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {
    return (
      <textarea className={style.input} {...props} ref={ref}>
        {props.children}
      </textarea>
    );
  }),
);
Textarea.displayName = "Textarea";
