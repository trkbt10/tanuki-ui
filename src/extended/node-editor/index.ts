/**
 * Node Editor - Main exports
 */
import "./global.css";
// Main component
export { NodeEditor } from "./NodeEditor";
export type { NodeEditorProps } from "./NodeEditor";

// Core types
export type {
  NodeId,
  ConnectionId,
  PortId,
  Position,
  Size,
  Bounds,
  Port,
  Node,
  Connection,
  NodeEditorData,
  Viewport,
  GridSettings,
  DragState,
  ResizeState,
  ResizeHandle,
  ConnectionDragState,
  ContextMenuState,
  EditorSettings,
} from "./types/core";

export type {
  NodeDefinition,
  ExternalDataReference,
  NodeRenderProps,
  InspectorRenderProps,
  ConstraintContext,
  ConstraintViolation,
  ConstraintValidationResult,
  NodeConstraint,
  NodeDataTypeMap,
} from "./types/NodeDefinition";

export {
  createNodeDefinition,
  getTypedNodeData,
  createNodeDataUpdater,
  asOriginalNodeRender,
  asOriginalInspectorRender,
} from "./types/NodeDefinition";

// Context providers (for advanced usage)
export {
  NodeEditorProvider,
  NodeDefinitionProvider,
  ExternalDataProvider,
  InlineEditingProvider,
  EditorActionStateProvider,
  NodeCanvasProvider,
  HistoryProvider,
  KeyboardShortcutProvider,
} from "./contexts";

// Hooks for custom layers and components
export * from "./hooks";

// Layer components
export { Minimap, DebugOverlay, GridToolbox } from "./components/layers";

export type { MinimapProps, DebugOverlayProps, GridToolboxProps } from "./components/layers";

// UI components
export { NodeEditorToolbar } from "./components/elements/Toolbar";
export { FloatingContainer } from "./components/parts/FloatingContainer";
export { ColumnLayout } from "./components/ColumnLayout";
export { InspectorPanel } from "./components/InspectorPanel";
export { NodeInspector } from "./components/NodeInspector";
export type { NodeEditorToolbarProps } from "./components/elements/Toolbar";
export type { FloatingContainerProps } from "./components/parts/FloatingContainer";
export type { ColumnLayoutProps } from "./components/ColumnLayout";
export type { InspectorPanelProps } from "./components/InspectorPanel";
export type { NodeInspectorProps } from "./components/NodeInspector";

// Utilities for custom components
export {
  getNodeBoundingBox,
  createBoundingBox,
  doRectanglesIntersect,
  isRectangleInsideAnother,
  DEFAULT_NODE_SIZE,
} from "./utils/boundingBoxUtils";

export { getDistance, getVector, addVectors, subtractVectors, scaleVector } from "./utils/vectorUtils";

export { calculateNodeDragOffsets, getDraggedNodesBounds } from "./utils/dragUtils";

export { createPortToNodeMap, createParentToChildrenMap, createConnectionLookupMaps, SpatialGrid } from "./utils/lookupUtils";

// Port position utilities
export {
  computeNodePortPositions,
  computeAllPortPositions,
  updatePortPositions,
} from "./utils/computePortPositions";

export type {
  PortPosition,
  NodePortPositions,
  EditorPortPositions,
  PortPositionConfig,
} from "./types/portPosition";

export { DEFAULT_PORT_POSITION_CONFIG } from "./types/portPosition";

// Port position context
export {
  PortPositionProvider,
  usePortPositions,
  usePortPosition,
  useNodePortPositions,
} from "./contexts/PortPositionContext";
export type { PortPositionContextValue, PortPositionProviderProps } from "./contexts/PortPositionContext";

// Settings system
export { SettingsManager, LocalSettingsStorage } from "./settings/SettingsManager";
export { defaultSettings } from "./settings/defaultSettings";
export type {
  SettingDefinition,
  SettingCategory,
  SettingsValues,
  SettingValue,
  SettingsChangeEvent,
  SettingsValidationResult,
  SettingsStorage,
} from "./settings/types";
