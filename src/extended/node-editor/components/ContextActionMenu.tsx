import * as React from "react";
import { classNames, calculateContextMenuPosition, getViewportInfo } from "./elements";
import styles from "./ContextActionMenu.module.css";
import type { Position } from "../types/core";
import { useNodeEditorActions } from "../hooks/useNodeEditorActions";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useI18n } from "../i18n";
import { useNodeEditor } from "../contexts/node-editor";
import { useNodeDefinitionList } from "../contexts/NodeDefinitionContext";
import { canAddNodeType, countNodesByType } from "../utils/nodeTypeLimits";

export type ContextTarget =
  | { type: "node"; id: string }
  | { type: "connection"; id: string };

export interface ContextActionMenuProps {
  position: Position;
  target: ContextTarget;
  visible: boolean;
  onClose: () => void;
}

export const ContextActionMenu: React.FC<ContextActionMenuProps> = ({ position, target, visible, onClose }) => {
  const { t } = useI18n();
  const editorActions = useNodeEditorActions();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { state: editorState } = useNodeEditor();
  const nodeDefinitions = useNodeDefinitionList();
  const [menuPosition, setMenuPosition] = React.useState({ x: position.x, y: position.y });
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (visible) {
      setTimeout(() => {
        if (menuRef.current) {
          const rect = menuRef.current.getBoundingClientRect();
          const viewport = getViewportInfo();
          const calculated = calculateContextMenuPosition(position.x, position.y, rect.width, rect.height, viewport);
          setMenuPosition(calculated);
        }
      }, 0);
    }
  }, [visible, position.x, position.y]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (visible && e.target instanceof Element) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          onClose();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible, onClose]);

  if (!visible) return null;

  const handleDeleteNode = () => {
    if (target.type !== "node") return;
    editorActions.deleteNode(target.id);
    onClose();
  };

  const handleDuplicateNode = () => {
    if (target.type !== "node") return;
    const node = editorState.nodes[target.id];
    if (!node) return;
    const counts = countNodesByType(editorState);
    if (!canAddNodeType(node.type, nodeDefinitions, counts)) {
      onClose();
      return;
    }
    editorActions.duplicateNodes([target.id]);
    onClose();
  };

  const handleDeleteConnection = () => {
    if (target.type !== "connection") return;
    editorActions.deleteConnection(target.id);
    onClose();
  };

  // Optional: Start a disconnect drag from context menu
  const handleDisconnectFrom = (end: "from" | "to") => {
    if (target.type !== "connection") return;
    // We only implement Delete here to keep logic simple and safe.
    // Future: implement startConnectionDisconnect with fixedPort using portLookupMap.
    editorActions.deleteConnection(target.id);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={classNames(styles.menu, styles.menuContainer)}
      style={{ left: menuPosition.x, top: menuPosition.y }}
    >
      <ul className={styles.menuList}>
        {target.type === "node" && (
          <>
            <li className={styles.menuSectionTitle}>{t("inspectorNodeProperties")}</li>
            <li className={styles.menuItem} onClick={handleDuplicateNode}>{t("contextMenuDuplicateNode")}</li>
            <li className={classNames(styles.menuItem, styles.menuItemDanger)} onClick={handleDeleteNode}>{t("contextMenuDeleteNode")}</li>
          </>
        )}
        {target.type === "connection" && (
          <>
            <li className={styles.menuSectionTitle}>{t("inspectorConnectionProperties")}</li>
            <li className={classNames(styles.menuItem, styles.menuItemDanger)} onClick={handleDeleteConnection}>{t("contextMenuDeleteConnection")}</li>
          </>
        )}
      </ul>
    </div>
  );
};

ContextActionMenu.displayName = "ContextActionMenu";
