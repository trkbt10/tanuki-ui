import { default as React } from 'react';
type Item = {
    key: string;
    icon?: React.ReactNode;
    value: string;
};
type TabItemSelectHandler = (item: Item, index: number) => void;
export declare const TabBar: React.FC<{
    items: Item[];
    defaultSelected?: number;
    onSelect: TabItemSelectHandler;
    tabIndex?: number;
}>;
export {};
