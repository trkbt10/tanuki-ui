import * as React from "react";
import classes from "./SwitchInput.module.css";
import type { HTMLInputElementProps } from "../Input";
export const SwitchInput = React.forwardRef<HTMLInputElement, HTMLInputElementProps>(
  ({ defaultValue, value, ...props }, ref) => {
    return (
      <label className={classes.base} htmlFor={props.name}>
        <input type="checkbox" {...props} ref={ref} className={classes.input} />
        <div className={classes.toggle}>
          <div className={classes.knob}></div>
        </div>
      </label>
    );
  },
);
SwitchInput.displayName = "SwitchInput";
