import * as React from "react";
export declare const SortableList: {
    <T extends {
        id: string;
    }>({ items, setItems, element, }: React.PropsWithChildren<{
        items: T[];
        setItems: React.Dispatch<React.SetStateAction<T[]>>;
        element: (item: T, index: number) => React.ReactNode;
    }>): React.JSX.Element;
    displayName: string;
};
