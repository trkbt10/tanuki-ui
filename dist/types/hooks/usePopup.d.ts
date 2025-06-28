export declare const usePopup: <T extends HTMLElement = HTMLDivElement>({ onClose: onClose, id, }: {
    onClose: (...params: any[]) => any;
    id?: string;
}) => readonly [import('react').RefObject<HTMLDivElement | null>, import('react').RefObject<T | null>];
