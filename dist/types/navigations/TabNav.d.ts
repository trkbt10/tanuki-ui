import * as React from "react";
type Item = {
    key: string;
    value: string;
    icon?: React.ReactNode;
};
export declare const TabNav: React.FC<React.PropsWithChildren<{
    defaultValue?: string;
    value?: string;
    onChange: (nextKey: string) => void;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    items: Item[];
    itemWrapper?: React.ComponentType<React.PropsWithChildren<{}>>;
}>>;
export {};
