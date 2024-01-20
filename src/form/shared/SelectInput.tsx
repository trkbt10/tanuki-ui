import * as React from "react";
import { ChevronMark } from "../../blocks/ChevronMark";
import classes from "./SelectInput.module.css";

export interface SelectInputProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isOpen?: boolean;
  className?: string;
}

export const SelectInput = React.forwardRef<HTMLDivElement | null, SelectInputProps>(({
  children,
  onClick,
  disabled = false,
  isOpen = false,
  className
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${classes.inputContainer} ${className || ''}`} 
      onClick={disabled ? undefined : onClick}
      data-disabled={disabled}
    >
      <div className={classes.content}>
        {children}
      </div>
      <div className={classes.mark} role="presentation">
        <ChevronMark direction={isOpen ? "up" : "down"} />
      </div>
    </div>
  );
});

SelectInput.displayName = "SelectInput";