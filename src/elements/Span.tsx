import React, { forwardRef, memo } from "react";

export const Span = memo(
  forwardRef<HTMLSpanElement, React.JSX.IntrinsicElements["span"]>((props, ref) => {
    return <span {...props} ref={ref} />;
  }),
);
Span.displayName = "Span";
