import * as React from "react";
import { useMeasure } from "../hooks/useMeasure";
import classNames from "./AutoSizer.module.css";

export const AutoSizer = (props: { children: (size: { width: number; height: number }) => React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [bound] = useMeasure(ref);
  return (
    <div ref={ref} className={classNames.autoSizer}>
      <div className={classNames.body}>{bound && props.children(bound)}</div>
    </div>
  );
};
AutoSizer.displayName = "AutoSizer";
