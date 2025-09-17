import React, { forwardRef, memo } from "react";

export const Wbr = memo(
  forwardRef<HTMLElement, React.JSX.IntrinsicElements["wbr"]>((props, ref) => {
    return <wbr {...props} ref={ref} />;
  }),
);
Wbr.displayName = "Wbr";
