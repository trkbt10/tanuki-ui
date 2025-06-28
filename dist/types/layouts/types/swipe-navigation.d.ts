export interface SwipeNavigationConfig {
    viewCount: number;
    hasMenu: boolean;
    menuWidth: number | string;
    menuVisible: boolean;
    swipeEnabled: boolean;
    edgeSwipeWidth: number;
    swipeThreshold: number;
    swipeVelocityThreshold: number;
    desktopBreakpoint: number;
    controlledActiveView?: number;
    defaultView: number;
    onViewChange?: (index: number) => void;
    transitionDuration: number;
    transitionTimingFunction: string;
    dynamicSizing: boolean;
    defaultViewWidth: number;
}
export interface SwipeNavigationViewport {
    isMobile: boolean;
    mobileViewWidth: number;
    desktopViewWidth: number;
}
export declare const SWIPE_NAVIGATION_CONSTANTS: {
    readonly DESKTOP_VIEW_WIDTH: 400;
    readonly SCROLL_DEBOUNCE_MS: 150;
    readonly TOUCH_MOVEMENT_THRESHOLD: 5;
    readonly PROGRAMMATIC_SCROLL_TIMEOUT: 500;
    readonly SCROLL_TOLERANCE: 5;
    readonly MENU_OVERLAY_PROGRESS_THRESHOLD: 0.1;
    readonly MENU_OPEN_THRESHOLD: 0.5;
};
