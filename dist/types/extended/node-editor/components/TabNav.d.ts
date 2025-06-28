import * as React from "react";
export interface TabNavProps {
    tabs: string[];
    activeTabIndex: number;
    onTabChange: (index: number) => void;
    className?: string;
}
export declare const TabNav: React.FC<TabNavProps>;
