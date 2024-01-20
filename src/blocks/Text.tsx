import * as React from "react";
import style from "./Text.module.css";
export const Text: React.FC<
  React.PropsWithChildren<{
    ruby?: string;
  }>
> = ({ ruby, children }) => {
  return (
    <span className={style.text}>
      {ruby ? (
        <ruby>
          {children}
          <rt>{ruby}</rt>
        </ruby>
      ) : (
        children
      )}
    </span>
  );
};
Text.displayName = "Text";
