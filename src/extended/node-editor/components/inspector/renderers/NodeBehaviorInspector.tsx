import * as React from "react";
import type { InspectorRenderProps } from "../../../types/NodeDefinition";
import type { Node } from "../../../types/core";
import {
  PropertySection,
  InspectorLabel,
  InspectorButton,
  InspectorInput,
  InspectorTextarea,
  InspectorNumberInput,
  InspectorCheckbox,
  PositionInputsGrid,
  ReadOnlyField,
} from "../parts";
import { useI18n } from "../../../i18n";
import styles from "./NodeBehaviorInspector.module.css";
import { AlignmentControls, type AlignmentActionType } from "../../controls/alignments";

// Extended props for supporting multiple selection alignment
interface ExtendedInspectorRenderProps extends InspectorRenderProps {
  selectedNodes?: Node[];
  onAlignNodes?: (alignmentType: AlignmentActionType, nodes: Node[]) => void;
}

/**
 * Inspector for "node" behavior
 * Provides standard node editing capabilities with optimized performance
 */
export function NodeBehaviorInspector({
  node,
  onUpdateNode,
  onDeleteNode,
  selectedNodes = [],
  onAlignNodes,
}: ExtendedInspectorRenderProps): React.ReactElement {
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
        <InspectorLabel>{t("fieldTitle") || "Title"}</InspectorLabel>
        <InspectorInput
          id={`node-${node.id}-title`}
          name="nodeTitle"
          value={node.data.title || ""}
          onChange={(e) => handleTitleChange(e.target.value)}
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
          />
        </div>
      )}

      <AlignmentControls selectedNodes={selectedNodes} onAlign={handleAlignment} />

      <div>
        <InspectorLabel>
          {t("inspectorPosition")} & {t("inspectorSize")}
        </InspectorLabel>
        <PositionInputsGrid>
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
        </PositionInputsGrid>
      </div>

      <div>
        <InspectorLabel>
          {t("inspectorLocked")} / {t("inspectorVisible")}
        </InspectorLabel>
        <div className={styles.options}>
          <InspectorCheckbox checked={node.locked || false} onChange={handleLockedChange} label={t("inspectorLocked")} />
          <InspectorCheckbox checked={node.visible !== false} onChange={handleVisibleChange} label={t("inspectorVisible")} />
        </div>
      </div>

      <div>
        <InspectorLabel>Type</InspectorLabel>
        <ReadOnlyField>{node.type}</ReadOnlyField>
      </div>
    </PropertySection>
  );
}
