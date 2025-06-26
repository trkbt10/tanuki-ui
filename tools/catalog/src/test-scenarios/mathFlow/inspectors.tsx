import React from "react";
import type { InspectorRenderProps } from "tanuki-ui/extended/node-editor";
import { Input, Label, Button } from "tanuki-ui";
import { useMathEvaluatorContext } from "./context";

export const DataSourceInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  const { triggerEvaluation } = useMathEvaluatorContext();

  const handleValueChange = (newValue: number) => {
    onUpdateNode({
      data: { ...node.data, value: newValue }
    });
    triggerEvaluation();
  };

  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Data Source Settings</h3>
      
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
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Value:</Label>
        <Input
          type="number"
          value={(node.data.value as number) || 0}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <Button 
        onClick={triggerEvaluation}
        style={{ width: "100%", fontSize: "12px" }}
      >
        🔄 Recalculate
      </Button>
    </div>
  );
};

export const MathOperationInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  const { triggerEvaluation } = useMathEvaluatorContext();

  const handlePrecisionChange = (precision: number) => {
    onUpdateNode({
      data: { ...node.data, precision }
    });
    triggerEvaluation();
  };

  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Math Operation Settings</h3>
      
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
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Operation:</Label>
        <div style={{ fontSize: "14px", color: "#666", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
          {(node.data.operation as string) || node.type}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Precision (decimal places):</Label>
        <Input
          type="number"
          min="0"
          max="10"
          value={(node.data.precision as number) || 2}
          onChange={(e) => handlePrecisionChange(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      {node.data.result !== undefined && (
        <div style={{ marginBottom: "12px" }}>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Current Result:</Label>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#007bff", padding: "8px", background: "#e3f2fd", borderRadius: "4px" }}>
            {node.data.result as React.ReactNode}
          </div>
        </div>
      )}

      <Button 
        onClick={triggerEvaluation}
        style={{ width: "100%", fontSize: "12px" }}
      >
        🔄 Recalculate
      </Button>
    </div>
  );
};

export const DisplayNodeInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Display Settings</h3>
      
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

      {node.data.calculatedValue !== undefined && (
        <div style={{ marginBottom: "12px" }}>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Current Value:</Label>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#ff9800", padding: "8px", background: "#fff3e0", borderRadius: "4px" }}>
            {node.data.calculatedValue as React.ReactNode}
          </div>
        </div>
      )}

      <div style={{ fontSize: "12px", color: "#666", padding: "8px", background: "#f5f5f5", borderRadius: "4px" }}>
        ℹ️ This node displays values from connected inputs. Connect other nodes to see live updates.
      </div>
    </div>
  );
};