import * as React from "react";
import { NodeEditorBase } from "./components/NodeEditorBase";
import { InspectorPanel } from "./components/InspectorPanel";
import { ColumnLayout } from "./components/ColumnLayout";
import { CanvasBase } from "./components/CanvasBase";
import { NodeLayer } from "./components/NodeLayer";
import { ConnectionLayer } from "./components/ConnectionLayer";
import { StatusBar } from "./components/StatusBar";
import { NodeSearchMenu } from "./components/NodeSearchMenu";
import { Toolbar } from "./components/Toolbar";
import { NodeCanvasProvider } from "./contexts/NodeCanvasContext";
import { EditorActionStateProvider } from "./contexts/EditorActionStateContext";
import { KeyboardShortcutProvider } from "./contexts/KeyboardShortcutContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import { InlineEditingProvider } from "./contexts/InlineEditingContext";
import { NodeEditorProvider, useNodeEditor, nodeEditorReducer, type NodeEditorData } from "./contexts/NodeEditorContext";
import { NodeDefinitionProvider, useNodeDefinitions, useNodeDefinitionList } from "./contexts/NodeDefinitionContext";
import { ExternalDataProvider } from "./contexts/ExternalDataContext";
import { useEditorActionState } from "./contexts/EditorActionStateContext";
import { useNodeCanvas } from "./contexts/NodeCanvasContext";
import type { NodeDefinition, ExternalDataReference } from "./types/NodeDefinition";
import type { SettingsManager } from "./settings/SettingsManager";
import { useSettings } from "./hooks/useSettings";
import { classNames } from "../../utilities/classNames";
import styles from "./NodeEditor.module.css";

export interface NodeEditorProps {
  /** Initial data for uncontrolled mode (like defaultValue) */
  initialData?: Partial<NodeEditorData>;
  /** Data for controlled mode (like value) */
  data?: NodeEditorData;
  onDataChange?: (data: NodeEditorData) => void;
  onSave?: (data: NodeEditorData) => void | Promise<void>;
  onLoad?: () => NodeEditorData | Promise<NodeEditorData>;
  className?: string;
  /** Custom node definitions */
  nodeDefinitions?: NodeDefinition[];
  /** Whether to include default node definitions */
  includeDefaultDefinitions?: boolean;
  /** External data references for nodes */
  externalDataRefs?: Record<string, ExternalDataReference>;
  /** Custom overlay layers (e.g., minimap, debugging tools) */
  overlayLayers?: React.ReactNode[];
  /** Custom background layers (e.g., custom grid, guides) */
  backgroundLayers?: React.ReactNode[];
  /** Custom UI overlay layers (fixed position, non-interactive, for UI elements) */
  uiOverlayLayers?: React.ReactNode[];
  /** Settings manager instance */
  settingsManager?: SettingsManager;
  /** Custom toolbar content */
  toolbar?: React.ReactNode;
  /** Content for left sidebar (optional) */
  leftSidebar?: React.ReactNode;
  /** Content for right sidebar (optional) */
  rightSidebar?: React.ReactNode;
  /** Initial width of left sidebar in pixels */
  leftSidebarInitialWidth?: number;
  /** Initial width of right sidebar in pixels */
  rightSidebarInitialWidth?: number;
  /** Minimum width of left sidebar in pixels */
  leftSidebarMinWidth?: number;
  /** Minimum width of right sidebar in pixels */
  rightSidebarMinWidth?: number;
  /** Maximum width of left sidebar in pixels */
  leftSidebarMaxWidth?: number;
  /** Maximum width of right sidebar in pixels */
  rightSidebarMaxWidth?: number;
  /** Callback when left sidebar width changes */
  onLeftSidebarWidthChange?: (width: number) => void;
  /** Callback when right sidebar width changes */
  onRightSidebarWidthChange?: (width: number) => void;
}

/**
 * NodeEditor - Main component that integrates all node editor functionality
 * Provides three separate contexts for managing different aspects of the editor
 */
export const NodeEditor: React.FC<NodeEditorProps> = ({
  initialData,
  data,
  onDataChange,
  onSave,
  onLoad,
  className,
  nodeDefinitions,
  includeDefaultDefinitions = true,
  externalDataRefs,
  overlayLayers,
  backgroundLayers,
  uiOverlayLayers,
  settingsManager,
  toolbar,
  leftSidebar,
  rightSidebar,
  leftSidebarInitialWidth,
  rightSidebarInitialWidth,
  leftSidebarMinWidth,
  rightSidebarMinWidth,
  leftSidebarMaxWidth,
  rightSidebarMaxWidth,
  onLeftSidebarWidthChange,
  onRightSidebarWidthChange,
}) => {
  return (
    <NodeDefinitionProvider nodeDefinitions={nodeDefinitions} includeDefaults={includeDefaultDefinitions}>
      <ExternalDataProvider refs={externalDataRefs}>
        <NodeEditorProvider
          initialState={initialData}
          controlledData={data}
          onDataChange={onDataChange}
          onSave={onSave}
          onLoad={onLoad}
          settingsManager={settingsManager}
        >
          <EditorActionStateProvider>
            <NodeCanvasProvider>
              <HistoryProvider>
                <InlineEditingProvider>
                  <KeyboardShortcutProvider>
                    <NodeEditorContent
                      className={className}
                      overlayLayers={overlayLayers}
                      backgroundLayers={backgroundLayers}
                      uiOverlayLayers={uiOverlayLayers}
                      settingsManager={settingsManager}
                      toolbar={toolbar}
                      leftSidebar={leftSidebar}
                      rightSidebar={rightSidebar}
                      leftSidebarInitialWidth={leftSidebarInitialWidth}
                      rightSidebarInitialWidth={rightSidebarInitialWidth}
                      leftSidebarMinWidth={leftSidebarMinWidth}
                      rightSidebarMinWidth={rightSidebarMinWidth}
                      leftSidebarMaxWidth={leftSidebarMaxWidth}
                      rightSidebarMaxWidth={rightSidebarMaxWidth}
                      onLeftSidebarWidthChange={onLeftSidebarWidthChange}
                      onRightSidebarWidthChange={onRightSidebarWidthChange}
                    />
                  </KeyboardShortcutProvider>
                </InlineEditingProvider>
              </HistoryProvider>
            </NodeCanvasProvider>
          </EditorActionStateProvider>
        </NodeEditorProvider>
      </ExternalDataProvider>
    </NodeDefinitionProvider>
  );
};

const NodeEditorContent: React.FC<{
  className?: string;
  overlayLayers?: React.ReactNode[];
  backgroundLayers?: React.ReactNode[];
  uiOverlayLayers?: React.ReactNode[];
  settingsManager?: SettingsManager;
  toolbar?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  leftSidebarInitialWidth?: number;
  rightSidebarInitialWidth?: number;
  leftSidebarMinWidth?: number;
  rightSidebarMinWidth?: number;
  leftSidebarMaxWidth?: number;
  rightSidebarMaxWidth?: number;
  onLeftSidebarWidthChange?: (width: number) => void;
  onRightSidebarWidthChange?: (width: number) => void;
}> = ({
  className,
  overlayLayers,
  backgroundLayers,
  uiOverlayLayers,
  settingsManager,
  toolbar,
  leftSidebar,
  rightSidebar,
  leftSidebarInitialWidth,
  rightSidebarInitialWidth,
  leftSidebarMinWidth,
  rightSidebarMinWidth,
  leftSidebarMaxWidth,
  rightSidebarMaxWidth,
  onLeftSidebarWidthChange,
  onRightSidebarWidthChange,
}) => {
  const { handleSave, dispatch, actions, isLoading, isSaving } = useNodeEditor();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { utils } = useNodeCanvas();

  const nodeDefinitions = useNodeDefinitionList();

  // Use settings hook for clean state management
  const settings = useSettings(settingsManager);
  const {
    showGrid,
    showMinimap,
    showStatusBar,
    theme,
    autoSave,
    autoSaveInterval,
    smoothAnimations,
    doubleClickToEdit,
    fontSize,
    gridSize,
    gridOpacity,
    canvasBackground,
  } = settings;
  // Apply settings-based CSS custom properties
  const editorStyles = React.useMemo(
    () =>
      ({
        "--editor-font-size": `${fontSize}px`,
        "--editor-grid-size": `${gridSize}px`,
        "--editor-grid-opacity": `${gridOpacity}`,
        "--editor-canvas-background": canvasBackground,
      } as React.CSSProperties),
    [fontSize, gridSize, gridOpacity, canvasBackground]
  );

  // Node creation handler for context menu
  const handleCreateNode = React.useCallback(
    (nodeType: string, position: { x: number; y: number }) => {
      const nodeDefinition = nodeDefinitions.find((def) => def.type === nodeType);
      if (!nodeDefinition) {
        console.warn(`Node definition not found for type: ${nodeType}`);
        return;
      }

      // Use canvas position from context menu state (preferred)
      // If not available, use canvas utils to convert screen coordinates
      let canvasPosition = actionState.contextMenu.canvasPosition;

      if (!canvasPosition) {
        // Convert screen coordinates to canvas coordinates using canvas utils
        canvasPosition = utils.screenToCanvas(position.x, position.y);
      }

      // Create unique node ID
      const nodeId = `${nodeType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      // Get node size
      const nodeSize = nodeDefinition.defaultSize || { width: 150, height: 50 };

      // Adjust position so node center is at click position
      const centeredPosition = {
        x: canvasPosition.x - nodeSize.width / 2,
        y: canvasPosition.y - nodeSize.height / 2,
      };

      // Create new node with definition defaults
      const newNode = {
        id: nodeId,
        type: nodeType,
        position: centeredPosition,
        size: nodeSize,
        data: nodeDefinition.defaultData || { title: nodeDefinition.displayName },
        ports:
          nodeDefinition.ports?.map((portDef) => ({
            ...portDef,
            nodeId,
          })) || [],
      };

      // Add node to editor
      dispatch(actions.addNode(newNode));

      // Select the new node
      actionDispatch(actionActions.selectNode(nodeId, false));

      // Hide context menu
      actionDispatch(actionActions.hideContextMenu());
    },
    [nodeDefinitions, dispatch, actions, actionDispatch, actionActions, actionState.contextMenu.canvasPosition, utils]
  );

  // Register save keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      // Hide context menu on Escape
      if (e.key === "Escape") {
        actionDispatch(actionActions.hideContextMenu());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, actionDispatch, actionActions]);

  // Determine sidebar content
  const leftSidebarContent = leftSidebar;
  const rightSidebarContent = rightSidebar === undefined ? <InspectorPanel /> : rightSidebar;

  return (
    <NodeEditorBase
      className={classNames(className, theme === "dark" && styles.darkTheme, smoothAnimations && styles.smoothAnimations)}
      style={editorStyles}
      data-theme={theme}
    >
      <div className={styles.editorLayout}>
        {/* Top toolbar */}
        {toolbar && <div className={styles.editorToolbar}>{toolbar}</div>}

        <div className={styles.editorContent}>
          <ColumnLayout
            leftSidebar={leftSidebarContent}
            rightSidebar={rightSidebarContent}
            leftSidebarInitialWidth={leftSidebarInitialWidth}
            rightSidebarInitialWidth={rightSidebarInitialWidth}
            leftSidebarMinWidth={leftSidebarMinWidth}
            rightSidebarMinWidth={rightSidebarMinWidth}
            leftSidebarMaxWidth={leftSidebarMaxWidth}
            rightSidebarMaxWidth={rightSidebarMaxWidth}
            onLeftSidebarWidthChange={onLeftSidebarWidthChange}
            onRightSidebarWidthChange={onRightSidebarWidthChange}
          >
            <div className={styles.editorMain}>
              <CanvasBase showGrid={showGrid}>
                {/* Background layers render behind everything */}
                {backgroundLayers?.map((layer, index) => (
                  <React.Fragment key={`background-layer-${index}`}>{layer}</React.Fragment>
                ))}

                <ConnectionLayer />
                <NodeLayer doubleClickToEdit={doubleClickToEdit} />

                {/* Overlay layers render on top of everything */}
                {overlayLayers?.map((layer, index) => (
                  <React.Fragment key={`overlay-layer-${index}`}>{layer}</React.Fragment>
                ))}
              </CanvasBase>

              {showStatusBar && <StatusBar autoSave={autoSave} isSaving={isSaving} settingsManager={settingsManager} />}
            </div>
          </ColumnLayout>
        </div>
      </div>
      {/* Loading/Saving indicators */}
      {(isLoading || isSaving) && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingIndicator}>{isLoading ? "Loading..." : "Saving..."}</div>
        </div>
      )}

      {/* Context Menu */}
      <NodeSearchMenu
        position={actionState.contextMenu.position}
        nodeDefinitions={nodeDefinitions}
        onCreateNode={handleCreateNode}
        onClose={() => actionDispatch(actionActions.hideContextMenu())}
        visible={actionState.contextMenu.visible}
      />

      {/* UI Overlay Layers - Fixed position, non-interactive, for UI customization */}
      {uiOverlayLayers && uiOverlayLayers.length > 0 && (
        <div className={styles.uiOverlayContainer}>
          {uiOverlayLayers.map((layer, index) => (
            <React.Fragment key={`ui-overlay-layer-${index}`}>{layer}</React.Fragment>
          ))}
        </div>
      )}
    </NodeEditorBase>
  );
};

NodeEditor.displayName = "NodeEditor";
