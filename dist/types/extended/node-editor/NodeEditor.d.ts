import { NodeEditorData } from './contexts/NodeEditorContext';
import { NodeDefinition, ExternalDataReference } from './types/NodeDefinition';
import { SettingsManager } from './settings/SettingsManager';
import * as React from "react";
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
}
/**
 * NodeEditor - Main component that integrates all node editor functionality
 * Provides three separate contexts for managing different aspects of the editor
 */
export declare const NodeEditor: {
    <TNodeDataTypeMap = {}>({ initialData, data, onDataChange, onSave, onLoad, className, nodeDefinitions, includeDefaultDefinitions, externalDataRefs, overlayLayers, backgroundLayers, uiOverlayLayers, settingsManager, toolbar, leftSidebar, rightSidebar, leftSidebarInitialWidth, rightSidebarInitialWidth, leftSidebarMinWidth, rightSidebarMinWidth, leftSidebarMaxWidth, rightSidebarMaxWidth, onLeftSidebarWidthChange, onRightSidebarWidthChange, }: NodeEditorProps<TNodeDataTypeMap>): React.JSX.Element;
    displayName: string;
};
