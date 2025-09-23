import * as React from "react";
import classes from "./ScrollView.module.css";

export const ScrollView = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => {
    const composedClassName = className ? `${classes.base} ${className}` : classes.base;
    return (
      <div className={composedClassName} ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);

ScrollView.displayName = "ScrollView";
