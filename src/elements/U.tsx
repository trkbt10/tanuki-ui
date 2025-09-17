import React, { forwardRef, memo } from "react";

export const U = memo(
  forwardRef<HTMLElement, React.JSX.IntrinsicElements["u"]>((props, ref) => {
    return <u {...props} ref={ref} />;
  }),
);
U.displayName = "U";
