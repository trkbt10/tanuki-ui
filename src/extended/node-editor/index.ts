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
export { Toolbar } from "./components/Toolbar";
export { FloatingContainer } from "./components/parts/FloatingContainer";
export { ColumnLayout } from "./components/ColumnLayout";
export { InspectorPanel } from "./components/InspectorPanel";
export type { ToolbarProps } from "./components/Toolbar";
export type { FloatingContainerProps } from "./components/parts/FloatingContainer";
export type { ColumnLayoutProps } from "./components/ColumnLayout";
export type { InspectorPanelProps } from "./components/InspectorPanel";

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
