import * as React from "react";
import classes from "./HeaderMainLayout.module.css";
export const HeaderMainLayout = ({ header, children }: { header: React.ReactNode; children: React.ReactNode }) => {
  return (
    <div className={classes.base}>
      <header className={classes.header}>{header}</header>
      <div className={classes.main}>{children}</div>
    </div>
  );
};
HeaderMainLayout.displayName = "HeaderMainLayout";
