import * as React from "react";
import type { InspectorRenderProps } from "../../../types/NodeDefinition";
import { Input } from "../../elements";
import { InspectorLabel, InspectorButton } from "../../inspector/parts";
import { useI18n } from "../../../i18n";
import styles from "../../inspector/InspectorPanel.module.css";

export function GroupInspector({ node, onUpdateNode }: InspectorRenderProps<"group">): React.ReactElement {
  const { t } = useI18n();
  const groupBackground = typeof node.data.groupBackground === "string" ? node.data.groupBackground : "#000000";
  const groupOpacity = typeof (node.data as Record<string, unknown>).groupOpacity === "number" ? (node.data as Record<string, unknown>).groupOpacity as number : 1;
  const handleBackground = (color: string) => onUpdateNode({ data: { ...node.data, groupBackground: color } });
  const handleReset = () => {
    const { groupBackground: _remove, ...rest } = node.data;
    onUpdateNode({ data: rest });
  };

  return (
    <div>
      <h3 className={styles.inspectorSectionTitle}>{t("inspectorGroupAppearanceTitle") || "Appearance"}</h3>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <InspectorLabel>{t("fieldBackground") || "Background"}</InspectorLabel>
        <Input
          id={`node-${node.id}-group-bg`}
          name="groupBackground"
          type="color"
          value={groupBackground}
          onChange={(e) => handleBackground(e.target.value)}
          aria-label="Group background color"
          style={{ width: 40, padding: 0, height: 24 }}
        />
        <InspectorButton onClick={handleReset} aria-label="Reset group background">
          Reset
        </InspectorButton>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 8 }}>
        <InspectorLabel>{t("fieldOpacity") || "Opacity"}</InspectorLabel>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={groupOpacity}
          onChange={(e) => onUpdateNode({ data: { ...node.data, groupOpacity: Number(e.target.value) } })}
        />
        <span style={{ minWidth: 36, textAlign: "right" }}>{Math.round(groupOpacity * 100)}%</span>
      </div>
    </div>
  );
}
