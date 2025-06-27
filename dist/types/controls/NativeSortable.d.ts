import * as React from "react";
export declare const NativeSortable: {
    <T extends {}>({ items, onChange, children, controlAs, }: {
        items: T[];
        onChange: (next: T[]) => void;
        children: React.ReactNode;
        controlAs?: React.ComponentType<SortableItemProps>;
    }): React.JSX.Element;
    SortableItem: React.FC<SortableItemProps>;
    useSortable: <CE extends HTMLElement, HE extends HTMLElement>(itemId: string) => {
        containerRef: React.RefObject<CE | null>;
        listeners: {
            ref: React.RefObject<HE | null>;
        };
    };
};
export type SortableItemProps = {
    id: string;
    className?: string;
    children: React.ReactNode;
};
export declare const useSortable: <CE extends HTMLElement, HE extends HTMLElement>(itemId: string) => {
    containerRef: React.RefObject<CE | null>;
    listeners: {
        ref: React.RefObject<HE | null>;
    };
};
