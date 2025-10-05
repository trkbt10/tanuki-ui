import * as React from "react";
import { useEditorActionState } from "../../contexts/EditorActionStateContext";
import { useNodeEditor } from "../../contexts/node-editor";
import { useNodeCanvas } from "../../contexts/NodeCanvasContext";
import { NodeInspector } from "./NodeInspector";
import { NodeTreeList } from "../NodeTreeList";
import { HistoryPanel } from "./HistoryPanel";
import { TabNav } from "../TabNav";
import { classNames, Input, Label, H4, SwitchInput } from "../elements";
import { PropertySection } from "../parts";
import styles from "./InspectorPanel.module.css";
import { useI18n } from "../../i18n";

export interface InspectorPanelTabConfig {
  id: string;
  label: string;
  render: () => React.ReactNode;
  contentClassName?: string;
}

export interface InspectorPanelProps {
  className?: string;
  tabs?: InspectorPanelTabConfig[];
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({ className, tabs: providedTabs }) => {
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { t } = useI18n();

  const defaultTabs = React.useMemo<InspectorPanelTabConfig[]>(
    () => [
      {
        id: "layers",
        label: t("inspectorTabLayers") || "Layers",
        render: () => <InspectorLayersTab />,
        contentClassName: styles.inspectorContentNoPadding,
      },
      {
        id: "properties",
        label: t("inspectorTabProperties") || "Properties",
        render: () => <InspectorPropertiesTab />,
      },
      {
        id: "settings",
        label: t("inspectorTabSettings") || "Settings",
        render: () => <InspectorSettingsTab />,
      },
    ],
    [t]
  );

  const tabs = providedTabs ?? defaultTabs;
  const rawActiveTabIndex = actionState.inspectorActiveTab ?? 0;
  const boundedActiveTabIndex = tabs.length === 0 ? -1 : Math.min(Math.max(rawActiveTabIndex, 0), tabs.length - 1);

  React.useEffect(() => {
    if (tabs.length === 0) {
      return;
    }
    if (rawActiveTabIndex > tabs.length - 1) {
      actionDispatch(actionActions.setInspectorActiveTab(Math.max(tabs.length - 1, 0)));
    }
  }, [tabs.length, rawActiveTabIndex, actionDispatch, actionActions]);

  const setActiveTabIndex = React.useCallback(
    (index: number) => {
      actionDispatch(actionActions.setInspectorActiveTab(index));
    },
    [actionDispatch, actionActions]
  );

  const activeTab = boundedActiveTabIndex >= 0 ? tabs[boundedActiveTabIndex] : undefined;

  return (
    <div className={classNames(styles.inspectorPanel, className)}>
      {tabs.length > 0 && (
        <div className={styles.inspectorHeader}>
          <TabNav tabs={tabs.map((tab) => tab.label)} activeTabIndex={boundedActiveTabIndex} onTabChange={setActiveTabIndex} />
        </div>
      )}

      <div className={classNames(styles.inspectorContent, activeTab?.contentClassName)}>
        {activeTab ? activeTab.render() : null}
      </div>
    </div>
  );
};

InspectorPanel.displayName = "InspectorPanel";

export const InspectorLayersTab: React.FC = () => {
  return <NodeTreeList />;
};

export const InspectorPropertiesTab: React.FC = () => {
  const { state: nodeEditorState } = useNodeEditor();
  const { state: actionState } = useEditorActionState();
  const { t } = useI18n();

  const selectedNode = actionState.selectedNodeIds.length > 0 ? nodeEditorState.nodes[actionState.selectedNodeIds[0]] : null;

  const selectedConnection =
    actionState.selectedConnectionIds.length > 0 ? nodeEditorState.connections[actionState.selectedConnectionIds[0]] : null;

  return (
    <>
      {selectedNode && (
        <div className={styles.inspectorSection}>
          <NodeInspector node={selectedNode} />
        </div>
      )}

      {selectedConnection && (
        <div className={styles.inspectorSection}>
          <H4 className={styles.inspectorSectionTitle}>{t("inspectorConnectionProperties")}</H4>
          <div className={styles.inspectorField}>
            <label>From:</label>
            <span className={styles.inspectorReadOnlyField}>
              {(nodeEditorState.nodes[selectedConnection.fromNodeId]?.data.title?.trim()?.length ?? 0) > 0
                ? nodeEditorState.nodes[selectedConnection.fromNodeId]?.data.title
                : t("untitled")}
              .{selectedConnection.fromPortId}
            </span>
          </div>
          <div className={styles.inspectorField}>
            <label>To:</label>
            <span className={styles.inspectorReadOnlyField}>
              {(nodeEditorState.nodes[selectedConnection.toNodeId]?.data.title?.trim()?.length ?? 0) > 0
                ? nodeEditorState.nodes[selectedConnection.toNodeId]?.data.title
                : t("untitled")}
              .{selectedConnection.toPortId}
            </span>
          </div>
        </div>
      )}

      {!selectedNode && !selectedConnection && (
        <div className={styles.inspectorEmptyState}>
          <p>{t("inspectorEmptyStatePrompt")}</p>
        </div>
      )}

      {actionState.selectedNodeIds.length > 1 && (
        <div className={styles.inspectorSection}>
          <H4>{t("inspectorMultipleSelection")}</H4>
          <p>{actionState.selectedNodeIds.length} nodes selected</p>
        </div>
      )}
    </>
  );
};

export const InspectorHistoryTab: React.FC = () => {
  return <HistoryPanel />;
};

export const InspectorSettingsTab: React.FC = () => {
  const { state: canvasState, dispatch: canvasDispatch, actions: canvasActions } = useNodeCanvas();
  const { settings, settingsManager, updateSetting } = useNodeEditor();
  const { t } = useI18n();
  const [autoSaveIntervalInput, setAutoSaveIntervalInput] = React.useState<string>(() =>
    String(settings.autoSaveInterval ?? 30)
  );

  React.useEffect(() => {
    setAutoSaveIntervalInput(String(settings.autoSaveInterval ?? 30));
  }, [settings.autoSaveInterval]);

  const handleAutoSaveToggle = React.useCallback(
    (enabled: boolean) => {
      updateSetting("general.autoSave", enabled);
    },
    [updateSetting]
  );

  const handleAutoSaveIntervalChange = React.useCallback((value: string) => {
    setAutoSaveIntervalInput(value);
  }, []);

  const handleAutoSaveIntervalBlur = React.useCallback(() => {
    const interval = parseInt(autoSaveIntervalInput, 10);
    if (!Number.isNaN(interval) && interval >= 5 && interval <= 3600) {
      updateSetting("general.autoSaveInterval", interval);
    } else {
      setAutoSaveIntervalInput(String(settings.autoSaveInterval ?? 30));
    }
  }, [autoSaveIntervalInput, settings.autoSaveInterval, updateSetting]);

  const settingsWritable = Boolean(settingsManager);

  return (
    <>
      <PropertySection title={t("inspectorGridSettings")} bodyClassName={styles.settingsSectionBody}>
        <div className={styles.settingsField}>
          <SwitchInput
            id="grid-show"
            checked={canvasState.gridSettings.showGrid}
            onChange={(checked) => canvasDispatch(canvasActions.updateGridSettings({ showGrid: checked }))}
            label={t("inspectorShowGrid")}
            size="medium"
          />
        </div>
        <div className={styles.settingsField}>
          <SwitchInput
            id="grid-snap"
            checked={canvasState.gridSettings.snapToGrid}
            onChange={(checked) => canvasDispatch(canvasActions.updateGridSettings({ snapToGrid: checked }))}
            label={t("inspectorSnapToGrid")}
            size="medium"
          />
        </div>
        <div className={styles.settingsField}>
          <Label htmlFor="grid-size">
            {t("inspectorGridSize")}:
            <Input
              id="grid-size"
              name="gridSize"
              type="number"
              className={styles.inspectorInput}
              value={canvasState.gridSettings.size}
              min={10}
              max={100}
              step={5}
              onChange={(e) => {
                const size = parseInt(e.target.value, 10);
                if (!isNaN(size) && size > 0) {
                  canvasDispatch(
                    canvasActions.updateGridSettings({
                      size,
                    })
                  );
                }
              }}
              aria-label="Grid size in pixels"
            />
          </Label>
        </div>
        <div className={styles.settingsField}>
          <Label htmlFor="snap-threshold">
            {t("inspectorSnapThreshold")}:
            <Input
              id="snap-threshold"
              name="snapThreshold"
              type="number"
              className={styles.inspectorInput}
              value={canvasState.gridSettings.snapThreshold}
              min={1}
              max={20}
              step={1}
              onChange={(e) => {
                const snapThreshold = parseInt(e.target.value, 10);
                if (!isNaN(snapThreshold) && snapThreshold > 0) {
                  canvasDispatch(
                    canvasActions.updateGridSettings({
                      snapThreshold,
                    })
                  );
                }
              }}
              aria-label="Snap threshold in pixels"
            />
          </Label>
        </div>
      </PropertySection>

      <PropertySection title={t("inspectorGeneralSettings") || "General"} bodyClassName={styles.settingsSectionBody}>
        <div className={styles.settingsField}>
          <SwitchInput
            id="auto-save"
            checked={settings.autoSave}
            onChange={handleAutoSaveToggle}
            label={t("inspectorAutoSave")}
            size="medium"
            disabled={!settingsWritable}
          />
        </div>
        <div className={styles.settingsField}>
          <Label htmlFor="auto-save-interval">
            {t("inspectorAutoSaveInterval")}
            <Input
              id="auto-save-interval"
              name="autoSaveInterval"
              type="number"
              className={styles.inspectorInput}
              value={autoSaveIntervalInput}
              min={5}
              max={3600}
              step={5}
              onChange={(e) => handleAutoSaveIntervalChange(e.target.value)}
              onBlur={handleAutoSaveIntervalBlur}
              disabled={!settingsWritable}
              aria-label="Auto-save interval in seconds"
            />
          </Label>
        </div>
      </PropertySection>
    </>
  );
};
