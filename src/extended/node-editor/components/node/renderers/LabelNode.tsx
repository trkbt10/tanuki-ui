import * as React from "react";
import type { NodeRenderProps, InspectorRenderProps } from "../../../types/NodeDefinition";
import type { LabelNodeDataMap, LabelNodeData } from "../../../types/nodes/label";
import type { NodeData } from "../../../types/core";
import { Input, Label as FormLabel, Textarea } from "../../elements";
import { PropertySection } from "../../parts";
import styles from "./LabelNode.module.css";

export function LabelNodeRenderer({ node, onStartEdit }: NodeRenderProps<"label", LabelNodeDataMap>): React.ReactElement {
  const data = node.data as LabelNodeData;
  const title = data?.title;
  const subtitle = data?.subtitle;
  const caption = data?.caption;

  return (
    <div className={styles.labelContainer} onDoubleClick={onStartEdit}>
      <div className={styles.labelInner}>
        {(title || subtitle) && (
          <hgroup className={styles.labelGroup}>
            {title && <h1 className={styles.labelTitle}>{title}</h1>}
            {subtitle && <small className={styles.labelSubtitle}>{subtitle}</small>}
          </hgroup>
        )}
        {caption && <p className={styles.labelCaption}>{caption}</p>}
      </div>
    </div>
  );
}

export function LabelNodeInspector({ node, onUpdateNode }: InspectorRenderProps<"label", LabelNodeDataMap>): React.ReactElement {
  const data = (node.data as LabelNodeData) || {};

  const updateField = (key: "title" | "subtitle" | "caption") => (value: string) => {
    onUpdateNode({ data: { ...data, [key]: value } as NodeData });
  };

  return (
    <>
      <PropertySection title="Label">
        <div style={{ display: "grid", gap: 8 }}>
          <div>
            <FormLabel htmlFor="label-title">Title</FormLabel>
            <Input id="label-title" name="labelTitle" value={data.title || ""} onChange={(e) => updateField("title")(e.target.value)} />
          </div>
          <div>
            <FormLabel htmlFor="label-subtitle">Subtitle</FormLabel>
            <Input id="label-subtitle" name="labelSubtitle" value={data.subtitle || ""} onChange={(e) => updateField("subtitle")(e.target.value)} />
          </div>
          <div>
            <FormLabel htmlFor="label-caption">Caption</FormLabel>
            <Textarea id="label-caption" name="labelCaption" value={data.caption || ""} onChange={(e) => updateField("caption")(e.target.value)} />
          </div>
        </div>
      </PropertySection>
    </>
  );
}
