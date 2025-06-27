import { MobileView, SidebarLayoutConfig } from './types';
export declare const useSidebarLayout: (config: SidebarLayoutConfig, mobileView?: MobileView, onMobileViewChange?: (view: MobileView) => void) => {
    resizerRef: import('react').RefObject<HTMLDivElement | null>;
    containerRef: import('react').RefObject<HTMLDivElement | null>;
    viewsContainerRef: import('react').RefObject<HTMLDivElement | null>;
    isMobile: boolean;
    asideWidth: number;
    mobileSidebarWidth: number;
    currentMobileView: MobileView;
    updateMobileView: (nextView: MobileView) => void;
    config: SidebarLayoutConfig;
};
