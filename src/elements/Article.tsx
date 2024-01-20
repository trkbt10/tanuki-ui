import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./elements.module.css";

export const Article = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
    return <article className={style.article} {...props} ref={ref} />;
  }),
);
Article.displayName = "Article";
