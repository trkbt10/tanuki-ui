import * as React from "react";
import { NodeEditor } from "../../src/extended/node-editor/NodeEditor";
import type { NodeEditorData } from "../../src/extended/node-editor/types/core";
import type { NodeDefinition } from "../../src/extended/node-editor/types/NodeDefinition";
import { SettingsManager } from "../../src/extended/node-editor/settings/SettingsManager";
import { defaultSettings } from "../../src/extended/node-editor/settings/defaultSettings";
import { Minimap, GridToolbox } from "../../src/extended/node-editor/components/layers";
import { Toolbar } from "../../src/extended/node-editor/components/Toolbar";
import { WebGLRectangleNode } from "../components/WebGLRectangleNode";
import { useNodeDataFlow } from "../components/NodeDataFlow";

// Function to create custom node definitions with data flow
const createCustomNodeDefinitions = (
  getConnectedValue: (nodeId: string, portId: string) => any,
  updateNodeValue: (nodeId: string, value: any) => void,
  nodeDataState: Record<string, any>,
): NodeDefinition[] => [
  {
    type: "math-add",
    displayName: "Add",
    description: "Adds two numbers together",
    category: "Math",
    icon: "➕",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Add", result: 0 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
  },
  {
    type: "math-multiply",
    displayName: "Multiply",
    description: "Multiplies two numbers",
    category: "Math",
    icon: "✖️",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Multiply", result: 0 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
  },
  {
    type: "data-source",
    displayName: "Data Source",
    description: "Provides data input",
    category: "Data",
    icon: "📊",
    defaultSize: { width: 180, height: 100 },
    defaultData: { title: "Data Source", value: "Sample Data" },
    ports: [{ id: "output", type: "output", label: "Data", position: "right", dataType: "any" }],
  },
  {
    type: "filter",
    displayName: "Filter",
    description: "Filters data based on conditions",
    category: "Data",
    icon: "🔍",
    defaultSize: { width: 160, height: 90 },
    defaultData: { title: "Filter", condition: "value > 0" },
    ports: [
      { id: "input", type: "input", label: "Input", position: "left", dataType: "any" },
      { id: "condition", type: "input", label: "Condition", position: "left", dataType: "string" },
      { id: "output", type: "output", label: "Filtered", position: "right", dataType: "any" },
    ],
  },
  {
    type: "ai-model",
    displayName: "AI Model",
    description: "AI processing node",
    category: "AI",
    icon: "🤖",
    defaultSize: { width: 200, height: 120 },
    defaultData: { title: "AI Model", model: "GPT-4", temperature: 0.7 },
    ports: [
      { id: "prompt", type: "input", label: "Prompt", position: "left", dataType: "string" },
      { id: "context", type: "input", label: "Context", position: "left", dataType: "string" },
      { id: "response", type: "output", label: "Response", position: "right", dataType: "string" },
      { id: "tokens", type: "output", label: "Token Count", position: "right", dataType: "number" },
    ],
  },
  {
    type: "webhook",
    displayName: "Webhook",
    description: "HTTP webhook endpoint",
    category: "Network",
    icon: "🌐",
    defaultSize: { width: 170, height: 100 },
    defaultData: { title: "Webhook", url: "https://api.example.com/webhook" },
    ports: [
      { id: "payload", type: "input", label: "Payload", position: "left", dataType: "object" },
      { id: "response", type: "output", label: "Response", position: "right", dataType: "object" },
      { id: "status", type: "output", label: "Status", position: "right", dataType: "number" },
    ],
  },
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
      // Get values from connected nodes or use defaults
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

export const TestNodeEditor: React.FC = () => {
  const [nodeDataState, setNodeDataState] = React.useState<Record<string, any>>({});
  const [editorData, setEditorData] = React.useState<NodeEditorData | null>(null);
  const { getConnectedValue, updateNodeValue, nodeValues } = useNodeDataFlow(editorData);

  // Memoize custom node definitions to prevent unnecessary re-renders
  const customNodeDefinitions = React.useMemo(
    () => createCustomNodeDefinitions(getConnectedValue, updateNodeValue, nodeValues),
    [getConnectedValue, updateNodeValue, nodeValues],
  );
  const [settingsVersion, setSettingsVersion] = React.useState(0);
  const [minimapPosition, setMinimapPosition] = React.useState<"top-left" | "top-right" | "bottom-left" | "bottom-right">(
    "top-right",
  );
  const [testMode, setTestMode] = React.useState<"node-editor" | "panel-system" | "minimal-tab">("node-editor");

  // Initialize settings manager with default settings
  const settingsManager = React.useMemo(() => {
    const manager = new SettingsManager();

    // Register all default settings
    defaultSettings.forEach((setting) => {
      manager.registerSetting(setting);
    });

    // Listen for settings changes to trigger re-render
    manager.on("change", () => {
      setSettingsVersion((prev) => prev + 1);
    });

    return manager;
  }, []);

  // Create UI overlay layers with conditional minimap
  const uiOverlayLayers = React.useMemo(() => {
    const layers = [];

    // Add minimap if enabled in settings
    if (settingsManager.getValue("appearance.showMinimap")) {
      layers.push(<Minimap key="minimap" width={200} height={150} position={minimapPosition} />);
    }

    // Add grid toolbox
    layers.push(<GridToolbox key="grid-toolbox" />);

    return layers;
  }, [settingsManager, settingsVersion, minimapPosition]); // Re-calculate when settings or position change

  const initialData: Partial<NodeEditorData> = {
    nodes: {
      colorPicker: {
        id: "colorPicker",
        type: "color-picker",
        position: { x: 50, y: 100 },
        size: { width: 180, height: 100 },
        data: { title: "Teapot Color", color: "#FF6B6B" },
        ports: [{ id: "color", type: "output", label: "Color", nodeId: "colorPicker", position: "right" }],
      },
      scaleSlider: {
        id: "scaleSlider",
        type: "number-slider",
        position: { x: 50, y: 250 },
        size: { width: 180, height: 100 },
        data: { title: "Teapot Scale", value: 1.5, min: 0.5, max: 3 },
        ports: [{ id: "value", type: "output", label: "Value", nodeId: "scaleSlider", position: "right" }],
      },
      teapot: {
        id: "teapot",
        type: "webgl-rectangle",
        position: { x: 350, y: 150 },
        size: { width: 250, height: 200 },
        data: { title: "Utah Teapot", color: "#FF6B6B", borderRadius: 1.5 },
        ports: [
          { id: "color", type: "input", label: "Color", nodeId: "teapot", position: "left" },
          { id: "scale", type: "input", label: "Scale", nodeId: "teapot", position: "left" },
          { id: "output", type: "output", label: "Output", nodeId: "teapot", position: "right" },
        ],
      },
      mathAdd: {
        id: "mathAdd",
        type: "math-add",
        position: { x: 700, y: 100 },
        size: { width: 150, height: 80 },
        data: { title: "Add", result: 0 },
        ports: [
          { id: "a", type: "input", label: "A", nodeId: "mathAdd", position: "left" },
          { id: "b", type: "input", label: "B", nodeId: "mathAdd", position: "left" },
          { id: "result", type: "output", label: "Result", nodeId: "mathAdd", position: "right" },
        ],
      },
      dataSource: {
        id: "dataSource",
        type: "data-source",
        position: { x: 700, y: 250 },
        size: { width: 180, height: 100 },
        data: { title: "Data Source", value: "OpenGL Demo" },
        ports: [{ id: "output", type: "output", label: "Data", nodeId: "dataSource", position: "right" }],
      },
    },
    connections: {
      colorConn: {
        id: "colorConn",
        fromNodeId: "colorPicker",
        fromPortId: "color",
        toNodeId: "teapot",
        toPortId: "color",
      },
      scaleConn: {
        id: "scaleConn",
        fromNodeId: "scaleSlider",
        fromPortId: "value",
        toNodeId: "teapot",
        toPortId: "scale",
      },
    },
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
        <h1>Node Editor Test</h1>
        {editorData && (
          <div style={{ marginTop: "8px", fontSize: "12px", fontFamily: "monospace" }}>
            Nodes: {Object.keys(editorData.nodes).length}, Connections: {Object.keys(editorData.connections).length}
          </div>
        )}
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Settings: Theme: {settingsManager.getValue("appearance.theme")}, Grid:{" "}
          {settingsManager.getValue("appearance.showGrid") ? "ON" : "OFF"}, Auto Save:{" "}
          {settingsManager.getValue("general.autoSave") ? "ON" : "OFF"}
        </div>
        <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              const currentTheme = settingsManager.getValue("appearance.theme");
              const newTheme = currentTheme === "light" ? "dark" : "light";
              settingsManager.setValue("appearance.theme", newTheme);
            }}
            style={{ fontSize: "12px", padding: "4px 8px" }}
          >
            Toggle Theme
          </button>
          <button
            onClick={() => {
              const current = settingsManager.getValue("appearance.showGrid");
              settingsManager.setValue("appearance.showGrid", !current);
            }}
            style={{ fontSize: "12px", padding: "4px 8px" }}
          >
            Toggle Grid
          </button>
          <button
            onClick={() => {
              const current = settingsManager.getValue("general.autoSave");
              settingsManager.setValue("general.autoSave", !current);
            }}
            style={{ fontSize: "12px", padding: "4px 8px" }}
          >
            Toggle Auto Save
          </button>
          <button
            onClick={() => settingsManager.resetToDefaults()}
            style={{ fontSize: "12px", padding: "4px 8px", backgroundColor: "#f44336", color: "white", border: "none" }}
          >
            Reset to Defaults
          </button>
          <button
            onClick={() => {
              const exportedSettings = settingsManager.export();
              console.log("Exported Settings:", exportedSettings);
              alert("Settings exported to console");
            }}
            style={{ fontSize: "12px", padding: "4px 8px", backgroundColor: "#2196F3", color: "white", border: "none" }}
          >
            Export Settings
          </button>
          <button
            onClick={() => {
              const positions: Array<"top-left" | "top-right" | "bottom-left" | "bottom-right"> = [
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
              ];
              const currentIndex = positions.indexOf(minimapPosition);
              const nextIndex = (currentIndex + 1) % positions.length;
              setMinimapPosition(positions[nextIndex]);
            }}
            style={{ fontSize: "12px", padding: "4px 8px", backgroundColor: "#9C27B0", color: "white", border: "none" }}
          >
            Minimap Position: {minimapPosition}
          </button>
        </div>
        <details style={{ marginTop: "8px" }}>
          <summary style={{ fontSize: "12px", cursor: "pointer" }}>View All Settings ({defaultSettings.length} total)</summary>
          <div
            style={{
              marginTop: "8px",
              fontSize: "11px",
              fontFamily: "monospace",
              backgroundColor: "#f5f5f5",
              padding: "8px",
              maxHeight: "200px",
              overflow: "auto",
            }}
          >
            {settingsManager.getAllCategories().map((category) => (
              <div key={category.key} style={{ marginBottom: "12px" }}>
                <strong>{category.label}:</strong>
                <div style={{ marginLeft: "16px" }}>
                  {settingsManager.getSettingsByCategory(category.key).map((setting) => (
                    <div key={setting.key} style={{ marginBottom: "4px" }}>
                      {setting.label}:{" "}
                      <span style={{ color: "#2196F3" }}>{JSON.stringify(settingsManager.getValue(setting.key))}</span>
                      {setting.description && <span style={{ color: "#666", marginLeft: "8px" }}>({setting.description})</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <NodeEditor
          initialData={initialData}
          onDataChange={setEditorData}
          showInspector={true}
          settingsManager={settingsManager}
          uiOverlayLayers={uiOverlayLayers}
          toolbar={<Toolbar />}
          nodeDefinitions={customNodeDefinitions}
          includeDefaultDefinitions={true}
        />
      </div>
    </div>
  );
};
