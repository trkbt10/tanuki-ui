import React, { forwardRef, memo } from "react";

export const B = memo(
  forwardRef<HTMLElement, React.JSX.IntrinsicElements["b"]>((props, ref) => {
    return <b {...props} ref={ref} />;
  }),
);
B.displayName = "B";
