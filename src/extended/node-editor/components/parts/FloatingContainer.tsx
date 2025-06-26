import * as React from "react";
import styles from "./FloatingContainer.module.css";

export interface FloatingContainerProps {
  position?: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  children?: React.ReactNode;
}

export const FloatingContainer: React.FC<FloatingContainerProps> = ({
  position = "top",
  className,
  children,
}) => {
  const positionClass = React.useMemo(() => {
    switch (position) {
      case "top":
        return styles.top;
      case "bottom":
        return styles.bottom;
      case "top-left":
        return styles.topLeft;
      case "top-right":
        return styles.topRight;
      case "bottom-left":
        return styles.bottomLeft;
      case "bottom-right":
        return styles.bottomRight;
      default:
        return styles.top;
    }
  }, [position]);

  return (
    <div className={`${styles.floatingContainer} ${positionClass} ${className || ""}`}>
      {children}
    </div>
  );
};