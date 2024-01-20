import * as React from "react";
import { forwardRef, memo } from "react";
import style from "./form.module.css";

export const Fieldset = memo(
  forwardRef<HTMLFieldSetElement, React.JSX.IntrinsicElements["fieldset"]>(({ children, ...props }, ref) => {
    return (
      <fieldset className={style.fieldset} {...props} ref={ref}>
        {children}
      </fieldset>
    );
  }),
);
Fieldset.displayName = "Fieldset";
