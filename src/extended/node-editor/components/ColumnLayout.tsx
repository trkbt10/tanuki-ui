import * as React from "react";
import { HorizontalDivider } from "./parts/HorizontalDivider";
import styles from "./ColumnLayout.module.css";

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

export const ColumnLayout: React.FC<ColumnLayoutProps> = ({
  className,
  children,
  leftSidebar,
  rightSidebar,
  leftSidebarInitialWidth = 280,
  rightSidebarInitialWidth = 280,
  leftSidebarMinWidth = 200,
  rightSidebarMinWidth = 200,
  leftSidebarMaxWidth = 600,
  rightSidebarMaxWidth = 600,
  onLeftSidebarWidthChange,
  onRightSidebarWidthChange,
}) => {
  const [leftWidth, setLeftWidth] = React.useState(leftSidebarInitialWidth);
  const [rightWidth, setRightWidth] = React.useState(rightSidebarInitialWidth);

  const handleLeftResize = React.useCallback((deltaX: number) => {
    setLeftWidth(prev => {
      const newWidth = Math.max(
        leftSidebarMinWidth,
        Math.min(leftSidebarMaxWidth, prev + deltaX)
      );
      onLeftSidebarWidthChange?.(newWidth);
      return newWidth;
    });
  }, [leftSidebarMinWidth, leftSidebarMaxWidth, onLeftSidebarWidthChange]);

  const handleRightResize = React.useCallback((deltaX: number) => {
    setRightWidth(prev => {
      const newWidth = Math.max(
        rightSidebarMinWidth,
        Math.min(rightSidebarMaxWidth, prev - deltaX) // Subtract delta for right sidebar
      );
      onRightSidebarWidthChange?.(newWidth);
      return newWidth;
    });
  }, [rightSidebarMinWidth, rightSidebarMaxWidth, onRightSidebarWidthChange]);

  // Reset widths when initial values change
  React.useEffect(() => {
    setLeftWidth(leftSidebarInitialWidth);
  }, [leftSidebarInitialWidth]);

  React.useEffect(() => {
    setRightWidth(rightSidebarInitialWidth);
  }, [rightSidebarInitialWidth]);

  return (
    <div className={`${styles.columnLayout} ${className || ""}`}>
      {/* Left Sidebar */}
      {leftSidebar && (
        <>
          <div 
            className={styles.leftSidebar} 
            style={{ width: leftWidth }}
          >
            {leftSidebar}
          </div>
          <HorizontalDivider
            onResize={handleLeftResize}
            className={styles.leftResizer}
          />
        </>
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>
        {children}
      </div>

      {/* Right Sidebar */}
      {rightSidebar && (
        <>
          <HorizontalDivider
            onResize={handleRightResize}
            className={styles.rightResizer}
          />
          <div 
            className={styles.rightSidebar} 
            style={{ width: rightWidth }}
          >
            {rightSidebar}
          </div>
        </>
      )}
    </div>
  );
};