import * as React from "react";
import type { NodeDefinition } from "@/extended/node-editor/types/NodeDefinition";
import { WebGLRectangleNode } from "../components/WebGLRectangleNode";

export const createGraphicsNodeDefinitions = (
  getConnectedValue: (nodeId: string, portId: string) => any,
  updateNodeValue: (nodeId: string, value: any) => void,
): NodeDefinition[] => [
  {
    type: "webgl-rectangle",
    displayName: "WebGL Teapot",
    description: "Classic OpenGL Utah teapot",
    category: "Graphics",
    icon: "🫖",
    defaultSize: { width: 200, height: 150 },
    defaultData: { title: "Utah Teapot", color: "#FF6B6B", borderRadius: 1 },
    ports: [
      { id: "color", type: "input", label: "Color", position: "left", dataType: "string" },
      { id: "scale", type: "input", label: "Scale", position: "left", dataType: "number" },
      { id: "output", type: "output", label: "Output", position: "right", dataType: "any" },
    ],
    renderNode: ({ node, isSelected }) => {
      const connectedColor = getConnectedValue(node.id, "color");
      const connectedScale = getConnectedValue(node.id, "scale");

      const color = connectedColor || (node.data?.color as string) || "#2196F3";
      const borderRadius = connectedScale || (node.data?.borderRadius as number) || 1;

      const size = node.size || { width: 200, height: 150 };
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            border: isSelected ? "2px solid #1976D2" : "1px solid #ccc",
            borderRadius: "4px",
            overflow: "hidden",
            background: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "8px",
              background: "rgba(0,0,0,0.05)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {node.data?.title || "Utah Teapot"}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
            }}
          >
            <WebGLRectangleNode width={size.width} height={size.height} color={color} borderRadius={borderRadius} />
          </div>
        </div>
      );
    },
  },
  {
    type: "color-picker",
    displayName: "Color Picker",
    description: "Pick a color value",
    category: "Graphics",
    icon: "🎨",
    defaultSize: { width: 180, height: 100 },
    defaultData: { title: "Color Picker", color: "#FF6B6B" },
    ports: [{ id: "color", type: "output", label: "Color", position: "right", dataType: "string" }],
    renderNode: ({ node }) => {
      const currentColor = (node.data?.color as string) || "#FF6B6B";

      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            display: "flex",
            flexDirection: "column",
            pointerEvents: "none",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Color Picker"}</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => {
                if (node.data) {
                  node.data.color = e.target.value;
                  updateNodeValue(node.id, { ...node.data });
                }
              }}
              style={{ width: "50px", height: "30px", border: "1px solid #ccc", borderRadius: "4px", pointerEvents: "auto" }}
            />
            <span style={{ fontSize: "11px", fontFamily: "monospace" }}>{currentColor}</span>
          </div>
        </div>
      );
    },
  },
  {
    type: "number-slider",
    displayName: "Number Slider",
    description: "Adjust a numeric value",
    category: "Graphics",
    icon: "🎚️",
    interactive: true,
    defaultSize: { width: 180, height: 100 },
    defaultData: { title: "Scale", value: 1, min: 0.1, max: 3 },
    ports: [{ id: "value", type: "output", label: "Value", position: "right", dataType: "number" }],
    renderNode: ({ node }) => {
      const value = (node.data?.value as number) || 1;
      const min = (node.data?.min as number) || 0.1;
      const max = (node.data?.max as number) || 3;

      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Number Slider"}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
            <input
              type="range"
              min={min}
              max={max}
              step={0.1}
              value={value}
              onChange={(e) => {
                if (node.data) {
                  node.data.value = parseFloat(e.target.value);
                  updateNodeValue(node.id, { ...node.data });
                }
              }}
              style={{ width: "100%" }}
            />
            <div style={{ fontSize: "11px", textAlign: "center", fontFamily: "monospace" }}>{value.toFixed(1)}</div>
          </div>
        </div>
      );
    },
  },
];