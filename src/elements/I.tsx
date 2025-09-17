import React, { forwardRef, memo } from "react";

export const I = memo(
  forwardRef<HTMLElement, React.JSX.IntrinsicElements["i"]>((props, ref) => {
    return <i {...props} ref={ref} />;
  }),
);
I.displayName = "I";
