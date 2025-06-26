import React from "react";
import type { InspectorRenderProps } from "tanuki-ui/extended/node-editor";
import { Input, Label, Button, Select } from "tanuki-ui";

export const RandomGeneratorInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  const generateRandomValue = () => {
    const min = node.data.min || 1;
    const max = node.data.max || 100;
    const newValue = Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);
    
    onUpdateNode({
      data: { ...node.data, value: newValue }
    });
  };

  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Random Generator Settings</h3>
      
      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={(node.data.title as string) || ""}
          onChange={(e) => onUpdateNode({
            data: { ...node.data, title: e.target.value }
          })}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Min Value:</Label>
          <Input
            type="number"
            value={(node.data.min as number) || 1}
            onChange={(e) => onUpdateNode({
              data: { ...node.data, min: Number(e.target.value) }
            })}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Max Value:</Label>
          <Input
            type="number"
            value={(node.data.max as number) || 100}
            onChange={(e) => onUpdateNode({
              data: { ...node.data, max: Number(e.target.value) }
            })}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Current Value:</Label>
        <div style={{ 
          fontSize: "20px", 
          fontWeight: "bold", 
          color: "#00bcd4", 
          padding: "12px", 
          background: "#e1f5fe", 
          borderRadius: "4px",
          textAlign: "center"
        }}>
          {(node.data.value as number) || 0}
        </div>
      </div>

      <Button 
        onClick={generateRandomValue}
        style={{ width: "100%", fontSize: "14px" }}
      >
        🎲 Generate New Random Value
      </Button>
    </div>
  );
};

export const ConditionInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  const conditionOptions = [
    { value: "greater", label: "Greater than (>)" },
    { value: "less", label: "Less than (<)" },
    { value: "equal", label: "Equal to (=)" },
    { value: "notEqual", label: "Not equal to (≠)" },
    { value: "greaterEqual", label: "Greater or equal (≥)" },
    { value: "lessEqual", label: "Less or equal (≤)" },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Condition Settings</h3>
      
      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={(node.data.title as string) || ""}
          onChange={(e) => onUpdateNode({
            data: { ...node.data, title: e.target.value }
          })}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Condition Type:</Label>
        <Select
          value={(node.data.condition as string) || "greater"}
          onChange={(e) => onUpdateNode({
            data: { ...node.data, condition: e.target.value }
          })}
          style={{ width: "100%" }}
        >
          {conditionOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div style={{ fontSize: "12px", color: "#666", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
        ℹ️ This node compares two input values and outputs the result through either the "true" or "false" port.
      </div>
    </div>
  );
};

export const StringSourceInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>String Source Settings</h3>
      
      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={(node.data.title as string) || ""}
          onChange={(e) => onUpdateNode({
            data: { ...node.data, title: e.target.value }
          })}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>String Value:</Label>
        <Input
          value={(node.data.value as string) || ""}
          onChange={(e) => onUpdateNode({
            data: { ...node.data, value: e.target.value }
          })}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ fontSize: "12px", color: "#666", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
        ℹ️ This node outputs the configured string value. Use it as a constant text source.
      </div>
    </div>
  );
};

export const ChartDisplayInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Chart Display Settings</h3>
      
      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={(node.data.title as string) || ""}
          onChange={(e) => onUpdateNode({
            data: { ...node.data, title: e.target.value }
          })}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Data Points:</Label>
        <div style={{ 
          fontSize: "16px", 
          fontWeight: "bold", 
          color: "#4caf50", 
          padding: "8px", 
          background: "#e8f5e9", 
          borderRadius: "4px" 
        }}>
          {(Array.isArray(node.data.data) ? node.data.data.length : 0)} points
        </div>
      </div>

      <div style={{ fontSize: "12px", color: "#666", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
        ℹ️ This node displays data in chart format. Connect data sources to populate the chart.
      </div>
    </div>
  );
};