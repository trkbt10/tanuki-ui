import * as React from "react";
import style from "./elements.module.css";
export const Card: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return <div className={style.card}>{props.children}</div>;
};
Card.displayName = "Card";
