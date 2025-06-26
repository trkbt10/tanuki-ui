import * as React from "react";
import type { NodeRenderProps, InspectorRenderProps } from "../../../types/NodeDefinition";
import type { Node } from "../../../types/core";
import { AlignLeftIcon } from "../../../../../blocks/AlignLeftIcon";
import { AlignCenterIcon } from "../../../../../blocks/AlignCenterIcon";
import { AlignRightIcon } from "../../../../../blocks/AlignRightIcon";
import { AlignTopIcon } from "../../../../../blocks/AlignTopIcon";
import { AlignMiddleIcon } from "../../../../../blocks/AlignMiddleIcon";
import { AlignBottomIcon } from "../../../../../blocks/AlignBottomIcon";
import { DistributeHorizontalIcon } from "../../../../../blocks/DistributeHorizontalIcon";
import { DistributeVerticalIcon } from "../../../../../blocks/DistributeVerticalIcon";
import { Button } from "../../../../../form/Button";
import { Input } from "../../../../../form/Input";
import { Label } from "../../../../../form/Label";
import { Textarea } from "../../../../../form/Textarea";
import alignmentStyles from "./AlignmentControls.module.css";

/**
 * Default node renderer
 */
export const DefaultNodeRenderer: React.FC<NodeRenderProps> = ({ node, isSelected, isDragging, isEditing, onStartEdit }) => {
  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: isSelected ? "#e3f2fd" : "#ffffff",
        opacity: isDragging ? 0.7 : 1,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onDoubleClick={onStartEdit}
    >
      <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{node.data.title || `Node ${node.id}`}</h3>
      {node.data.content && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#666" }}>{String(node.data.content)}</p>}
    </div>
  );
};

// Memoized input component to prevent re-renders
const InspectorInput = React.memo<{
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  type?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
}>(({ value, onChange, style, type = "text", placeholder, id, name, "aria-label": ariaLabel }) => (
  <Input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={style}
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
  id?: string;
  name?: string;
  "aria-label"?: string;
}>(({ value, onChange, style, id, name, "aria-label": ariaLabel }) => (
  <textarea value={value} onChange={(e) => onChange(e.target.value)} style={style} id={id} name={name} aria-label={ariaLabel} />
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
  const containerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: "12px",
  };

  const labelStyles: React.CSSProperties = {
    color: "#666",
    fontSize: "11px",
    fontWeight: 500,
    minWidth: "12px",
    textAlign: "center" as const,
  };

  const inputStyles: React.CSSProperties = {
    border: "none",
    background: "transparent",
    fontSize: "12px",
    outline: "none",
    width: "100%",
    textAlign: "right" as const,
  };

  return (
    <div style={containerStyles}>
      <span style={labelStyles}>{label}</span>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={inputStyles}
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
  <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} id={id} name={name} />
    <span style={{ fontSize: "13px" }}>{label}</span>
  </label>
));
InspectorCheckbox.displayName = "InspectorCheckbox";

// Alignment component for selected nodes
const AlignmentControls = React.memo<{
  selectedNodes: Node[];
  onAlign: (type: string) => void;
}>(({ selectedNodes, onAlign }) => {
  const isDisabled = selectedNodes.length < 2;

  const alignmentButtons = [
    { type: "align-left", icon: AlignLeftIcon, title: "Align Left" },
    { type: "align-center-horizontal", icon: AlignCenterIcon, title: "Align Center Horizontal" },
    { type: "align-right", icon: AlignRightIcon, title: "Align Right" },
    { type: "align-top", icon: AlignTopIcon, title: "Align Top" },
    { type: "align-center-vertical", icon: AlignMiddleIcon, title: "Align Center Vertical" },
    { type: "align-bottom", icon: AlignBottomIcon, title: "Align Bottom" },
    { type: "distribute-horizontal", icon: DistributeHorizontalIcon, title: "Distribute Horizontally" },
    { type: "distribute-vertical", icon: DistributeVerticalIcon, title: "Distribute Vertically" },
  ];

  return (
    <div className={alignmentStyles.alignmentControls}>
      <Label className={alignmentStyles.alignmentLabel}>
        Alignment {selectedNodes.length > 1 ? `(${selectedNodes.length} nodes)` : "(select 2+ nodes)"}:
      </Label>
      <div className={alignmentStyles.alignmentGrid}>
        {alignmentButtons.map((button) => {
          const IconComponent = button.icon;
          return (
            <Button
              key={button.type}
              onClick={() => !isDisabled && onAlign(button.type)}
              className={alignmentStyles.alignmentButton}
              title={isDisabled ? "Select 2 or more nodes to enable alignment" : button.title}
              disabled={isDisabled}
            >
              <IconComponent size={14} />
            </Button>
          );
        })}
      </div>
    </div>
  );
});
AlignmentControls.displayName = "AlignmentControls";

// Extended props for supporting multiple selection alignment
interface ExtendedInspectorRenderProps extends InspectorRenderProps {
  selectedNodes?: Node[];
  onAlignNodes?: (alignmentType: string, nodes: Node[]) => void;
}

/**
 * Default inspector renderer with optimized performance
 */
export const DefaultInspectorRenderer: React.FC<ExtendedInspectorRenderProps> = React.memo(
  ({ node, onUpdateNode, onDeleteNode, selectedNodes = [], onAlignNodes }) => {
    const inputStyles: React.CSSProperties = React.useMemo(
      () => ({
        width: "100%",
        padding: "4px 8px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "13px",
      }),
      []
    );

    const labelStyles: React.CSSProperties = React.useMemo(
      () => ({
        display: "block",
        marginBottom: "4px",
        fontSize: "12px",
        fontWeight: 500,
        color: "#666",
      }),
      []
    );

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
      (alignmentType: string) => {
        if (!onAlignNodes || selectedNodes.length < 2) return;
        onAlignNodes(alignmentType, selectedNodes);
      },
      [onAlignNodes, selectedNodes]
    );

    const textareaStyles = React.useMemo(
      () => ({
        ...inputStyles,
        minHeight: "60px",
        resize: "vertical" as const,
      }),
      [inputStyles]
    );

    const halfWidthInputStyles = React.useMemo(
      () => ({
        ...inputStyles,
        width: "50%",
      }),
      [inputStyles]
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h4 style={{ margin: 0, fontSize: "14px" }}>Node Properties</h4>

        <div>
          <Label htmlFor={`node-${node.id}-title`} style={labelStyles}>
            Title:
          </Label>
          <InspectorInput
            id={`node-${node.id}-title`}
            name="nodeTitle"
            value={node.data.title || ""}
            onChange={handleTitleChange}
            style={inputStyles}
          />
        </div>

        {node.data.content !== undefined && (
          <div>
            <Label htmlFor={`node-${node.id}-content`} style={labelStyles}>
              Content:
            </Label>
            <InspectorTextarea
              id={`node-${node.id}-content`}
              name="nodeContent"
              value={String(node.data.content) || ""}
              onChange={handleContentChange}
              style={textareaStyles}
            />
          </div>
        )}

        <AlignmentControls selectedNodes={selectedNodes} onAlign={handleAlignment} />

        <div>
          <Label style={labelStyles}>Position & Size:</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
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
          <Label style={labelStyles}>Type:</Label>
          <div
            style={{
              padding: "4px 8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              fontSize: "13px",
            }}
          >
            {node.type}
          </div>
        </div>

        {node.type === "group" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <InspectorCheckbox checked={node.locked || false} onChange={handleLockedChange} label="Lock Layer" />
            <InspectorCheckbox checked={node.visible !== false} onChange={handleVisibleChange} label="Visible" />
          </div>
        )}

        <div style={{ paddingTop: "16px", borderTop: "1px solid #eee" }}>
          <Button
            onClick={onDeleteNode}
            style={{
              width: "100%",
            }}
            variant="danger"
          >
            Delete Node
          </Button>
        </div>
      </div>
    );
  }
);

DefaultInspectorRenderer.displayName = "DefaultInspectorRenderer";
