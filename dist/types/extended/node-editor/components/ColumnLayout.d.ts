import * as React from "react";
export interface ColumnLayoutProps {
    className?: string;
    /** Content for the main editor area (center column) */
    children: React.ReactNode;
    /** Optional left sidebar content */
    leftSidebar?: React.ReactNode;
    /** Optional right sidebar content */
    rightSidebar?: React.ReactNode;
    /** Initial width of left sidebar in pixels */
    leftSidebarInitialWidth?: number;
    /** Initial width of right sidebar in pixels */
    rightSidebarInitialWidth?: number;
    /** Minimum width of left sidebar in pixels */
    leftSidebarMinWidth?: number;
    /** Minimum width of right sidebar in pixels */
    rightSidebarMinWidth?: number;
    /** Maximum width of left sidebar in pixels */
    leftSidebarMaxWidth?: number;
    /** Maximum width of right sidebar in pixels */
    rightSidebarMaxWidth?: number;
    /** Callback when left sidebar width changes */
    onLeftSidebarWidthChange?: (width: number) => void;
    /** Callback when right sidebar width changes */
    onRightSidebarWidthChange?: (width: number) => void;
}
export declare const ColumnLayout: React.FC<ColumnLayoutProps>;
