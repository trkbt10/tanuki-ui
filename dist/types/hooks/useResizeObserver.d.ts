import { default as React } from 'react';
export declare function useResizeObserver<T extends HTMLElement>(ref: React.RefObject<T | null>, { box }: ResizeObserverOptions): {
    entry: ResizeObserverEntry | null;
    rect: DOMRectReadOnly | undefined;
};
