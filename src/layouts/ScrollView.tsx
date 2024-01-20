import * as React from "react";
import classes from "./ScrollView.module.css";
export const ScrollView: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return <div className={classes.base}>{props.children}</div>;
};
ScrollView.displayName = "ScrollView";
