import * as React from "react";
import { useNodeEditor } from "../../contexts/node-editor";
import { useNodeCanvas } from "../../contexts/NodeCanvasContext";
import { useEditorActionState } from "../../contexts/EditorActionStateContext";
import { classNames } from "../elements";
import styles from "./DebugOverlay.module.css";

export interface DebugOverlayProps {
  /** Position of the debug overlay */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Custom className */
  className?: string;
  /** Show/hide the debug overlay */
  visible?: boolean;
  /** Which debug information to show */
  showSections?: {
    viewport?: boolean;
    nodes?: boolean;
    connections?: boolean;
    actions?: boolean;
    performance?: boolean;
  };
}

/**
 * Debug overlay component that shows internal state information
 * Useful for development and debugging
 */
export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  position = "top-left",
  className,
  visible = true,
  showSections = {
    viewport: true,
    nodes: true,
    connections: true,
    actions: true,
    performance: false,
  },
}) => {
  const { state: editorState } = useNodeEditor();
  const { state: canvasState } = useNodeCanvas();
  const { state: actionState } = useEditorActionState();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [performanceStats, setPerformanceStats] = React.useState({
    renderCount: 0,
    lastRenderTime: 0,
  });

  // Track render performance only when performance section is enabled
  React.useEffect(() => {
    if (showSections.performance) {
      setPerformanceStats(prev => ({
        renderCount: prev.renderCount + 1,
        lastRenderTime: Date.now() - (prev.lastRenderTime || Date.now()),
      }));
    }
  }, [showSections.performance]);

  if (!visible) return null;

  const positionClass = {
    "top-left": styles.topLeft,
    "top-right": styles.topRight,
    "bottom-left": styles.bottomLeft,
    "bottom-right": styles.bottomRight,
  }[position];

  const nodeCount = Object.keys(editorState.nodes).length;
  const connectionCount = Object.keys(editorState.connections).length;
  const selectedNodeCount = actionState.selectedNodeIds.length;

  return (
    <div
      className={classNames(
        styles.debugOverlay,
        positionClass,
        isCollapsed && styles.collapsed,
        className
      )}
    >
      <div className={styles.debugHeader}>
        <span className={styles.debugTitle}>Debug Info</span>
        <button
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand debug info" : "Collapse debug info"}
        >
          {isCollapsed ? "+" : "−"}
        </button>
      </div>

      {!isCollapsed && (
        <div className={styles.debugContent}>
          {showSections.viewport && (
            <div className={styles.debugSection}>
              <div className={styles.sectionTitle}>Viewport</div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Offset:</span>
                <span className={styles.value}>
                  {Math.round(canvasState.viewport.offset.x)}, {Math.round(canvasState.viewport.offset.y)}
                </span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Scale:</span>
                <span className={styles.value}>{canvasState.viewport.scale.toFixed(2)}x</span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Grid:</span>
                <span className={styles.value}>
                  {canvasState.gridSettings.enabled ? "On" : "Off"}
                  {canvasState.gridSettings.enabled && ` (${canvasState.gridSettings.size}px)`}
                </span>
              </div>
            </div>
          )}

          {showSections.nodes && (
            <div className={styles.debugSection}>
              <div className={styles.sectionTitle}>Nodes</div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Total:</span>
                <span className={styles.value}>{nodeCount}</span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Selected:</span>
                <span className={styles.value}>{selectedNodeCount}</span>
              </div>
              {Object.entries(
                Object.values(editorState.nodes).reduce((acc, node) => {
                  acc[node.type] = (acc[node.type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <div key={type} className={styles.debugItem}>
                  <span className={styles.label}>{type}:</span>
                  <span className={styles.value}>{count}</span>
                </div>
              ))}
            </div>
          )}

          {showSections.connections && (
            <div className={styles.debugSection}>
              <div className={styles.sectionTitle}>Connections</div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Total:</span>
                <span className={styles.value}>{connectionCount}</span>
              </div>
            </div>
          )}

          {showSections.actions && (
            <div className={styles.debugSection}>
              <div className={styles.sectionTitle}>Actions</div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Dragging:</span>
                <span className={styles.value}>
                  {actionState.dragState ? `${actionState.dragState.nodeIds.length} nodes` : "None"}
                </span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Resizing:</span>
                <span className={styles.value}>
                  {actionState.resizeState ? actionState.resizeState.nodeId : "None"}
                </span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Connecting:</span>
                <span className={styles.value}>
                  {actionState.connectionDragState ? "Active" : "None"}
                </span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Panning:</span>
                <span className={styles.value}>
                  {canvasState.panState.isPanning ? "Active" : "None"}
                </span>
              </div>
            </div>
          )}

          {showSections.performance && (
            <div className={styles.debugSection}>
              <div className={styles.sectionTitle}>Performance</div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Renders:</span>
                <span className={styles.value}>{performanceStats.renderCount}</span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.label}>Last render:</span>
                <span className={styles.value}>{performanceStats.lastRenderTime.toFixed(2)}ms</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

DebugOverlay.displayName = "DebugOverlay";
