import React, { forwardRef, FormHTMLAttributes, memo } from "react";
import style from "./form.module.css";

export const Form = memo(
  forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>((props, ref) => {
    return <form className={style.form} {...props} ref={ref} />;
  }),
);
Form.displayName = "Form";
