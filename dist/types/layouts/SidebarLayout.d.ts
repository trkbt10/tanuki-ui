import { MobileView, MobileSidebarMode } from './hooks';
import * as React from "react";
type SidebarLayoutProps = {
    aside: React.ReactNode;
    children: React.ReactNode;
    asideId?: string;
    minAsideWidth?: number;
    maxAsideWidth?: number;
    mobileView?: MobileView;
    defaultMobileView?: MobileView;
    mobileBreakpoint?: number;
    onMobileViewChange?: (view: MobileView) => void;
    mobileSidebarMode?: MobileSidebarMode;
    mobileOverlayMaxWidth?: number;
    mobileOverlayDimBackground?: boolean;
};
export declare const SidebarLayout: React.FC<SidebarLayoutProps>;
export {};
