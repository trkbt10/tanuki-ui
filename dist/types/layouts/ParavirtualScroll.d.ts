import * as React from "react";
type Direction = "vertical" | "horizontal";
export declare const ParavirtualScroll: React.MemoExoticComponent<({ children, direction, chunkSize, }: {
    children: React.ReactNode;
    direction?: Direction;
    chunkSize?: number;
}) => React.JSX.Element>;
export declare const ParavirtualScrollItem: React.MemoExoticComponent<({ children, index }: {
    children: React.ReactNode;
    index: number;
}) => React.JSX.Element>;
export {};
