import { ButtonHTMLAttributes, useMemo } from "react";
import { forwardRef, memo } from "react";
import style from "./Button.module.css";
import React from "react";
import { classNames } from "../utilities/classNames";
export const Button = memo(
  forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: string;
      size?: string;
      quiet?: boolean;
      rounded?: boolean;
      "data-variant"?: string;

      popovertarget?: string;
      popovertargetaction?: string;
    }
  >(({ children, color, quiet, size, variant, rounded, ...props }, ref) => {
    const dataVariant = useMemo(() => {
      const items = [variant, size, rounded ? "rounded" : "", color, props["data-variant"]].filter(Boolean);
      return items.join(" ").trim();
    }, [variant, size, rounded, color]);

    const className = classNames(style.button, props.className);
    return (
      <button {...props} ref={ref} className={className} data-variant={dataVariant}>
        {children}
      </button>
    );
  }),
);
Button.displayName = "Button";
