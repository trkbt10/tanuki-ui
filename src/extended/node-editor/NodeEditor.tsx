import * as React from "react";
import { NodeEditorBase } from "./components/NodeEditorBase";
import { InspectorPanel } from "./components/inspector/InspectorPanel";
import { ColumnLayout } from "./components/ColumnLayout";
import { CanvasBase } from "./components/CanvasBase";
import { NodeLayer } from "./components/node/NodeLayer";
import { ConnectionLayer } from "./components/connection/ConnectionLayer";
import { StatusBar } from "./components/StatusBar";
import { NodeSearchMenu } from "./components/NodeSearchMenu";
import { ContextActionMenu } from "./components/ContextActionMenu";
import { NodeCanvasProvider } from "./contexts/NodeCanvasContext";
import { EditorActionStateProvider } from "./contexts/EditorActionStateContext";
import { KeyboardShortcutProvider } from "./contexts/KeyboardShortcutContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import { InlineEditingProvider } from "./contexts/InlineEditingContext";
import { NodeEditorProvider, useNodeEditor, nodeEditorReducer, type NodeEditorData } from "./contexts/node-editor";
import { NodeDefinitionProvider, useNodeDefinitions, useNodeDefinitionList } from "./contexts/NodeDefinitionContext";
import { ExternalDataProvider } from "./contexts/ExternalDataContext";
import { PortPositionProvider } from "./contexts/PortPositionContext";
import { computeAllPortPositions, computeNodePortPositions } from "./utils/computePortPositions";
import {
  DEFAULT_PORT_POSITION_CONFIG,
  type EditorPortPositions,
  type PortPositionBehavior,
  type PortPositionConfig,
  type PortPositionNode,
} from "./types/portPosition";
import { useEditorActionState } from "./contexts/EditorActionStateContext";
import { useNodeCanvas } from "./contexts/NodeCanvasContext";
import type { NodeDefinition, ExternalDataReference } from "./types/NodeDefinition";
import type { Port as CorePort } from "./types/core";
import type { SettingsManager } from "./settings/SettingsManager";
import { useSettings } from "./hooks/useSettings";
import { classNames } from "./components/elements";
import styles from "./NodeEditor.module.css";
import { I18nProvider, type Locale, type I18nMessages } from "./i18n";
import { countNodesByType, getDisabledNodeTypes, canAddNodeType } from "./utils/nodeTypeLimits";
import { canConnectPorts } from "./utils/connectionValidation";
import { RendererProvider } from "./contexts/RendererContext";
import type { NodeEditorRendererOverrides } from "./types/renderers";
import { NodeView as DefaultNodeView } from "./components/node/NodeView";
import { PortView as DefaultPortView } from "./components/connection/ports/PortView";
import { ConnectionView as DefaultConnectionView } from "./components/connection/ConnectionView";

export interface NodeEditorProps<TNodeDataTypeMap = {}> {
  /** Initial data for uncontrolled mode (like defaultValue) */
  initialData?: Partial<NodeEditorData>;
  /** Data for controlled mode (like value) */
  data?: NodeEditorData;
  onDataChange?: (data: NodeEditorData) => void;
  onSave?: (data: NodeEditorData) => void | Promise<void>;
  onLoad?: () => NodeEditorData | Promise<NodeEditorData>;
  className?: string;
  /** Custom node definitions */
  nodeDefinitions?: NodeDefinition<string, TNodeDataTypeMap>[];
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
  // i18n options
  locale?: Locale;
  fallbackLocale?: Locale;
  messagesOverride?: Partial<Record<Locale, Partial<I18nMessages>>>;
  /** Override: enable/disable auto-save regardless of settings */
  autoSaveEnabled?: boolean;
  /** Override: auto-save interval in seconds */
  autoSaveInterval?: number;
  /** Maximum number of history entries to keep */
  historyMaxEntries?: number;
  /** Renderer overrides for core editor visuals */
  renderers?: NodeEditorRendererOverrides;
  /** Customizes how node ports are positioned and rendered */
  portPositionBehavior?: PortPositionBehavior;
}

/**
 * NodeEditor - Main component that integrates all node editor functionality
 * Provides three separate contexts for managing different aspects of the editor
 */
export const NodeEditor = <TNodeDataTypeMap = {},>({
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
  locale,
  fallbackLocale,
  messagesOverride,
  autoSaveEnabled,
  autoSaveInterval,
  historyMaxEntries = 40,
  renderers,
  portPositionBehavior,
}: NodeEditorProps<TNodeDataTypeMap>) => {
  const mergedRenderers = React.useMemo(
    () => ({
      node: renderers?.node ?? DefaultNodeView,
      port: renderers?.port ?? DefaultPortView,
      connection: renderers?.connection ?? DefaultConnectionView,
    }),
    [renderers]
  );

  return (
    <I18nProvider initialLocale={locale} fallbackLocale={fallbackLocale} messagesOverride={messagesOverride}>
      <RendererProvider renderers={mergedRenderers}>
        <NodeDefinitionProvider<TNodeDataTypeMap> nodeDefinitions={nodeDefinitions} includeDefaults={includeDefaultDefinitions}>
          <ExternalDataProvider refs={externalDataRefs}>
            <NodeEditorProvider
              initialState={initialData}
              controlledData={data}
              onDataChange={onDataChange}
              onSave={onSave}
              onLoad={onLoad}
              settingsManager={settingsManager}
              autoSaveEnabled={autoSaveEnabled}
              autoSaveInterval={autoSaveInterval}
            >
              <EditorActionStateProvider>
                <NodeCanvasProvider>
                  <HistoryProvider maxEntries={historyMaxEntries}>
                    <InlineEditingProvider>
                      <KeyboardShortcutProvider>
                        <NodeEditorContent
                          className={className}
                          overlayLayers={overlayLayers}
                          backgroundLayers={backgroundLayers}
                          uiOverlayLayers={uiOverlayLayers}
                          settingsManager={settingsManager}
                          toolbar={toolbar}
                          autoSaveEnabled={autoSaveEnabled}
                          autoSaveInterval={autoSaveInterval}
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
                          portPositionBehavior={portPositionBehavior}
                        />
                      </KeyboardShortcutProvider>
                    </InlineEditingProvider>
                  </HistoryProvider>
                </NodeCanvasProvider>
              </EditorActionStateProvider>
            </NodeEditorProvider>
          </ExternalDataProvider>
        </NodeDefinitionProvider>
      </RendererProvider>
    </I18nProvider>
  );
};

const NodeEditorContent: React.FC<{
  className?: string;
  overlayLayers?: React.ReactNode[];
  backgroundLayers?: React.ReactNode[];
  uiOverlayLayers?: React.ReactNode[];
  settingsManager?: SettingsManager;
  toolbar?: React.ReactNode;
  autoSaveEnabled?: boolean;
  autoSaveInterval?: number;
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
  portPositionBehavior?: PortPositionBehavior;
}> = ({
  className,
  overlayLayers,
  backgroundLayers,
  uiOverlayLayers,
  settingsManager,
  toolbar,
  autoSaveEnabled,
  autoSaveInterval,
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
  portPositionBehavior,
}) => {
  const { state: editorState, handleSave, dispatch, actions, isLoading, isSaving, getNodePorts } = useNodeEditor();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { utils } = useNodeCanvas();

  const portPositionConfig = React.useMemo<PortPositionConfig>(
    () => ({ ...DEFAULT_PORT_POSITION_CONFIG, ...portPositionBehavior?.config }),
    [portPositionBehavior?.config]
  );

  const computePositionsForNodes = React.useCallback(
    (nodes: PortPositionNode[], previousPositions: EditorPortPositions): EditorPortPositions => {
      const defaultComputeAll = (nodesArg: PortPositionNode[], configArg: PortPositionConfig) =>
        computeAllPortPositions(nodesArg, configArg);

      if (portPositionBehavior?.computeAll) {
        return portPositionBehavior.computeAll({
          nodes,
          previous: previousPositions,
          config: portPositionConfig,
          defaultCompute: defaultComputeAll,
        });
      }

      if (portPositionBehavior?.computeNode) {
        const defaultComputeNode = (nodeArg: PortPositionNode, configArg: PortPositionConfig) =>
          computeNodePortPositions(nodeArg, configArg);

        const result: EditorPortPositions = new Map();
        nodes.forEach((node) => {
          const positions = portPositionBehavior.computeNode!({
            node,
            config: portPositionConfig,
            defaultCompute: defaultComputeNode,
          });

          if (positions.size > 0) {
            result.set(node.id, positions);
          }
        });
        return result;
      }

      return defaultComputeAll(nodes, portPositionConfig);
    },
    [portPositionBehavior, portPositionConfig]
  );

  const nodeDefinitions = useNodeDefinitionList();

  // Count nodes by type for max-per-flow enforcement
  const nodeTypeCounts = React.useMemo(() => countNodesByType(editorState), [editorState]);

  // Determine which node types should be disabled in palette based on maxPerFlow
  const disabledNodeTypes = React.useMemo(() => getDisabledNodeTypes(nodeDefinitions, nodeTypeCounts), [nodeDefinitions, nodeTypeCounts]);

  // Compute port positions whenever nodes change
  const [portPositions, setPortPositions] = React.useState<EditorPortPositions>(() => new Map());

  // Track previous nodes state for change detection
  const prevNodesRef = React.useRef<typeof editorState.nodes>(editorState.nodes);
  const prevBehaviorRef = React.useRef<PortPositionBehavior | undefined>(portPositionBehavior);
  const prevConfigRef = React.useRef<PortPositionConfig>(portPositionConfig);

  React.useEffect(() => {
    if (!editorState.nodes) return;

    const prevNodes = prevNodesRef.current;
    let shouldRecompute = false;

    if (!prevNodes || Object.keys(prevNodes).length !== Object.keys(editorState.nodes).length) {
      shouldRecompute = true;
    } else {
      for (const nodeId in editorState.nodes) {
        const node = editorState.nodes[nodeId];
        const prevNode = prevNodes[nodeId];

        if (
          !prevNode ||
          node.position.x !== prevNode.position.x ||
          node.position.y !== prevNode.position.y ||
          node.size?.width !== prevNode.size?.width ||
          node.size?.height !== prevNode.size?.height
        ) {
          shouldRecompute = true;
          break;
        }
      }
    }

    if (!shouldRecompute) {
      if (prevBehaviorRef.current !== portPositionBehavior) {
        shouldRecompute = true;
      } else if (prevConfigRef.current !== portPositionConfig) {
        shouldRecompute = true;
      }
    }

    if (shouldRecompute) {
      const nodes = Object.values(editorState.nodes).map((node) => ({
        ...node,
        ports: getNodePorts(node.id),
      })) as PortPositionNode[];

      const newPortPositions = computePositionsForNodes(nodes, portPositions);
      setPortPositions(newPortPositions);

      prevNodesRef.current = editorState.nodes;
      prevBehaviorRef.current = portPositionBehavior;
      prevConfigRef.current = portPositionConfig;
    } else {
      prevBehaviorRef.current = portPositionBehavior;
      prevConfigRef.current = portPositionConfig;
    }
  }, [
    editorState.nodes,
    getNodePorts,
    portPositionBehavior,
    portPositionConfig,
    computePositionsForNodes,
    portPositions,
  ]);

  // Use settings hook for clean state management
  const settings = useSettings(settingsManager);
  const {
    showGrid,
    showMinimap,
    showStatusBar,
    theme,
    smoothAnimations,
    doubleClickToEdit,
    fontSize,
    gridSize,
    gridOpacity,
    canvasBackground,
  } = settings;
  const settingsAutoSave = settings.autoSave;
  const settingsAutoSaveInterval = settings.autoSaveInterval;
  const effectiveAutoSave = autoSaveEnabled ?? settingsAutoSave;
  const effectiveAutoSaveInterval = (autoSaveInterval ?? settingsAutoSaveInterval) ?? 30;
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

      // Enforce per-flow maximums if defined
      if (!canAddNodeType(nodeType, nodeDefinitions, nodeTypeCounts)) return;

      // Create new node with definition defaults
      const newNode = {
        id: nodeId,
        type: nodeType,
        position: centeredPosition,
        size: nodeSize,
        data: nodeDefinition.defaultData || { title: nodeDefinition.displayName },
        // Ports are no longer assigned here - they will be inferred from NodeDefinition
      };

      // Add node to editor with the predetermined id
      dispatch(actions.addNodeWithId(newNode));

      // Do not auto-select the new node to avoid unintended adjacent highlighting

      // If creation was triggered from connection drag, try to connect
      const fromPort = actionState.contextMenu.fromPort;
      if (fromPort) {
        const fromNode = editorState.nodes[fromPort.nodeId];
        const fromDef = fromNode ? nodeDefinitions.find((d) => d.type === fromNode.type) : undefined;
        const toDef = nodeDefinition;
        const toPorts = toDef.ports || [];
        const targetPortDef = toPorts.find((p) => {
          if (p.type === fromPort.type) return false;
          const tempPort: CorePort = { id: p.id, type: p.type, label: p.label, nodeId, position: p.position };
          return canConnectPorts(
            fromPort.type === "output" ? fromPort : tempPort,
            fromPort.type === "output" ? tempPort : fromPort,
            fromDef,
            toDef,
            editorState.connections
          );
        });
        if (targetPortDef) {
          const tempPort: CorePort = { id: targetPortDef.id, type: targetPortDef.type, label: targetPortDef.label, nodeId, position: targetPortDef.position };
          const connection =
            fromPort.type === "output"
              ? { fromNodeId: fromPort.nodeId, fromPortId: fromPort.id, toNodeId: nodeId, toPortId: tempPort.id }
              : { fromNodeId: nodeId, fromPortId: tempPort.id, toNodeId: fromPort.nodeId, toPortId: fromPort.id };
          dispatch(actions.addConnection(connection));
        }
      }

      // Hide context menu
      actionDispatch(actionActions.hideContextMenu());
    },
    [nodeDefinitions, dispatch, actions, actionDispatch, actionActions, actionState.contextMenu.canvasPosition, actionState.contextMenu.fromPort, editorState.connections, editorState.nodes, utils]
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
                <PortPositionProvider
                  portPositions={portPositions}
                  behavior={portPositionBehavior}
                  config={portPositionConfig}
                >
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
                </PortPositionProvider>
              </CanvasBase>

              {showStatusBar && <StatusBar autoSave={effectiveAutoSave} isSaving={isSaving} settingsManager={settingsManager} />}
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

      {/* Context Menus */}
      {actionState.contextMenu.visible && actionState.contextMenu.mode === 'search' && (
        <NodeSearchMenu
          position={actionState.contextMenu.position}
          nodeDefinitions={nodeDefinitions}
          disabledNodeTypes={(() => {
            const allowed = actionState.contextMenu.allowedNodeTypes;
            if (!allowed) return disabledNodeTypes;
            const allowedSet = new Set(allowed);
            const flowDisabled = new Set(disabledNodeTypes);
            const extraDisabled = nodeDefinitions
              .map((d) => d.type)
              .filter((t) => !allowedSet.has(t));
            return Array.from(new Set([...Array.from(flowDisabled), ...extraDisabled]));
          })()}
          onCreateNode={handleCreateNode}
          onClose={() => actionDispatch(actionActions.hideContextMenu())}
          visible={true}
        />
      )}

      {actionState.contextMenu.visible && actionState.contextMenu.mode !== 'search' && (
        <ContextActionMenu
          position={actionState.contextMenu.position}
          target={actionState.contextMenu.nodeId ? { type: "node", id: actionState.contextMenu.nodeId } : actionState.contextMenu.connectionId ? { type: "connection", id: actionState.contextMenu.connectionId } : { type: 'canvas' }}
          visible={true}
          onClose={() => actionDispatch(actionActions.hideContextMenu())}
        />
      )}

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
