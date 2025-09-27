import * as React from "react";
import type { InspectorRenderProps } from "../../../types/NodeDefinition";
import { Input } from "../../elements";
import { InspectorLabel, InspectorButton } from "../../parts";

export function GroupInspector({ node, onUpdateNode }: InspectorRenderProps<"group">): React.ReactElement {
  const groupBackground = typeof node.data.groupBackground === "string" ? node.data.groupBackground : "#000000";
  const handleBackground = (color: string) => onUpdateNode({ data: { ...node.data, groupBackground: color } });
  const handleReset = () => {
    const { groupBackground: _remove, ...rest } = node.data;
    onUpdateNode({ data: rest });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <InspectorLabel>Background</InspectorLabel>
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
    </div>
  );
}
