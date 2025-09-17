import React, { forwardRef, memo } from "react";

export const Bdi = memo(
  forwardRef<HTMLElement, React.JSX.IntrinsicElements["bdi"]>((props, ref) => {
    return <bdi {...props} ref={ref} />;
  }),
);
Bdi.displayName = "Bdi";
