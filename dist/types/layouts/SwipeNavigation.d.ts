import * as React from "react";
export interface SwipeNavigationProps {
    children: React.ReactNode | React.ReactNode[];
    menu?: React.ReactNode;
    menuWidth?: number | string;
    menuVisible?: boolean;
    activeView?: number;
    defaultView?: number;
    onViewChange?: (index: number) => void;
    swipeEnabled?: boolean;
    edgeSwipeWidth?: number;
    swipeThreshold?: number;
    swipeVelocityThreshold?: number;
    desktopBreakpoint?: number;
    className?: string;
    viewClassName?: string;
    menuClassName?: string;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    showIndicators?: boolean;
    dynamicSizing?: boolean;
    defaultViewWidth?: number;
}
export declare const SwipeNavigation: React.FC<SwipeNavigationProps>;
