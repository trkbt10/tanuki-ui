import * as React from "react";
import styles from "./InspectorParts.module.css";

export interface ReadOnlyFieldProps {
  children: React.ReactNode;
}

/**
 * Read-only field display component
 */
export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ children }) => {
  return <div className={styles.readOnlyField}>{children}</div>;
};

ReadOnlyField.displayName = "ReadOnlyField";
