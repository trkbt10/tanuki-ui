interface BodyScrollConfig {
    activeIndex: number;
    viewCount: number;
    isMobile: boolean;
    hasMenu: boolean;
    onIndexChange: (index: number) => void;
    enabled?: boolean;
}
export declare const useBodyScrollNavigation: (config: BodyScrollConfig) => {
    containerRef: import('react').RefObject<HTMLDivElement | null>;
    registerViewRef: (index: number) => (ref: HTMLDivElement | null) => void;
    scrollToView: (index: number) => void;
    isMenuVisible: boolean;
    isBodyScrollEnabled: boolean | undefined;
};
export {};
