import * as React from "react";
import type { NodeDefinition } from "@/extended/node-editor/types/NodeDefinition";

export const createDataProcessingNodeDefinitions = (
  getConnectedValue: (nodeId: string, portId: string) => any,
  updateNodeValue: (nodeId: string, value: any) => void,
): NodeDefinition[] => [
  {
    type: "data-transformer",
    displayName: "Data Transformer",
    description: "Transform data using JavaScript expressions",
    category: "Data Processing",
    icon: "🔄",
    defaultSize: { width: 240, height: 160 },
    defaultData: { 
      title: "Data Transformer",
      expression: "data.map(item => ({ ...item, processed: true }))",
      errorHandling: "ignore"
    },
    ports: [
      { id: "input", type: "input", label: "Input Data", position: "left", dataType: "any" },
      { id: "output", type: "output", label: "Transformed", position: "right", dataType: "any" },
      { id: "error", type: "output", label: "Error", position: "right", dataType: "string" }
    ],
    renderNode: ({ node }) => {
      const connectedInput = getConnectedValue(node.id, "input");
      const expression = (node.data?.expression as string) || "";
      const errorHandling = (node.data?.errorHandling as string) || "ignore";

      const [result, setResult] = React.useState<any>(null);
      const [error, setError] = React.useState<string | null>(null);

      React.useEffect(() => {
        if (connectedInput !== null && expression) {
          try {
            const func = new Function("data", `return ${expression}`);
            const transformed = func(connectedInput);
            setResult(transformed);
            setError(null);
            updateNodeValue(node.id, { output: transformed, error: null });
          } catch (err) {
            const errorMessage = err.message;
            setError(errorMessage);
            if (errorHandling === "pass") {
              setResult(connectedInput);
              updateNodeValue(node.id, { output: connectedInput, error: errorMessage });
            } else {
              setResult(null);
              updateNodeValue(node.id, { output: null, error: errorMessage });
            }
          }
        }
      }, [connectedInput, expression, errorHandling]);

      return (
        <div style={{
          width: "100%", height: "100%", position: "relative",
          border: "1px solid #ccc", borderRadius: "4px", background: "white",
          display: "flex", flexDirection: "column", padding: "8px", gap: "6px"
        }}>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Data Transformer"}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", fontSize: "10px" }}>
            <div style={{ backgroundColor: "#f8f9fa", padding: "4px", borderRadius: "2px", fontFamily: "monospace" }}>
              {expression.substring(0, 40)}{expression.length > 40 ? "..." : ""}
            </div>
            {error && (
              <div style={{ color: "#dc3545", fontSize: "9px" }}>
                Error: {error.substring(0, 50)}...
              </div>
            )}
            {result !== null && (
              <div style={{ color: "#28a745", fontSize: "9px" }}>
                Output: {JSON.stringify(result).substring(0, 50)}...
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
            JavaScript Expression
          </label>
          <textarea
            value={(node.data?.expression as string) || ""}
            onChange={(e) => onUpdateNode({ data: { ...node.data, expression: e.target.value } })}
            rows={4}
            placeholder="e.g., data.map(item => ({ ...item, processed: true }))"
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px", fontFamily: "monospace" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Error Handling
          </label>
          <select
            value={(node.data?.errorHandling as string) || "ignore"}
            onChange={(e) => onUpdateNode({ data: { ...node.data, errorHandling: e.target.value } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          >
            <option value="ignore">Ignore (output null)</option>
            <option value="pass">Pass original data</option>
          </select>
        </div>
        <div style={{ fontSize: "11px", color: "#666", padding: "8px", backgroundColor: "#f8f9fa", borderRadius: "2px" }}>
          <strong>Available:</strong> Input data is available as 'data' variable
        </div>
      </div>
    )
  }
];