import * as React from "react";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useNodeCanvas } from "../contexts/NodeCanvasContext";
import { NodeInspector } from "./NodeInspector";
import { NodeTreeList } from "./NodeTreeList";
import { DefaultInspectorRenderer } from "../components/node/renderers/DefaultRenderers";
import { calculateAlignmentPositions } from "../utils/alignmentUtils";
import { classNames } from "../../../utilities/classNames";
import { Button } from "../../../form/Button";
import { Input } from "../../../form/Input";
import { Label } from "../../../form/Label";
import styles from "../NodeEditor.module.css";
import { H4 } from "../../../elements/Heading";

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
  const [activeTab, setActiveTab] = React.useState<"layers" | "properties">("layers");

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
        <div className={styles.inspectorTabs}>
          <Button
            className={classNames(styles.inspectorTab, activeTab === "layers" && styles.active)}
            onClick={() => setActiveTab("layers")}
            data-variant="cta"
          >
            Layers
          </Button>
          <Button
            className={classNames(styles.inspectorTab, activeTab === "properties" && styles.active)}
            onClick={() => setActiveTab("properties")}
            data-variant="cta"
          >
            Properties
          </Button>
        </div>
      </div>

      <div className={styles.inspectorContent}>
        {activeTab === "layers" ? (
          <NodeTreeList />
        ) : (
          <>
            {selectedNode && (
              <div className={styles.inspectorSection}>
                <DefaultInspectorRenderer
                  node={selectedNode}
                  selectedNodes={selectedNodes}
                  onAlignNodes={handleAlignNodes}
                  externalData={null}
                  isLoadingExternalData={false}
                  externalDataError={null}
                  onUpdateNode={(updates) => {
                    nodeEditorDispatch(nodeEditorActions.updateNode(selectedNode.id, updates));
                  }}
                  onUpdateExternalData={async () => {}}
                  onDeleteNode={() => {
                    nodeEditorDispatch(nodeEditorActions.deleteNode(selectedNode.id));
                  }}
                />
              </div>
            )}

            {selectedConnection && (
              <div className={styles.inspectorSection}>
                <H4>Connection Properties</H4>
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
                <p>Select a node or connection to view its properties</p>
              </div>
            )}

            {actionState.selectedNodeIds.length > 1 && (
              <div className={styles.inspectorSection}>
                <H4>Multiple Selection</H4>
                <p>{actionState.selectedNodeIds.length} nodes selected</p>
              </div>
            )}

            {/* Grid Settings Section */}
            <div className={styles.inspectorSection}>
              <H4>Grid Settings</H4>
              <div className={styles.inspectorField}>
                <Label>
                  <Input
                    id="grid-show"
                    name="showGrid"
                    type="checkbox"
                    checked={canvasState.gridSettings.showGrid}
                    onChange={(e) => {
                      canvasDispatch(
                        canvasActions.updateGridSettings({
                          showGrid: e.target.checked,
                        })
                      );
                    }}
                  />
                  Show Grid
                </Label>
              </div>
              <div className={styles.inspectorField}>
                <Label>
                  <Input
                    id="grid-snap"
                    name="snapToGrid"
                    type="checkbox"
                    checked={canvasState.gridSettings.snapToGrid}
                    onChange={(e) => {
                      canvasDispatch(
                        canvasActions.updateGridSettings({
                          snapToGrid: e.target.checked,
                        })
                      );
                    }}
                  />
                  Snap to Grid
                </Label>
              </div>
              <div className={styles.inspectorField}>
                <Label htmlFor="grid-size">
                  Grid Size:
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
                  Snap Threshold:
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
