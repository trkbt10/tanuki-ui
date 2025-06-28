import * as React from "react";
import { SelectionBox } from "./SelectionBox";
import { classNames } from "../elements";
import styles from "./SelectionOverlay.module.css";

export interface SelectionOverlayProps {
  className?: string;
}

/**
 * SelectionOverlay - Overlay layer for selection visual feedback
 * This layer passes through all pointer events to underlying layers
 */
export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({ className }) => {
  return (
    <div
      className={classNames(styles.selectionOverlay, className)}
    >
      <SelectionBox />
    </div>
  );
};

SelectionOverlay.displayName = "SelectionOverlay";