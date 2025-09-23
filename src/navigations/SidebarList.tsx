import React, { memo } from "react";
import { ChevronMark } from "../blocks/ChevronMark";
import { List } from "../elements/List";
import style from "./SidebarList.module.css";

/**
 * サイドバーセクション全体を囲むコンテナ。
 * @param {boolean} [open] - セクションの開閉状態を制御
 * その他、<details>要素の属性を継承
 */
const Container = React.memo(
  React.forwardRef<
    HTMLDetailsElement,
    React.PropsWithChildren<React.AllHTMLAttributes<HTMLDetailsElement>>
  >(({ children, className, ...rest }, ref) => {
    const classNames = className ? `${style.details} ${className}` : style.details;
    return (
      <details className={classNames} {...rest} ref={ref}>
        {children}
      </details>
    );
  }),
);
Container.displayName = "Container";

/**
 * セクションのタイトル。
 * @param {string} title - タイトル文字列
 * @param {React.ReactNode} [children] - タイトル右側に配置する要素（例: ボタン）
 */
const SectionTitle: React.FC<React.PropsWithChildren<{ title: React.ReactNode }>> = React.memo(
  ({ title, children }) => {
    return (
      <Summary>
        <div className={style.sectionTitle}>
          <span>{title}</span>
          {children}
          <i className={style.marker}>
            <ChevronMark />
          </i>
        </div>
      </Summary>
    );
  },
);
SectionTitle.displayName = "SectionTitle";

/**
 * セクションタイトル内などで使うボタン。
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - ボタン属性
 */
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...rest }, ref) => {
    const classNames = className ? `${style.button} ${className}` : style.button;
    return <button {...rest} ref={ref} className={classNames}></button>;
  },
);
Button.displayName = "Button";

export const ListItem: React.FC<
  React.PropsWithChildren<
    {
      label?: React.ReactNode;
      selected?: boolean;
      icon?: React.ReactNode;
      open?: boolean;
      onClick?: React.MouseEventHandler<HTMLElement>;
    } & React.HTMLAttributes<HTMLLIElement>
  >
> = memo(({ label, onClick, icon, selected, children, open, className, ...attrs }) => {
  const LabelAs = onClick ? "button" : "div";
  const labelArea = (
    <LabelAs className={style.listItemLabelArea} onClick={onClick}>
      {typeof icon === "string" ? <div className={style.listItemMarker}>{icon}</div> : icon}
      <span className={style.listItemLabel}>{label}</span>
    </LabelAs>
  );
  return (
    <li className={className ? `${style.listItem} ${className}` : style.listItem} data-selected={selected} {...attrs}>
      {children ? (
        <details open={open} className={style.details}>
          <summary className={style.summary}>
            {labelArea}
            <i className={style.marker}>
              <ChevronMark />
            </i>
          </summary>
          <div className={style.listItemChildren}>{children}</div>
        </details>
      ) : (
        labelArea
      )}
    </li>
  );
});
/**
 * セクションのsummary部分。内部利用。
 * @param {React.ReactNode} children - サマリー内に表示する要素
 */
const Summary: React.FC<React.PropsWithChildren<{}>> = React.memo(({ children }) => {
  return <summary className={style.summary}>{children}</summary>;
});
Summary.displayName = "Summary";

export const SidebarList = {
  Button,
  Container,
  SectionTitle,
  Summary,
  ListItem,
  List,
};
