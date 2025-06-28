import { default as React } from 'react';
export declare const useEventHandler: <T extends HTMLElement>(ref: React.RefObject<T>, eventName: keyof HTMLElementEventMap, handler: (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => void, options?: boolean | AddEventListenerOptions) => void;
