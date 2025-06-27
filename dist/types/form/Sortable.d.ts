export declare const Sortable: {
    <T extends {}>({ items, onChange, children, controlAs, }: {
        items: T[];
        onChange: (next: T[]) => void;
        children: React.ReactNode;
        controlAs?: React.ComponentType<import('../controls/NativeSortable').SortableItemProps>;
    }): import("react").JSX.Element;
    SortableItem: import('react').FC<import('../controls/NativeSortable').SortableItemProps>;
    useSortable: <CE extends HTMLElement, HE extends HTMLElement>(itemId: string) => {
        containerRef: import('react').RefObject<CE | null>;
        listeners: {
            ref: import('react').RefObject<HE | null>;
        };
    };
};
export { useSortable } from '../controls/NativeSortable';
