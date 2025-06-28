import * as React from "react";
import type { NodeDefinition } from "@/extended/node-editor/types/NodeDefinition";

export const createProgressNodeDefinitions = (
  getConnectedValue: (nodeId: string, portId: string) => any,
): NodeDefinition[] => [
  {
    type: "progress-bar",
    displayName: "Progress Bar",
    description: "Visual progress indicator",
    category: "UI Elements",
    icon: "📊",
    defaultSize: { width: 200, height: 100 },
    defaultData: { 
      title: "Progress Bar",
      value: 50,
      min: 0,
      max: 100,
      showValue: true,
      color: "#4CAF50",
      animated: false
    },
    ports: [
      { id: "value", type: "input", label: "Value", position: "left", dataType: "number" },
      { id: "progress", type: "output", label: "Progress", position: "right", dataType: "number" }
    ],
    renderNode: ({ node }) => {
      const connectedValue = getConnectedValue(node.id, "value");
      const value = connectedValue !== null ? connectedValue : (node.data?.value as number) || 50;
      const min = (node.data?.min as number) || 0;
      const max = (node.data?.max as number) || 100;
      const showValue = node.data?.showValue as boolean;
      const color = (node.data?.color as string) || "#4CAF50";
      const animated = node.data?.animated as boolean;

      const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

      return (
        <div style={{
          width: "100%", height: "100%", position: "relative",
          border: "1px solid #ccc", borderRadius: "4px", background: "white",
          display: "flex", flexDirection: "column", padding: "8px", gap: "8px"
        }}>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Progress Bar"}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
            <div style={{
              width: "100%", height: "20px", backgroundColor: "#f0f0f0", 
              borderRadius: "10px", overflow: "hidden", position: "relative"
            }}>
              <div style={{
                width: `${percentage}%`, height: "100%", backgroundColor: color,
                transition: animated ? "width 0.3s ease" : "none",
                borderRadius: "10px"
              }} />
            </div>
            {showValue && (
              <div style={{ fontSize: "11px", textAlign: "center", fontFamily: "monospace" }}>
                {value.toFixed(1)} / {max} ({percentage.toFixed(1)}%)
              </div>
            )}
          </div>
        </div>
      );
    },
    renderInspector: ({ node, onUpdateNode }) => (
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Min Value
          </label>
          <input
            type="number"
            value={(node.data?.min as number) || 0}
            onChange={(e) => onUpdateNode({ data: { ...node.data, min: parseFloat(e.target.value) } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Max Value
          </label>
          <input
            type="number"
            value={(node.data?.max as number) || 100}
            onChange={(e) => onUpdateNode({ data: { ...node.data, max: parseFloat(e.target.value) } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Color
          </label>
          <input
            type="color"
            value={(node.data?.color as string) || "#4CAF50"}
            onChange={(e) => onUpdateNode({ data: { ...node.data, color: e.target.value } })}
            style={{ width: "100%", height: "30px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
            <input
              type="checkbox"
              checked={node.data?.showValue as boolean || false}
              onChange={(e) => onUpdateNode({ data: { ...node.data, showValue: e.target.checked } })}
            />
            Show Value
          </label>
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
            <input
              type="checkbox"
              checked={node.data?.animated as boolean || false}
              onChange={(e) => onUpdateNode({ data: { ...node.data, animated: e.target.checked } })}
            />
            Animated
          </label>
        </div>
      </div>
    )
  },
];