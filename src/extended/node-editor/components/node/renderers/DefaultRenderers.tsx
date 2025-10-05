import * as React from "react";
import type { NodeRenderProps, InspectorRenderProps } from "../../../types/NodeDefinition";
import type { Node } from "../../../types/core";
import editorStyles from "../../../NodeEditor.module.css";
import {
  PropertySection,
  InspectorLabel,
  InspectorButton,
  InspectorInput,
  InspectorTextarea,
  InspectorNumberInput,
  InspectorCheckbox,
} from "../../inspector/parts";
import { useI18n } from "../../../i18n";
import alignmentStyles from "./AlignmentControls.module.css";
import defaultStyles from "./DefaultRenderers.module.css";
import {
  ALIGNMENT_ACTIONS,
  ALIGNMENT_GROUPS,
  type AlignmentActionConfig,
  type AlignmentActionGroup,
  type AlignmentActionType,
} from "../../shared/alignmentActions";
import { useNodeEditorActions } from "../../../hooks/useNodeEditorActions";
import { useEditorActionState } from "../../../contexts/EditorActionStateContext";
import { useNodeEditor } from "../../../contexts/node-editor";
import { useNodeDefinitionList } from "../../../contexts/NodeDefinitionContext";
import { canAddNodeType, countNodesByType } from "../../../utils/nodeTypeLimits";
import { getClipboard, setClipboard } from "../../../utils/clipboard";
import { DuplicateIcon, CopyIcon, CutIcon, DeleteIcon } from "../../elements/icons";

/**
 * Default node renderer
 */
export const DefaultNodeRenderer: React.FC<NodeRenderProps> = ({ node, isSelected, isDragging, isEditing, onStartEdit }) => {
  const { t } = useI18n();
  return (
    <div
      className={[
        defaultStyles.defaultNodeRenderer,
        isSelected ? defaultStyles.defaultNodeRendererSelected : "",
        isDragging ? defaultStyles.defaultNodeRendererDragging : defaultStyles.defaultNodeRendererNotDragging,
      ]
        .filter(Boolean)
        .join(" ")}
      onDoubleClick={onStartEdit}
    >
      <h3 className={defaultStyles.nodeTitle}>
        {node.data.title && node.data.title.trim().length > 0 ? node.data.title : t("untitled")}
      </h3>
      {node.data.content && <p className={defaultStyles.nodeContent}>{String(node.data.content)}</p>}
    </div>
  );
};

// Alignment component for selected nodes
const AlignmentControls = React.memo<{
  selectedNodes: Node[];
  onAlign: (type: AlignmentActionType) => void;
}>(({ selectedNodes, onAlign }) => {
  const isDisabled = selectedNodes.length < 2;
  const groupedActions = React.useMemo(() => {
    return ALIGNMENT_GROUPS.reduce<Record<AlignmentActionGroup, AlignmentActionConfig[]>>(
      (acc, group) => {
        acc[group] = ALIGNMENT_ACTIONS.filter((action) => action.group === group);
        return acc;
      },
      { horizontal: [], vertical: [] }
    );
  }, []);

  return (
    <div className={alignmentStyles.alignmentControls}>
      <InspectorLabel>
        Alignment {selectedNodes.length > 1 ? `(${selectedNodes.length} nodes)` : "(select 2+ nodes)"}
      </InspectorLabel>
      <div className={alignmentStyles.alignmentGrid}>
        {ALIGNMENT_GROUPS.map((group) => (
          <div key={group} className={alignmentStyles.alignmentRow}>
            {groupedActions[group]?.map((button) => {
              const IconComponent = button.icon;
              return (
                <button
                  key={button.type}
                  type="button"
                  onClick={() => !isDisabled && onAlign(button.type)}
                  className={alignmentStyles.alignmentButton}
                  title={isDisabled ? "Select 2 or more nodes to enable alignment" : button.title}
                  aria-label={button.title}
                  disabled={isDisabled}
                >
                  <IconComponent size={14} />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
AlignmentControls.displayName = "AlignmentControls";

// Extended props for supporting multiple selection alignment
interface ExtendedInspectorRenderProps extends InspectorRenderProps {
  selectedNodes?: Node[];
  onAlignNodes?: (alignmentType: AlignmentActionType, nodes: Node[]) => void;
}

/**
 * Default inspector renderer with optimized performance
 */
export const DefaultInspectorRenderer: React.FC<ExtendedInspectorRenderProps> = React.memo(
  ({ node, onUpdateNode, onDeleteNode, selectedNodes = [], onAlignNodes }) => {
    const { t } = useI18n();
    // Memoized update handlers
    const handleTitleChange = React.useCallback(
      (title: string) => {
        onUpdateNode({
          data: { ...node.data, title },
        });
      },
      [node.data, onUpdateNode]
    );

    const handleContentChange = React.useCallback(
      (content: string) => {
        onUpdateNode({
          data: { ...node.data, content },
        });
      },
      [node.data, onUpdateNode]
    );

    const handlePositionXChange = React.useCallback(
      (x: number) => {
        onUpdateNode({
          position: { ...node.position, x },
        });
      },
      [node.position, onUpdateNode]
    );

    const handlePositionYChange = React.useCallback(
      (y: number) => {
        onUpdateNode({
          position: { ...node.position, y },
        });
      },
      [node.position, onUpdateNode]
    );

    const handleWidthChange = React.useCallback(
      (width: number) => {
        onUpdateNode({
          size: { ...node.size, width, height: node.size?.height ?? 0 },
        });
      },
      [node.size, onUpdateNode]
    );

    const handleHeightChange = React.useCallback(
      (height: number) => {
        onUpdateNode({
          size: { ...node.size, height, width: node.size?.width ?? 0 },
        });
      },
      [node.size, onUpdateNode]
    );
    const handleLockedChange = React.useCallback(
      (locked: boolean) => {
        onUpdateNode({ locked });
      },
      [onUpdateNode]
    );
    const handleVisibleChange = React.useCallback(
      (visible: boolean) => {
        onUpdateNode({ visible });
      },
      [onUpdateNode]
    );

    // no-op placeholders removed (group-specific controls are handled by custom inspector outside)

    const handleAlignment = React.useCallback(
      (alignmentType: AlignmentActionType) => {
        if (!onAlignNodes || selectedNodes.length < 2) return;
        onAlignNodes(alignmentType, selectedNodes);
      },
      [onAlignNodes, selectedNodes]
    );

    return (
      <PropertySection title={t("inspectorNodeProperties")}>
        <div>
          <InspectorLabel>{t("fieldTitle") || "Title"}</InspectorLabel>
          <InspectorInput
            id={`node-${node.id}-title`}
            name="nodeTitle"
            value={node.data.title || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={editorStyles.inspectorInput}
          />
        </div>

        {node.data.content !== undefined && (
          <div>
            <InspectorLabel>{t("fieldContent") || "Content"}</InspectorLabel>
            <InspectorTextarea
              id={`node-${node.id}-content`}
              name="nodeContent"
              value={String(node.data.content) || ""}
              onChange={(e) => handleContentChange(e.target.value)}
              className={editorStyles.inspectorTextarea}
            />
          </div>
        )}

        <AlignmentControls selectedNodes={selectedNodes} onAlign={handleAlignment} />

        <div>
          <InspectorLabel>
            {t("inspectorPosition")} & {t("inspectorSize")}
          </InspectorLabel>
          <div className={editorStyles.inspectorPositionInputs}>
            <InspectorNumberInput
              label="X"
              value={node.position.x}
              onChange={handlePositionXChange}
              id={`node-${node.id}-pos-x`}
              name="nodePosX"
              aria-label="X position"
            />
            <InspectorNumberInput
              label="Y"
              value={node.position.y}
              onChange={handlePositionYChange}
              id={`node-${node.id}-pos-y`}
              name="nodePosY"
              aria-label="Y position"
            />
            <InspectorNumberInput
              label="W"
              value={node.size?.width || 100}
              onChange={handleWidthChange}
              id={`node-${node.id}-width`}
              name="nodeWidth"
              aria-label="Width"
            />
            <InspectorNumberInput
              label="H"
              value={node.size?.height || 100}
              onChange={handleHeightChange}
              id={`node-${node.id}-height`}
              name="nodeHeight"
              aria-label="Height"
            />
          </div>
        </div>

        <div>
          <InspectorLabel>
            {t("inspectorLocked")} / {t("inspectorVisible")}
          </InspectorLabel>
          <div className={defaultStyles.groupInspectorOptions}>
            <InspectorCheckbox checked={node.locked || false} onChange={handleLockedChange} label={t("inspectorLocked")} />
            <InspectorCheckbox checked={node.visible !== false} onChange={handleVisibleChange} label={t("inspectorVisible")} />
          </div>
        </div>

        <div>
          <InspectorLabel>Type</InspectorLabel>
          <div className={editorStyles.inspectorReadOnlyField}>{node.type}</div>
        </div>

        {/* Group-specific inspector UI is rendered outside this section by NodeInspector */}

        <InspectorLabel>{t("inspectorActions") || "Actions"}</InspectorLabel>
        <div className={defaultStyles.inspectorActions}>
          {(() => {
            const editorActions = useNodeEditorActions();
            const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
            const { state: editorState } = useNodeEditor();
            const nodeDefinitions = useNodeDefinitionList();

            const handleDuplicate = () => {
              const n = editorState.nodes[node.id];
              if (!n) return;
              const counts = countNodesByType(editorState);
              if (!canAddNodeType(n.type, nodeDefinitions, counts)) return;
              editorActions.duplicateNodes([node.id]);
            };

            const handleCopy = () => {
              const selected =
                actionState.selectedNodeIds.length > 0 && actionState.selectedNodeIds.includes(node.id)
                  ? actionState.selectedNodeIds
                  : [node.id];
              const nodes = selected
                .map((id) => editorState.nodes[id])
                .filter(Boolean)
                .map((n) => ({ id: n.id, type: n.type, position: n.position, size: n.size, data: n.data }));
              const selSet = new Set(selected);
              const connections = Object.values(editorState.connections)
                .filter((c) => selSet.has(c.fromNodeId) && selSet.has(c.toNodeId))
                .map((c) => ({
                  fromNodeId: c.fromNodeId,
                  fromPortId: c.fromPortId,
                  toNodeId: c.toNodeId,
                  toPortId: c.toPortId,
                }));
              setClipboard({ nodes, connections });
            };

            const handleCut = () => {
              const selected =
                actionState.selectedNodeIds.length > 0 && actionState.selectedNodeIds.includes(node.id)
                  ? actionState.selectedNodeIds
                  : [node.id];
              const nodes = selected
                .map((id) => editorState.nodes[id])
                .filter(Boolean)
                .map((n) => ({ id: n.id, type: n.type, position: n.position, size: n.size, data: n.data }));
              const selSet = new Set(selected);
              const connections = Object.values(editorState.connections)
                .filter((c) => selSet.has(c.fromNodeId) && selSet.has(c.toNodeId))
                .map((c) => ({
                  fromNodeId: c.fromNodeId,
                  fromPortId: c.fromPortId,
                  toNodeId: c.toNodeId,
                  toPortId: c.toPortId,
                }));
              setClipboard({ nodes, connections });
              selected.forEach((id) => editorActions.deleteNode(id));
              actionDispatch(actionActions.clearSelection());
            };

            const handleDelete = () => {
              editorActions.deleteNode(node.id);
            };

            const duplicateLabel = t("contextMenuDuplicateNode") || "Duplicate";
            const copyLabel = t("copy") || "Copy";
            const cutLabel = t("cut") || "Cut";
            const deleteLabel = t("contextMenuDeleteNode") || "Delete";
            return (
              <>
                <InspectorButton onClick={handleDuplicate} aria-label={duplicateLabel}>
                  <DuplicateIcon size={14} />
                  <span style={{ marginLeft: 6 }}>{duplicateLabel}</span>
                </InspectorButton>
                <InspectorButton onClick={handleCopy} aria-label={copyLabel}>
                  <CopyIcon size={14} />
                  <span style={{ marginLeft: 6 }}>{copyLabel}</span>
                </InspectorButton>
                <InspectorButton onClick={handleCut} aria-label={cutLabel}>
                  <CutIcon size={14} />
                  <span style={{ marginLeft: 6 }}>{cutLabel}</span>
                </InspectorButton>
                <InspectorButton variant="danger" onClick={handleDelete} aria-label={deleteLabel}>
                  <DeleteIcon size={14} />
                  <span style={{ marginLeft: 6 }}>{deleteLabel}</span>
                </InspectorButton>
              </>
            );
          })()}
        </div>
      </PropertySection>
    );
  }
);

DefaultInspectorRenderer.displayName = "DefaultInspectorRenderer";
