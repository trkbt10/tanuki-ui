import * as React from "react";
import styles from "../inspector/InspectorPanel.module.css";

export interface InspectorLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InspectorLabel: React.FC<InspectorLabelProps> = ({ children, className, ...rest }) => {
  return (
    <div className={[styles.inspectorLabel, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
};

InspectorLabel.displayName = "InspectorLabel";

