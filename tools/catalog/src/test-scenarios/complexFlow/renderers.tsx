import React from "react";
import type { NodeRenderProps } from "tanuki-ui/extended/node-editor";
import { Button } from "tanuki-ui";

export const RandomGeneratorRenderer = ({ node, isSelected, onUpdateNode }: NodeRenderProps) => {
  const generateRandomValue = () => {
    const min = node.data.min || 1;
    const max = node.data.max || 100;
    const newValue = Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);
    
    if (onUpdateNode) {
      onUpdateNode({
        data: { ...node.data, value: newValue }
      });
    }
  };

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#e1f5fe" : "#f0f8ff",
        boxSizing: "border-box",
        borderRadius: "4px",
        border: isSelected ? "2px solid #00bcd4" : "1px solid #ccc",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{node.data.title as React.ReactNode}</div>
      <div style={{ fontSize: "16px", color: "#00bcd4", fontWeight: "bold", textAlign: "center" }}>
        {node.data.value as React.ReactNode}
      </div>
      <div style={{ fontSize: "10px", color: "#666" }}>
        Range: {node.data.min as React.ReactNode}-{node.data.max as React.ReactNode}
      </div>
      <Button
        onClick={generateRandomValue}
        style={{ fontSize: "10px", padding: "2px 6px", height: "20px" }}
      >
        🎲 Roll
      </Button>
    </div>
  );
};

export const ConditionRenderer = ({ node, isSelected }: NodeRenderProps) => {
  const conditionLabels: Record<string, string> = {
    greater: ">",
    less: "<",
    equal: "=",
    notEqual: "≠",
    greaterEqual: "≥",
    lessEqual: "≤"
  };

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#fce4ec" : "#fafafa",
        boxSizing: "border-box",
        borderRadius: "4px",
        border: isSelected ? "2px solid #e91e63" : "1px solid #ccc",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{node.data.title as React.ReactNode}</div>
      <div style={{ fontSize: "20px", textAlign: "center", color: "#e91e63", fontWeight: "bold" }}>
        {conditionLabels[node.data.condition as string] || "?"}
      </div>
      <div style={{ fontSize: "10px", color: "#666", textAlign: "center" }}>
        {node.data.condition as React.ReactNode}
      </div>
    </div>
  );
};

export const StringSourceRenderer = ({ node, isSelected }: NodeRenderProps) => {
  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#f3e5f5" : "#fafafa",
        boxSizing: "border-box",
        borderRadius: "4px",
        border: isSelected ? "2px solid #9c27b0" : "1px solid #ccc",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{node.data.title as React.ReactNode}</div>
      <div style={{ fontSize: "11px", color: "#9c27b0", fontWeight: "bold", textAlign: "center" }}>
        "{node.data.value as React.ReactNode}"
      </div>
    </div>
  );
};

export const ChartDisplayRenderer = ({ node, isSelected }: NodeRenderProps) => {
  const data = (Array.isArray(node.data.data) ? node.data.data : []) as unknown[];
  
  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#e8f5e9" : "#fafafa",
        boxSizing: "border-box",
        borderRadius: "4px",
        border: isSelected ? "2px solid #4caf50" : "1px solid #ccc",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{node.data.title as React.ReactNode}</div>
      <div style={{ fontSize: "10px", color: "#666" }}>
        Data points: {data.length}
      </div>
      <div style={{ 
        height: "40px", 
        background: "#e8f5e9", 
        borderRadius: "2px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: "10px",
        color: "#4caf50"
      }}>
        📊 Chart Area
      </div>
    </div>
  );
};