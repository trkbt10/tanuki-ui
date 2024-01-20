import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./List.module.css";
export const List = memo(
  forwardRef<HTMLUListElement, React.PropsWithChildren<HTMLAttributes<HTMLUListElement>>>(({ children, ...props }, ref) => {
    return (
      <ul className={style.list} {...props} ref={ref}>
        {children}
      </ul>
    );
  }),
);
export const Ul = List;
List.displayName = "List";
export const ListItem: React.FC<
  React.PropsWithChildren<
    {
      label?: React.ReactNode;
      selected?: boolean;
      icon?: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLLIElement | HTMLDetailsElement>;
    } & React.HTMLAttributes<HTMLLIElement>
  >
> = memo(({ label, onClick, icon, selected, children, ...attrs }) => {
  return (
    <li className={style.listItem} onClick={onClick} data-selected={selected} {...attrs}>
      <div className={style.listItemLabelArea}>
        {typeof icon === "string" ? <div className={style.listItemMarker}>{icon}</div> : icon}
        <label className={style.listItemLabel}>{label}</label>
      </div>
      {children}
    </li>
  );
});
ListItem.displayName = "ListItem";
export const Li = ListItem;
