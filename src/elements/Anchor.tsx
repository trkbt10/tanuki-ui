import React, { useMemo, forwardRef } from "react";
import style from "./elements.module.css";

export const Anchor = forwardRef<HTMLAnchorElement, React.JSX.IntrinsicElements["a"]>((props, ref) => {
  const className = useMemo(() => [style.a, props.className].join(" "), [props.className]);
  return (
    <a {...props} className={className} ref={ref}>
      {props.children}
    </a>
  );
});
Anchor.displayName = "Anchor";
export const A = Anchor;
