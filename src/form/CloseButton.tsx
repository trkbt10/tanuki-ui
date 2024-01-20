import React from "react";

import classes from "./CloseButton.module.css";
import { CloseIcon } from "../blocks/Icon";
export const CloseButton = React.memo(
  React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ children, ...props }, ref) => {
    return (
      <button {...props} ref={ref} className={classes.closeButton} aria-label="Close" type="button" data-variant="close">
        <CloseIcon size={16} />
      </button>
    );
  }),
);
