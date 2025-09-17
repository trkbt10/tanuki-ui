import React, { forwardRef, memo } from "react";

export const S = memo(
  forwardRef<HTMLElement, React.JSX.IntrinsicElements["s"]>((props, ref) => {
    return <s {...props} ref={ref} />;
  }),
);
S.displayName = "S";
