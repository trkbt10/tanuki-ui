import * as React from "react";
import styles from "./PositionInputsGrid.module.css";

export interface PositionInputsGridProps {
  children: React.ReactNode;
}

/**
 * Grid container for position and size inputs
 */
export const PositionInputsGrid: React.FC<PositionInputsGridProps> = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

PositionInputsGrid.displayName = "PositionInputsGrid";
