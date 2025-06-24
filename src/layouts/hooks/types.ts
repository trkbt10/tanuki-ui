export type MobileView = "aside" | "main";
export type MobileSidebarMode = "fullscreen" | "overlay";

export interface SidebarLayoutConfig {
  // Desktop
  minAsideWidth: number;
  maxAsideWidth: number;
  asideId?: string;
  
  // Mobile
  mobileBreakpoint: number;
  mobileSidebarMode: MobileSidebarMode;
  mobileOverlayMaxWidth: number;
  mobileOverlayDimBackground: boolean;
  defaultMobileView: MobileView;
}