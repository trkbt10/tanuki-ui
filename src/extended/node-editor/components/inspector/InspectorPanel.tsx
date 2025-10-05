import * as React from "react";
import { useEditorActionState } from "../../contexts/EditorActionStateContext";
import { useNodeEditor } from "../../contexts/node-editor";
import { NodeInspector } from "./NodeInspector";
import { NodeTreeList } from "../layers/NodeTreeList";
import { HistoryPanel } from "./HistoryPanel";
import { TabNav } from "../layout/TabNav";
import { classNames, H4 } from "../elements";
import { PropertySection } from "./parts";
import { GridSettings, GeneralSettings } from "../../settings";
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
        render: () => (
          <>
            <PropertySection title={t("inspectorGridSettings")} bodyClassName={styles.settingsSectionBody}>
              <GridSettings />
            </PropertySection>
            <PropertySection title={t("inspectorGeneralSettings") || "General"} bodyClassName={styles.settingsSectionBody}>
              <GeneralSettings />
            </PropertySection>
          </>
        ),
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
