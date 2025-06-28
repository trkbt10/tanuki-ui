interface ScrollSyncConfig {
    activeIndex: number;
    viewCount: number;
    isMobile: boolean;
    hasMenu: boolean;
    onIndexChange: (index: number) => void;
    getViewWidth: (index?: number) => number;
    getViewOffset?: (index: number) => number;
    dynamicSizing?: boolean;
    onMenuProgress?: (progress: number) => void;
}
export declare const useScrollSync: (config: ScrollSyncConfig) => {
    scrollContainerRef: import('react').RefObject<HTMLDivElement | null>;
    scrollToIndex: (index: number, smooth?: boolean) => void;
};
export {};
