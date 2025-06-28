import * as React from "react";
type BoundingRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const ContextualMenu: React.FC<{
    open?: boolean;
    onClose: (open: boolean) => void;
    measure: BoundingRect;
    children: React.ReactNode;
    render?: (props: BoundingRect) => React.ReactNode;
}>;
export declare const useContextualMenu: (defaultIsOpen?: boolean) => [React.MutableRefObject<any>, boolean, (nextValue?: any) => void, BoundingRect | undefined];
export {};
