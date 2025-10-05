import * as React from "react";
import styles from "./ReadOnlyField.module.css";

export interface ReadOnlyFieldProps {
  children: React.ReactNode;
}

/**
 * Read-only field display component
 */
export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ children }) => {
  return <div className={styles.field}>{children}</div>;
};

ReadOnlyField.displayName = "ReadOnlyField";
