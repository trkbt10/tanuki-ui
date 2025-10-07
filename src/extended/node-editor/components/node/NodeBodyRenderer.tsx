import * as React from "react";
import type { Node } from "../../types/core";
import type { NodeDefinition } from "../../types/NodeDefinition";
import type { CustomNodeRendererProps } from "./NodeView";
import { GroupNodeRenderer as GroupContent } from "../../node-definitions/group/node";
import { LockIcon } from "../elements";
import { useI18n } from "../../i18n";
import styles from "./NodeBodyRenderer.module.css";

export interface NodeBodyRendererProps {
  node: Node;
  isSelected: boolean;
  nodeDefinition?: NodeDefinition;
  useCustomRenderer?: boolean;
  customRenderProps: CustomNodeRendererProps;
  isEditing: boolean;
  editingValue: string;
  isGroup: boolean;
  groupChildrenCount: number;
  groupTextColor?: string;
  onTitleDoubleClick: (e: React.MouseEvent) => void;
  onEditingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditingKeyDown: (e: React.KeyboardEvent) => void;
  onEditingBlur: () => void;
}

/**
 * Renders the main body of a node (header and content)
 */
export const NodeBodyRenderer: React.FC<NodeBodyRendererProps> = ({
  node,
  isSelected,
  nodeDefinition,
  useCustomRenderer,
  customRenderProps,
  isEditing,
  editingValue,
  isGroup,
  groupChildrenCount,
  groupTextColor,
  onTitleDoubleClick,
  onEditingChange,
  onEditingKeyDown,
  onEditingBlur,
}) => {
  const { t } = useI18n();

  // Check if a function is likely a React component (by naming convention)
  const isReactComponent = React.useCallback((fn: Function): boolean => {
    // React components should start with an uppercase letter
    return /^[A-Z]/.test(fn.name || '');
  }, []);

  // Use component invocation to properly support React hooks
  if (useCustomRenderer && nodeDefinition?.renderNode) {
    const renderFn = nodeDefinition.renderNode;

    // If it looks like a React component, use as JSX to support hooks
    if (isReactComponent(renderFn)) {
      const CustomNodeRenderer = renderFn;
      return (
        <div className={styles.customNodeContent}>
          <CustomNodeRenderer {...customRenderProps} />
        </div>
      );
    }

    // Otherwise, call as a regular function (legacy support)
    return (
      <div className={styles.customNodeContent}>
        {renderFn(customRenderProps)}
      </div>
    );
  }

  return (
    <>
      <div
        className={styles.nodeHeader}
        data-drag-handle={nodeDefinition?.interactive ? "true" : "false"}
        data-interactive={nodeDefinition?.interactive ? "true" : "false"}
        data-selected={isSelected ? "true" : "false"}
        data-is-group={isGroup ? "true" : "false"}
      >
        {node.locked && (
          <span className={styles.lockIcon}>
            <LockIcon size={12} />
          </span>
        )}
        {isEditing ? (
          <input
            id={`node-title-${node.id}`}
            name="nodeTitle"
            className={styles.nodeTitleInput}
            type="text"
            value={editingValue}
            onChange={onEditingChange}
            onKeyDown={onEditingKeyDown}
            onBlur={onEditingBlur}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            aria-label="Node title"
          />
        ) : (
          <span
            className={styles.nodeTitle}
            onDoubleClick={onTitleDoubleClick}
            style={groupTextColor ? { color: groupTextColor } : undefined}
            data-is-group={isGroup ? "true" : "false"}
          >
            {node.data.title && node.data.title.trim().length > 0 ? node.data.title : t("untitled")}
          </span>
        )}
      </div>

      <div className={styles.nodeContent}>
        {isGroup ? (
          <GroupContent node={node} childCount={groupChildrenCount} />
        ) : (
          node.data.content || "Empty node"
        )}
      </div>
    </>
  );
};
