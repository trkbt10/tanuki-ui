import * as React from "react";
import type { InspectorRenderProps } from "../../types/NodeDefinition";
import type { LabelNodeDataMap, LabelNodeData } from "./types";
import { PropertySection, InspectorInput, InspectorTextarea, InspectorDefinitionList, InspectorDefinitionItem } from "../../components/inspector/parts";
import editorStyles from "../../NodeEditorContent.module.css";
import { useI18n } from "../../i18n";

export function LabelInspectorRenderer({ node, onUpdateNode }: InspectorRenderProps<"label", LabelNodeDataMap>): React.ReactElement {
  const { t } = useI18n();
  const data: LabelNodeData = node.data || {};

  const updateField = (key: "title" | "subtitle" | "caption") => (value: string) => {
    const next: LabelNodeData = { ...data, [key]: value };
    onUpdateNode({ data: next });
  };

  return (
    <>
      <PropertySection title="Label">
        <InspectorDefinitionList>
          <InspectorDefinitionItem label="Title">
            <InspectorInput id="label-title" name="labelTitle" placeholder={t("labelTitlePlaceholder") || "Title"} value={data.title || ""} onChange={(e) => updateField("title")(e.target.value)} />
          </InspectorDefinitionItem>
          <InspectorDefinitionItem label="Subtitle">
            <InspectorInput id="label-subtitle" name="labelSubtitle" placeholder={t("labelSubtitlePlaceholder") || "Subtitle"} value={data.subtitle || ""} onChange={(e) => updateField("subtitle")(e.target.value)} />
          </InspectorDefinitionItem>
          <InspectorDefinitionItem label="Caption">
            <InspectorTextarea id="label-caption" name="labelCaption" placeholder={t("labelCaptionPlaceholder") || "Caption"} value={data.caption || ""} onChange={(e) => updateField("caption")(e.target.value)} />
          </InspectorDefinitionItem>
          <InspectorDefinitionItem label="Alignment">
            <select
              id="label-align"
              className={editorStyles.inspectorInput}
              value={data.align ?? 'center'}
              onChange={(e) => onUpdateNode({ data: { ...data, align: e.target.value as LabelNodeData['align'] } })}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </InspectorDefinitionItem>
          <InspectorDefinitionItem label="Wrap">
            <select
              id="label-wrap"
              value={data.wrap ?? 'normal'}
              onChange={(e) => onUpdateNode({ data: { ...data, wrap: e.target.value as LabelNodeData['wrap'] } })}
              className={editorStyles.inspectorInput}
            >
              <option value="normal">Normal</option>
              <option value="nowrap">No wrap</option>
              <option value="balance">Balance</option>
            </select>
          </InspectorDefinitionItem>
          <InspectorDefinitionItem label="Ellipsis (title)">
            <input
              type="checkbox"
              checked={data.ellipsis === true}
              onChange={(e) => onUpdateNode({ data: { ...data, ellipsis: e.target.checked } })}
            />
          </InspectorDefinitionItem>
          <InspectorDefinitionItem label={t("fieldTextColor") || "Text Color"}>
            <input
              type="color"
              value={typeof data.textColor === 'string' ? data.textColor : '#111111'}
              onChange={(e) => onUpdateNode({ data: { ...data, textColor: e.target.value } })}
              className={editorStyles.inspectorInput}
              style={{ width: 40, padding: 0, height: 24 }}
              aria-label="Label text color"
            />
          </InspectorDefinitionItem>
        </InspectorDefinitionList>
      </PropertySection>
    </>
  );
}

LabelInspectorRenderer.displayName = "LabelInspectorRenderer";
