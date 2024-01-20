import * as React from "react";
import classes from "./AppLayout.module.css";
export const AppLayout = ({
  header,
  children,
  footer,
}: {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  return (
    <div className={classes.base}>
      {header && <header className={classes.header}>{header}</header>}
      <main className={classes.main}>{children}</main>
      {footer && <footer className={classes.footer}>{footer}</footer>}
    </div>
  );
};

const AppContent = ({ children }: { children?: React.ReactNode }) => {
  return <div className={classes.content}>{children}</div>;
};
AppLayout.Content = AppContent;
