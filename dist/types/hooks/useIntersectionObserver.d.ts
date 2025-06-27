import { default as React } from 'react';
export declare function useIntersectionObserver<T extends HTMLElement>(ref: React.RefObject<T | null>, { threshold, rootMargin, root }: IntersectionObserverInit): {
    readonly boundingClientRect: DOMRectReadOnly;
    readonly intersectionRatio: number;
    readonly intersectionRect: DOMRectReadOnly;
    readonly isIntersecting: boolean;
    readonly rootBounds: DOMRectReadOnly | null;
    readonly target: Element | null;
    readonly time: DOMHighResTimeStamp;
};
