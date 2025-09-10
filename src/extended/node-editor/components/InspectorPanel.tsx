import * as React from "react";
import { useNodeEditor } from "../contexts/node-editor";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useNodeCanvas } from "../contexts/NodeCanvasContext";
import { NodeInspector } from "./NodeInspector";
import { NodeTreeList } from "./NodeTreeList";
import { TabNav } from "./TabNav";
import { calculateAlignmentPositions } from "../utils/alignmentUtils";
import { classNames, Input, Label, H4, Toolbar, SwitchInput } from "./elements";
import styles from "./InspectorPanel.module.css";
import { useI18n } from "../i18n";

export interface InspectorPanelProps {
  className?: string;
}

/**
 * InspectorPanel - Displays and allows editing of selected nodes and connections
 * Uses Context to receive information from NodeEditor and EditorActionState
 */
export const InspectorPanel: React.FC<InspectorPanelProps> = ({ className }) => {
  const { state: nodeEditorState, actions: nodeEditorActions, dispatch: nodeEditorDispatch } = useNodeEditor();
  const { state: actionState } = useEditorActionState();
  const { state: canvasState, dispatch: canvasDispatch, actions: canvasActions } = useNodeCanvas();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const { t } = useI18n();
  const tabItems = [t("inspectorTabLayers") || "Layers", t("inspectorTabProperties") || "Properties"]; 

  // Get selected node (for now, just show the first one)
  const selectedNode = actionState.selectedNodeIds.length > 0 ? nodeEditorState.nodes[actionState.selectedNodeIds[0]] : null;

  // Get all selected nodes
  const selectedNodes = actionState.selectedNodeIds.map((id) => nodeEditorState.nodes[id]).filter(Boolean);

  // Get selected connection (for now, just show the first one)
  const selectedConnection =
    actionState.selectedConnectionIds.length > 0 ? nodeEditorState.connections[actionState.selectedConnectionIds[0]] : null;

  // Handle alignment operations
  const handleAlignNodes = React.useCallback(
    (alignmentType: string, nodes: typeof selectedNodes) => {
      const positionUpdates = calculateAlignmentPositions(nodes, alignmentType);
      if (Object.keys(positionUpdates).length > 0) {
        // Update node positions - this automatically triggers connection updates
        // The moveNodes action updates the node state, which ConnectionLayer listens to
        nodeEditorDispatch(nodeEditorActions.moveNodes(positionUpdates));

        // The connection system is designed to be reactive:
        // 1. moveNodes updates node positions in state
        // 2. ConnectionLayer re-renders due to state change
        // 3. ConnectionView components recalculate port positions
        // 4. Connections are redrawn with updated paths
        //
        // No additional triggers are needed - React's reactivity handles this automatically
      }
    },
    [nodeEditorDispatch, nodeEditorActions]
  );

  return (
    <div className={classNames(styles.inspectorPanel, className)}>
      <div className={styles.inspectorHeader}>
        <TabNav tabs={tabItems} activeTabIndex={activeTabIndex} onTabChange={setActiveTabIndex} />
      </div>

      <div className={classNames(styles.inspectorContent, activeTabIndex === 0 && styles.inspectorContentNoPadding)}>
        {activeTabIndex === 0 ? (
          <NodeTreeList />
        ) : (
          <>
            {selectedNode && (
              <div className={styles.inspectorSection}>
                <NodeInspector node={selectedNode} />
              </div>
            )}

            {selectedConnection && (
              <div className={styles.inspectorSection}>
                <H4 className={styles.inspectorSectionTitle}>{t("inspectorConnectionProperties")}</H4>
                <div className={styles.inspectorField}>
                  <label>From:</label>
                  <span className={styles.inspectorReadOnlyField}>
                    {nodeEditorState.nodes[selectedConnection.fromNodeId]?.data.title || selectedConnection.fromNodeId}.
                    {selectedConnection.fromPortId}
                  </span>
                </div>
                <div className={styles.inspectorField}>
                  <label>To:</label>
                  <span className={styles.inspectorReadOnlyField}>
                    {nodeEditorState.nodes[selectedConnection.toNodeId]?.data.title || selectedConnection.toNodeId}.
                    {selectedConnection.toPortId}
                  </span>
                </div>
              </div>
            )}

            {!selectedNode && !selectedConnection && (
              <div className={styles.inspectorEmptyState}>
                <p>{t("inspectorEmptyStatePrompt")}</p>
              </div>
            )}

            {actionState.selectedNodeIds.length > 1 && (
              <div className={styles.inspectorSection}>
                <H4>{t("inspectorMultipleSelection")}</H4>
                <p>{actionState.selectedNodeIds.length} nodes selected</p>
              </div>
            )}

            {/* Grid Settings Section */}
            <div className={styles.inspectorSection}>
              <H4 className={styles.inspectorSectionTitle}>{t("inspectorGridSettings")}</H4>
              <div className={styles.inspectorField}>
                <SwitchInput
                  id="grid-show"
                  checked={canvasState.gridSettings.showGrid}
                  onChange={(checked) =>
                    canvasDispatch(canvasActions.updateGridSettings({ showGrid: checked }))
                  }
                  label={t("inspectorShowGrid")}
                  size="medium"
                />
              </div>
              <div className={styles.inspectorField}>
                <SwitchInput
                  id="grid-snap"
                  checked={canvasState.gridSettings.snapToGrid}
                  onChange={(checked) =>
                    canvasDispatch(canvasActions.updateGridSettings({ snapToGrid: checked }))
                  }
                  label={t("inspectorSnapToGrid")}
                  size="medium"
                />
              </div>
              <div className={styles.inspectorField}>
                <Label htmlFor="grid-size">
                  {t("inspectorGridSize")}:
                  <Input
                    id="grid-size"
                    name="gridSize"
                    type="number"
                    className={styles.inspectorInput}
                    value={canvasState.gridSettings.size}
                    min={10}
                    max={100}
                    step={5}
                    onChange={(e) => {
                      const size = parseInt(e.target.value, 10);
                      if (!isNaN(size) && size > 0) {
                        canvasDispatch(
                          canvasActions.updateGridSettings({
                            size,
                          })
                        );
                      }
                    }}
                    aria-label="Grid size in pixels"
                  />
                </Label>
              </div>
              <div className={styles.inspectorField}>
                <Label htmlFor="snap-threshold">
                  {t("inspectorSnapThreshold")}:
                  <Input
                    id="snap-threshold"
                    name="snapThreshold"
                    type="number"
                    className={styles.inspectorInput}
                    value={canvasState.gridSettings.snapThreshold}
                    min={1}
                    max={20}
                    step={1}
                    onChange={(e) => {
                      const snapThreshold = parseInt(e.target.value, 10);
                      if (!isNaN(snapThreshold) && snapThreshold > 0) {
                        canvasDispatch(
                          canvasActions.updateGridSettings({
                            snapThreshold,
                          })
                        );
                      }
                    }}
                    aria-label="Snap threshold in pixels"
                  />
                </Label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

InspectorPanel.displayName = "InspectorPanel";
