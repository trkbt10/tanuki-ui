import React, { forwardRef, memo } from "react";

export const Br = memo(
  forwardRef<HTMLBRElement, React.JSX.IntrinsicElements["br"]>((props, ref) => {
    return <br {...props} ref={ref} />;
  }),
);
Br.displayName = "Br";
