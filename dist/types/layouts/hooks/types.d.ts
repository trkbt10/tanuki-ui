export type MobileView = "aside" | "main";
export type MobileSidebarMode = "fullscreen" | "overlay";
export interface SidebarLayoutConfig {
    minAsideWidth: number;
    maxAsideWidth: number;
    asideId?: string;
    mobileBreakpoint: number;
    mobileSidebarMode: MobileSidebarMode;
    mobileOverlayMaxWidth: number;
    mobileOverlayDimBackground: boolean;
    defaultMobileView: MobileView;
}
