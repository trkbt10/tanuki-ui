import * as React from "react";
import { classNames } from "./elements";
import styles from "./TabNav.module.css";

export interface TabNavProps {
  tabs: string[];
  activeTabIndex: number;
  onTabChange: (index: number) => void;
  className?: string;
}

export const TabNav: React.FC<TabNavProps> = ({ tabs, activeTabIndex, onTabChange, className }) => {
  return (
    <div className={classNames(styles.tabNav, className)}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={classNames(
            styles.tabButton,
            index === activeTabIndex && styles.tabButtonActive
          )}
          onClick={() => onTabChange(index)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

TabNav.displayName = "TabNav";
