import * as React from "react";
import classes from "./ChevronMark.module.css";
export const ChevronMark: React.FC<{
  direction?: "up" | "down" | "left" | "right";
  size?: number;
}> = ({ direction, size }) => {
  const style = React.useMemo(() => {
    const defaultSize = "1em";
    return {
      width: size ?? defaultSize,
      height: size ?? defaultSize,
    };
  }, [size]);
  return (
    <i className={classes.mark} data-direction={direction ?? "down"} role="decoration" style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </i>
  );
};
ChevronMark.displayName = "ChevronMark";
