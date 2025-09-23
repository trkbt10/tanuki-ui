import * as React from "react";
import type { NodeRenderProps, InspectorRenderProps } from "../../../types/NodeDefinition";
import type { Node } from "../../../types/core";
import { Button, Input, Label, Textarea } from "../../elements";
import editorStyles from "../../../NodeEditor.module.css";
import { PropertySection } from "../../parts";
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

/**
 * Default node renderer
 */
export const DefaultNodeRenderer: React.FC<NodeRenderProps> = ({ node, isSelected, isDragging, isEditing, onStartEdit }) => {
  return (
    <div
      className={[
        defaultStyles.defaultNodeRenderer,
        isSelected ? defaultStyles.defaultNodeRendererSelected : "",
        isDragging ? defaultStyles.defaultNodeRendererDragging : defaultStyles.defaultNodeRendererNotDragging,
      ].filter(Boolean).join(" ")}
      onDoubleClick={onStartEdit}
    >
      <h3 className={defaultStyles.nodeTitle}>{node.data.title || `Node ${node.id}`}</h3>
      {node.data.content && <p className={defaultStyles.nodeContent}>{String(node.data.content)}</p>}
    </div>
  );
};

// Memoized input component to prevent re-renders
const InspectorInput = React.memo<{
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
}>(({ value, onChange, style, className, type = "text", placeholder, id, name, "aria-label": ariaLabel }) => (
  <Input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={style}
    className={className}
    placeholder={placeholder}
    id={id}
    name={name}
    aria-label={ariaLabel}
  />
));
InspectorInput.displayName = "InspectorInput";

// Memoized textarea component
const InspectorTextarea = React.memo<{
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
}>(({ value, onChange, style, className, id, name, "aria-label": ariaLabel }) => (
  <Textarea value={value} onChange={(e) => onChange(e.target.value)} style={style} className={className} id={id} name={name} aria-label={ariaLabel} />
));
InspectorTextarea.displayName = "InspectorTextarea";

// Memoized compact number input component with label
const InspectorNumberInput = React.memo<{
  value: number;
  onChange: (value: number) => void;
  label: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
}>(({ value, onChange, label, id, name, "aria-label": ariaLabel }) => {
  return (
    <div className={defaultStyles.numberInputContainer}>
      <span className={defaultStyles.numberInputLabel}>{label}</span>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={defaultStyles.numberInput}
        id={id}
        name={name}
        aria-label={ariaLabel}
      />
    </div>
  );
});
InspectorNumberInput.displayName = "InspectorNumberInput";

// Memoized checkbox component
const InspectorCheckbox = React.memo<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  name?: string;
}>(({ checked, onChange, label, id, name }) => (
  <label htmlFor={id} className={defaultStyles.checkboxContainer}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} id={id} name={name} />
    <span className={defaultStyles.checkboxText}>{label}</span>
  </label>
));
InspectorCheckbox.displayName = "InspectorCheckbox";

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
      <Label className={alignmentStyles.alignmentLabel}>
        Alignment {selectedNodes.length > 1 ? `(${selectedNodes.length} nodes)` : "(select 2+ nodes)"}:
      </Label>
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
          <Label htmlFor={`node-${node.id}-title`}>
            {t("fieldTitle") || "Title"}:
          </Label>
          <InspectorInput
            id={`node-${node.id}-title`}
            name="nodeTitle"
            value={node.data.title || ""}
            onChange={handleTitleChange}
            className={editorStyles.inspectorInput}
          />
        </div>

        {node.data.content !== undefined && (
          <div>
            <Label htmlFor={`node-${node.id}-content`}>
              {t("fieldContent") || "Content"}:
            </Label>
            <InspectorTextarea
              id={`node-${node.id}-content`}
              name="nodeContent"
              value={String(node.data.content) || ""}
              onChange={handleContentChange}
              className={editorStyles.inspectorTextarea}
            />
          </div>
        )}

        <AlignmentControls selectedNodes={selectedNodes} onAlign={handleAlignment} />

        <div>
          <Label>{t("inspectorPosition")} & {t("inspectorSize")}:</Label>
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
          <Label>Type:</Label>
          <div className={editorStyles.inspectorReadOnlyField}>
            {node.type}
          </div>
        </div>

        {node.type === "group" && (
          <div className={defaultStyles.groupInspectorOptions}>
            <InspectorCheckbox checked={node.locked || false} onChange={handleLockedChange} label={t("inspectorLocked")} />
            <InspectorCheckbox checked={node.visible !== false} onChange={handleVisibleChange} label={t("inspectorVisible")} />
          </div>
        )}

        <div>
          <Button onClick={onDeleteNode} variant="danger" size="small">
            {t("deleteNode")}
          </Button>
        </div>
      </PropertySection>
    );
  }
);

DefaultInspectorRenderer.displayName = "DefaultInspectorRenderer";
