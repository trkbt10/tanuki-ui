import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./List.module.css";
export const List = memo(
  forwardRef<HTMLUListElement, React.PropsWithChildren<HTMLAttributes<HTMLUListElement>>>(({ children, ...props }, ref) => {
    return (
      <ul className={style.list} {...props} ref={ref}>
        {children}
      </ul>
    );
  })
);
export const Ul = List;
List.displayName = "List";
export const ListItem = memo(
  forwardRef<HTMLLIElement, React.PropsWithChildren<HTMLAttributes<HTMLLIElement>>>(({ children, ...props }, ref) => {
    return (
      <li className={style.listItem} {...props} ref={ref}>
        <div className={style.listItemLabelArea}>
          <span className={style.listItemLabel}>{children}</span>
        </div>
      </li>
    );
  })
);
export const Li = ListItem;
