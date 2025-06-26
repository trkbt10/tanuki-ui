import React from "react";
import type { NodeRenderProps } from "tanuki-ui/extended/node-editor";
import { useMathEvaluatorContext } from "./context";

export const MathNodeRenderer = ({ node, isSelected }: NodeRenderProps) => {
  const { getNodeValue } = useMathEvaluatorContext();
  const calculatedValue = getNodeValue(node.id);

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#e3f2fd" : "#f5f5f5",
        boxSizing: "border-box",
        borderRadius: "4px",
        border: isSelected ? "2px solid #2196f3" : "1px solid #ccc",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{node.data.title as React.ReactNode}</div>
      <div style={{ fontSize: "10px", color: "#666" }}>
        Operation: {(node.data.operation as string) || "unknown"}
      </div>
      {calculatedValue !== undefined && (
        <div style={{ fontSize: "11px", color: "#007bff", fontWeight: "bold" }}>
          Result: {calculatedValue as React.ReactNode}
        </div>
      )}
    </div>
  );
};

export const DataSourceRenderer = ({ node, isSelected }: NodeRenderProps) => {
  const { getNodeValue } = useMathEvaluatorContext();
  const calculatedValue = getNodeValue(node.id);

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#e8f5e9" : "#f9f9f9",
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
      <div style={{ fontSize: "14px", color: "#333" }}>
        Value: {node.data.value as React.ReactNode}
      </div>
      {calculatedValue !== undefined && calculatedValue !== node.data.value && (
        <div style={{ fontSize: "11px", color: "#4caf50", fontWeight: "bold" }}>
          Calculated: {calculatedValue as React.ReactNode}
        </div>
      )}
    </div>
  );
};

export const DisplayNodeRenderer = ({ node, isSelected }: NodeRenderProps) => {
  const { getNodeValue } = useMathEvaluatorContext();
  const calculatedValue = getNodeValue(node.id);

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#fff3e0" : "#fafafa",
        boxSizing: "border-box",
        borderRadius: "4px",
        border: isSelected ? "2px solid #ff9800" : "1px solid #ccc",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{node.data.title as React.ReactNode}</div>
      <div style={{ fontSize: "13px", color: "#333" }}>
        {calculatedValue !== undefined ? (calculatedValue as React.ReactNode) : ((node.data.text || node.data.value || "No data") as React.ReactNode)}
      </div>
    </div>
  );
};