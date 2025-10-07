import * as React from "react";
import { ConnectionView as DefaultConnectionView } from "./components/connection/ConnectionView";
import { PortView as DefaultPortView } from "./components/connection/ports/PortView";
import { NodeView as DefaultNodeView } from "./components/node/NodeView";
import { EditorActionStateProvider } from "./contexts/EditorActionStateContext";
import { ExternalDataProvider } from "./contexts/ExternalDataContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import { InlineEditingProvider } from "./contexts/InlineEditingContext";
import { KeyboardShortcutProvider } from "./contexts/KeyboardShortcutContext";
import { NodeEditorProvider, type NodeEditorData } from "./contexts/node-editor";
import { NodeCanvasProvider } from "./contexts/NodeCanvasContext";
import { NodeDefinitionProvider } from "./contexts/NodeDefinitionContext";
import { RendererProvider } from "./contexts/RendererContext";
import { I18nProvider, type I18nMessages, type Locale } from "./i18n";
import { NodeEditorContent } from "./NodeEditorContent";
import type { SettingsManager } from "./settings/SettingsManager";
import type { ExternalDataReference, NodeDefinition } from "./types/NodeDefinition";
import { type PortPositionBehavior } from "./types/portPosition";
import type { NodeEditorRendererOverrides } from "./types/renderers";

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
  /** Override: show/hide status bar regardless of settings */
  showStatusBar?: boolean;
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
export function NodeEditor<TNodeDataTypeMap = {}>({
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
  showStatusBar,
  historyMaxEntries = 40,
  renderers,
  portPositionBehavior,
}: NodeEditorProps<TNodeDataTypeMap>) {
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
                          showStatusBarOverride={showStatusBar}
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
}
