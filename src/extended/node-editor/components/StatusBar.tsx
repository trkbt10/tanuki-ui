import * as React from "react";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useNodeCanvas } from "../contexts/NodeCanvasContext";
import type { SettingsManager } from "../settings/SettingsManager";
import { classNames } from "../../../utilities/classNames";
import styles from "../NodeEditor.module.css";

export interface StatusBarProps {
  className?: string;
  autoSave?: boolean;
  isSaving?: boolean;
  settingsManager?: SettingsManager;
}

/**
 * StatusBar - Displays current editor state information
 */
export const StatusBar: React.FC<StatusBarProps> = ({ className, autoSave, isSaving, settingsManager }) => {
  const { state: nodeEditorState } = useNodeEditor();
  const { state: actionState } = useEditorActionState();
  const { state: canvasState } = useNodeCanvas();

  const selectedNodeCount = actionState.selectedNodeIds.length;
  const selectedConnectionCount = actionState.selectedConnectionIds.length;
  const totalNodes = Object.keys(nodeEditorState.nodes).length;
  const totalConnections = Object.keys(nodeEditorState.connections).length;

  const zoomPercentage = Math.round(canvasState.viewport.scale * 100);

  // Determine operation mode
  const getOperationMode = (): string => {
    if (actionState.dragState) return "Moving";
    if (actionState.selectionBox) return "Selecting";
    if (actionState.connectionDragState) return "Connecting";
    if (canvasState.isSpacePanning || canvasState.panState.isPanning) return "Panning";
    return "Ready";
  };

  const operationMode = getOperationMode();

  // Get cursor position (if dragging)
  const getCursorPosition = () => {
    if (actionState.dragState) {
      return `Offset: (${Math.round(actionState.dragState.offset.x)}, ${Math.round(actionState.dragState.offset.y)})`;
    }
    return `Canvas: (${Math.round(canvasState.viewport.offset.x)}, ${Math.round(canvasState.viewport.offset.y)})`;
  };

  return (
    <div className={classNames(styles.statusBar, className)} data-testid="status-bar">
      {/* Selection info */}
      <div className={styles.statusSection}>
        <span className={styles.statusLabel}>Selection:</span>
        <span className={styles.statusValue}>
          {selectedNodeCount > 0 && `${selectedNodeCount} node${selectedNodeCount !== 1 ? 's' : ''}`}
          {selectedNodeCount > 0 && selectedConnectionCount > 0 && ', '}
          {selectedConnectionCount > 0 && `${selectedConnectionCount} connection${selectedConnectionCount !== 1 ? 's' : ''}`}
          {selectedNodeCount === 0 && selectedConnectionCount === 0 && 'None'}
        </span>
      </div>

      {/* Total counts */}
      <div className={styles.statusSection}>
        <span className={styles.statusLabel}>Total:</span>
        <span className={styles.statusValue}>
          {totalNodes} nodes, {totalConnections} connections
        </span>
      </div>

      {/* Operation mode */}
      <div className={styles.statusSection}>
        <span className={styles.statusLabel}>Mode:</span>
        <span className={classNames(styles.statusValue, styles.statusMode)}>
          {operationMode}
        </span>
      </div>

      {/* Zoom level */}
      <div className={styles.statusSection}>
        <span className={styles.statusLabel}>Zoom:</span>
        <span className={styles.statusValue}>{zoomPercentage}%</span>
      </div>

      {/* Position */}
      <div className={styles.statusSection}>
        <span className={styles.statusLabel}>Position:</span>
        <span className={styles.statusValue}>{getCursorPosition()}</span>
      </div>

      {/* Grid info */}
      {canvasState.gridSettings.showGrid && (
        <div className={styles.statusSection}>
          <span className={styles.statusLabel}>Grid:</span>
          <span className={styles.statusValue}>
            {canvasState.gridSettings.size}px
            {canvasState.gridSettings.snapToGrid && ' (Snap ON)'}
          </span>
        </div>
      )}

      {/* Auto-save status */}
      {autoSave && (
        <div className={styles.statusSection}>
          <span className={styles.statusLabel}>Auto-save:</span>
          <span className={classNames(styles.statusValue, isSaving && styles.statusSaving)}>
            {isSaving ? 'Saving...' : 'ON'}
          </span>
        </div>
      )}

      {/* Theme info */}
      {settingsManager && (
        <div className={styles.statusSection}>
          <span className={styles.statusLabel}>Theme:</span>
          <span className={styles.statusValue}>
            {settingsManager.getValue("appearance.theme") || "light"}
          </span>
        </div>
      )}
    </div>
  );
};

StatusBar.displayName = "StatusBar";