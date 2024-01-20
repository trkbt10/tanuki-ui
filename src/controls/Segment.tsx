import * as React from "react";
import { memo } from "react";
import style from "./Segment.module.css";

export const Segment: React.FC<React.PropsWithChildren<{}>> = memo(({ children }) => {
  return <div className={style.segment}>{children}</div>;
});
