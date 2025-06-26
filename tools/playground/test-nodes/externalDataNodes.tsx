import * as React from "react";
import type { NodeDefinition } from "../../../src/extended/node-editor/types/NodeDefinition";

export const createExternalDataNodeDefinitions = (
  updateNodeValue: (nodeId: string, value: any) => void,
): NodeDefinition[] => [
  {
    type: "external-data-loader",
    displayName: "External Data Loader",
    description: "Loads data from external sources",
    category: "External Data",
    icon: "🔄",
    defaultSize: { width: 220, height: 140 },
    defaultData: { 
      title: "External Data Loader",
      dataType: "json",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      autoRefresh: false,
      refreshInterval: 5000
    },
    ports: [
      { id: "trigger", type: "input", label: "Refresh", position: "left", dataType: "boolean" },
      { id: "data", type: "output", label: "Data", position: "right", dataType: "object" },
      { id: "loading", type: "output", label: "Loading", position: "right", dataType: "boolean" },
      { id: "error", type: "output", label: "Error", position: "right", dataType: "string" }
    ],
    loadExternalData: async (ref) => {
      try {
        const response = await fetch(ref.metadata?.url as string || "");
        return await response.json();
      } catch (error) {
        throw new Error(`Failed to load data: ${error.message}`);
      }
    },
    renderNode: ({ node, externalData, isLoadingExternalData, externalDataError, onUpdateNode }) => {
      const [lastRefresh, setLastRefresh] = React.useState<Date | null>(null);
      const autoRefresh = node.data?.autoRefresh as boolean;
      const refreshInterval = (node.data?.refreshInterval as number) || 5000;

      React.useEffect(() => {
        if (autoRefresh && !isLoadingExternalData) {
          const interval = setInterval(() => {
            setLastRefresh(new Date());
          }, refreshInterval);
          return () => clearInterval(interval);
        }
      }, [autoRefresh, refreshInterval, isLoadingExternalData]);

      return (
        <div style={{
          width: "100%", height: "100%", position: "relative",
          border: "1px solid #ccc", borderRadius: "4px", background: "white",
          display: "flex", flexDirection: "column", padding: "8px", gap: "6px"
        }}>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "External Data Loader"}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", fontSize: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ 
                width: "8px", height: "8px", borderRadius: "50%",
                backgroundColor: isLoadingExternalData ? "#FFA500" : externalDataError ? "#FF0000" : "#00AA00"
              }} />
              {isLoadingExternalData ? "Loading..." : externalDataError ? "Error" : "Ready"}
            </div>
            {externalData && (
              <div style={{ fontSize: "9px", color: "#666", overflow: "hidden" }}>
                Data: {JSON.stringify(externalData).substring(0, 50)}...
              </div>
            )}
            {lastRefresh && (
              <div style={{ fontSize: "9px", color: "#666" }}>
                Last: {lastRefresh.toLocaleTimeString()}
              </div>
            )}
            <button
              onClick={() => setLastRefresh(new Date())}
              style={{ 
                padding: "4px 8px", fontSize: "10px", border: "1px solid #ddd", 
                borderRadius: "2px", background: "white", cursor: "pointer", pointerEvents: "auto"
              }}
            >
              Refresh Now
            </button>
          </div>
        </div>
      );
    },
    renderInspector: ({ node, onUpdateNode }) => (
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Data URL
          </label>
          <input
            type="url"
            value={(node.data?.url as string) || ""}
            onChange={(e) => onUpdateNode({ data: { ...node.data, url: e.target.value } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Data Type
          </label>
          <select
            value={(node.data?.dataType as string) || "json"}
            onChange={(e) => onUpdateNode({ data: { ...node.data, dataType: e.target.value } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          >
            <option value="json">JSON</option>
            <option value="text">Text</option>
            <option value="xml">XML</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
            <input
              type="checkbox"
              checked={node.data?.autoRefresh as boolean || false}
              onChange={(e) => onUpdateNode({ data: { ...node.data, autoRefresh: e.target.checked } })}
            />
            Auto Refresh
          </label>
        </div>
        {node.data?.autoRefresh && (
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
              Refresh Interval (ms)
            </label>
            <input
              type="number"
              min="1000"
              step="1000"
              value={(node.data?.refreshInterval as number) || 5000}
              onChange={(e) => onUpdateNode({ data: { ...node.data, refreshInterval: parseInt(e.target.value) } })}
              style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
            />
          </div>
        )}
      </div>
    )
  },
];