import React, { memo, useCallback, useState } from "react";
import style from "./TabBar.module.css";
type Item = { key: string; icon?: React.ReactNode; value: string };
type TabItemSelectHandler = (item: Item, index: number) => void;
export const TabBar: React.FC<{
  items: Item[];
  defaultSelected?: number;
  onSelect: TabItemSelectHandler;
  tabIndex?: number;
}> = memo(({ items, onSelect, tabIndex, defaultSelected }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(() => defaultSelected ?? 0);
  const handleSelect: TabItemSelectHandler = useCallback(
    (item, index) => {
      onSelect(item, index);
      setSelectedItemIndex(index);
    },
    [onSelect]
  );
  return (
    <nav className={style.tabbar} tabIndex={tabIndex}>
      <ul className={style.tabs}>
        {items.map((item, i) => {
          return (
            <TabItem key={i} item={item} tabIndex={i} onSelect={handleSelect} selected={i === selectedItemIndex}></TabItem>
          );
        })}
      </ul>
    </nav>
  );
});
TabBar.displayName = "TabBar";
const TabItem: React.FC<{
  item: Item;
  onSelect: TabItemSelectHandler;
  tabIndex: number;
  selected: boolean;
}> = memo(({ tabIndex, item, onSelect, selected }) => {
  const handleClick: React.MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      onSelect(item, tabIndex);
    },
    [onSelect, item, tabIndex]
  );
  return (
    <li className={style.tabitem} data-selected={selected}>
      <a tabIndex={tabIndex} onClick={handleClick}>
        <div className={style.tabitemIcon}>{item.icon}</div>
        <span className={style.tabitemLabel}>{item.value}</span>
      </a>
    </li>
  );
});
