import { default as React } from 'react';
export interface ViewSwitcherItem {
    label: React.ReactNode;
    component: React.ComponentType<any>;
    key?: string;
}
export interface ViewSwitcherProps {
    items: ViewSwitcherItem[];
    defaultSelected?: number;
    onViewChange?: (index: number) => void;
    header?: React.ReactNode;
    currentIndex?: number;
    controlled?: boolean;
}
export declare const ViewSwitcher: React.MemoExoticComponent<({ items, defaultSelected, onViewChange, header, currentIndex: controlledIndex, controlled }: ViewSwitcherProps) => React.JSX.Element>;
