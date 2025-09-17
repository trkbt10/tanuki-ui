import React, { forwardRef, memo } from "react";

export const Bdo = memo(
  forwardRef<HTMLElement, React.JSX.IntrinsicElements["bdo"]>((props, ref) => {
    return <bdo {...props} ref={ref} />;
  }),
);
Bdo.displayName = "Bdo";
