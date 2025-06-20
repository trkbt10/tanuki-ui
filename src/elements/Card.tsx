import * as React from "react";
import style from "./elements.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card
   * @default "elevated"
   */
  variant?: "elevated" | "outlined" | "filled";
  
  /**
   * Whether the card is interactive/clickable
   * @default false
   */
  clickable?: boolean;
  
  /**
   * Whether the card is disabled
   * @default false
   */
  disabled?: boolean;
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  variant = "elevated",
  clickable = false,
  disabled = false,
  className,
  style: inlineStyle,
  ...props
}) => {
  return (
    <div
      className={`${style.card} ${className || ""}`}
      data-variant={variant}
      data-clickable={clickable}
      disabled={disabled}
      tabIndex={clickable && !disabled ? 0 : undefined}
      role={clickable ? "button" : undefined}
      style={{
        ...inlineStyle,
        ...(clickable && !disabled ? { cursor: "pointer" } : {})
      }}
      {...props}
    />
  );
};

Card.displayName = "Card";
