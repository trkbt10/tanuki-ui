import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Address = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <address className={style.address} {...props} ref={ref} />;
  }),
);
Address.displayName = "Address";
