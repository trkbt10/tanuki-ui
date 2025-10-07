import * as React from "react";
import type { EditorPanelsConfig, PanelDefinition, PanelPosition } from "../../types/panels";
import { HorizontalDivider } from "./HorizontalDivider";
import { FloatingPanel } from "./FloatingPanel";
import styles from "./EditorPanelLayout.module.css";

export interface EditorPanelLayoutProps {
  className?: string;
  /** Main content (canvas area) */
  children: React.ReactNode;
  /** Panel configurations */
  panels?: EditorPanelsConfig;
}

/**
 * EditorPanelLayout - Flexible layout system supporting both column and floating panels
 */
export const EditorPanelLayout: React.FC<EditorPanelLayoutProps> = ({ className, children, panels }) => {
  // Helper to determine if position is a column position
  const isColumnPosition = (pos: PanelPosition): pos is "left" | "right" => {
    return pos === "left" || pos === "right";
  };

  // Separate panels by their position type
  const { leftPanel, rightPanel, floatingPanels } = React.useMemo(() => {
    if (!panels) {
      return { leftPanel: undefined, rightPanel: undefined, floatingPanels: [] };
    }

    let left: [string, PanelDefinition] | undefined;
    let right: [string, PanelDefinition] | undefined;
    const floating: [string, PanelDefinition][] = [];

    Object.entries(panels).forEach(([key, panel]) => {
      if (panel.visible === false) return;

      if (isColumnPosition(panel.position)) {
        if (panel.position === "left" && !left) {
          left = [key, panel];
        } else if (panel.position === "right" && !right) {
          right = [key, panel];
        }
      } else {
        floating.push([key, panel]);
      }
    });

    return {
      leftPanel: left,
      rightPanel: right,
      floatingPanels: floating,
    };
  }, [panels]);

  // Column panel states
  const [leftWidth, setLeftWidth] = React.useState(leftPanel?.[1].initialWidth ?? 280);
  const [rightWidth, setRightWidth] = React.useState(rightPanel?.[1].initialWidth ?? 280);

  // Handle left panel resize
  const handleLeftResize = React.useCallback(
    (deltaX: number) => {
      setLeftWidth((prev) => {
        const panel = leftPanel?.[1];
        const newWidth = Math.max(
          panel?.minWidth ?? 200,
          Math.min(panel?.maxWidth ?? 600, prev + deltaX)
        );
        panel?.onWidthChange?.(newWidth);
        return newWidth;
      });
    },
    [leftPanel]
  );

  // Handle right panel resize
  const handleRightResize = React.useCallback(
    (deltaX: number) => {
      setRightWidth((prev) => {
        const panel = rightPanel?.[1];
        const newWidth = Math.max(
          panel?.minWidth ?? 200,
          Math.min(panel?.maxWidth ?? 600, prev - deltaX)
        );
        panel?.onWidthChange?.(newWidth);
        return newWidth;
      });
    },
    [rightPanel]
  );

  // Reset widths when initial values change
  React.useEffect(() => {
    if (leftPanel?.[1].initialWidth !== undefined) {
      setLeftWidth(leftPanel[1].initialWidth);
    }
  }, [leftPanel?.[1].initialWidth]);

  React.useEffect(() => {
    if (rightPanel?.[1].initialWidth !== undefined) {
      setRightWidth(rightPanel[1].initialWidth);
    }
  }, [rightPanel?.[1].initialWidth]);

  const shouldShowLeftColumn = !!leftPanel;
  const shouldShowRightColumn = !!rightPanel;

  return (
    <div className={`${styles.editorPanelLayout} ${className || ""}`}>
      {/* Column Layout Container */}
      <div className={styles.columnContainer}>
        {/* Left Column Panel */}
        {shouldShowLeftColumn && leftPanel && (
          <>
            <div
              className={`${styles.columnPanel} ${styles.leftPanel} ${leftPanel[1].className || ""}`}
              style={{ width: leftWidth, ...leftPanel[1].style }}
            >
              {leftPanel[1].component}
            </div>
            {leftPanel[1].resizable !== false && (
              <HorizontalDivider onResize={handleLeftResize} className={styles.leftResizer} />
            )}
          </>
        )}

        {/* Main Content */}
        <div className={styles.mainContent}>{children}</div>

        {/* Right Column Panel */}
        {shouldShowRightColumn && rightPanel && (
          <>
            {rightPanel[1].resizable !== false && (
              <HorizontalDivider onResize={handleRightResize} className={styles.rightResizer} />
            )}
            <div
              className={`${styles.columnPanel} ${styles.rightPanel} ${rightPanel[1].className || ""}`}
              style={{ width: rightWidth, ...rightPanel[1].style }}
            >
              {rightPanel[1].component}
            </div>
          </>
        )}
      </div>

      {/* Floating Panels */}
      {floatingPanels.map(([key, panel]) => {
        const pos = panel.position as { x: number; y: number };
        return (
          <FloatingPanel
            key={key}
            id={key}
            initialPosition={pos}
            size={panel.size}
            draggable={panel.draggable}
            resizable={panel.resizable}
            zIndex={panel.zIndex}
            onPositionChange={panel.onPositionChange}
            onSizeChange={panel.onSizeChange}
            className={panel.className}
            style={panel.style}
          >
            {panel.component}
          </FloatingPanel>
        );
      })}
    </div>
  );
};
