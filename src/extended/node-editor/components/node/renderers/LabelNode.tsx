import * as React from "react";
import type { NodeRenderProps, InspectorRenderProps } from "../../../types/NodeDefinition";
import type { LabelNodeDataMap, LabelNodeData } from "../../../types/nodes/label";
import { PropertySection, InspectorLabel, InspectorInput, InspectorTextarea } from "../../inspector/parts";
import editorStyles from "../../../NodeEditor.module.css";
import { useI18n } from "../../../i18n";
import styles from "./LabelNode.module.css";

export function LabelNodeRenderer({ node, onStartEdit }: NodeRenderProps<"label", LabelNodeDataMap>): React.ReactElement {
  const d = node.data;
  const title = typeof d.title === "string" ? d.title : undefined;
  const subtitle = typeof d.subtitle === "string" ? d.subtitle : undefined;
  const caption = typeof d.caption === "string" ? d.caption : undefined;
  const align = d.align === 'left' || d.align === 'center' || d.align === 'right' ? d.align : 'center';
  const wrap = d.wrap === 'nowrap' || d.wrap === 'balance' ? d.wrap : 'normal';
  const ellipsis = d.ellipsis === true;
  const alignClass = align === 'left' ? styles.alignLeft : align === 'right' ? styles.alignRight : styles.alignCenter;
  const textColor = typeof d.textColor === 'string' ? d.textColor : undefined;

  return (
    <div className={styles.labelContainer} onDoubleClick={onStartEdit}>
      <div className={[styles.labelInner, alignClass].join(' ')} style={textColor ? { color: textColor } : undefined}>
        {(title || subtitle) && (
          <hgroup className={styles.labelGroup}>
            {title && (
              <h1
                className={[
                  styles.labelTitle,
                  wrap === 'nowrap' ? styles.nowrap : wrap === 'balance' ? styles.wrapBalance : '',
                  ellipsis ? styles.ellipsis : '',
                ].filter(Boolean).join(' ')}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <small
                className={[
                  styles.labelSubtitle,
                  wrap === 'nowrap' ? styles.nowrap : wrap === 'balance' ? styles.wrapBalance : '',
                ].filter(Boolean).join(' ')}
              >
                {subtitle}
              </small>
            )}
          </hgroup>
        )}
        {caption && (
          <p
            className={[
              styles.labelCaption,
              wrap === 'nowrap' ? styles.nowrap : wrap === 'balance' ? styles.wrapBalance : '',
            ].filter(Boolean).join(' ')}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}

export function LabelNodeInspector({ node, onUpdateNode }: InspectorRenderProps<"label", LabelNodeDataMap>): React.ReactElement {
  const { t } = useI18n();
  const data: LabelNodeData = node.data || {};

  const updateField = (key: "title" | "subtitle" | "caption") => (value: string) => {
    const next: LabelNodeData = { ...data, [key]: value };
    onUpdateNode({ data: next });
  };

  return (
    <>
      <PropertySection title="Label">
        <div style={{ display: "grid", gap: 8 }}>
          <div>
            <InspectorLabel>Title</InspectorLabel>
            <InspectorInput id="label-title" name="labelTitle" placeholder={t("labelTitlePlaceholder") || "Title"} value={data.title || ""} onChange={(e) => updateField("title")(e.target.value)} />
          </div>
          <div>
            <InspectorLabel>Subtitle</InspectorLabel>
            <InspectorInput id="label-subtitle" name="labelSubtitle" placeholder={t("labelSubtitlePlaceholder") || "Subtitle"} value={data.subtitle || ""} onChange={(e) => updateField("subtitle")(e.target.value)} />
          </div>
          <div>
            <InspectorLabel>Caption</InspectorLabel>
            <InspectorTextarea id="label-caption" name="labelCaption" placeholder={t("labelCaptionPlaceholder") || "Caption"} value={data.caption || ""} onChange={(e) => updateField("caption")(e.target.value)} />
          </div>
          <div>
            <InspectorLabel>Alignment</InspectorLabel>
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
          </div>
          <div>
            <InspectorLabel>Wrap</InspectorLabel>
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
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={data.ellipsis === true}
                onChange={(e) => onUpdateNode({ data: { ...data, ellipsis: e.target.checked } })}
              />
              <span>Ellipsis (title)</span>
            </label>
          </div>
          <div>
            <InspectorLabel>{t("fieldTextColor") || "Text Color"}</InspectorLabel>
            <input
              type="color"
              value={typeof data.textColor === 'string' ? data.textColor : '#111111'}
              onChange={(e) => onUpdateNode({ data: { ...data, textColor: e.target.value } })}
              className={editorStyles.inspectorInput}
              style={{ width: 40, padding: 0, height: 24 }}
              aria-label="Label text color"
            />
          </div>
        </div>
      </PropertySection>
    </>
  );
}
