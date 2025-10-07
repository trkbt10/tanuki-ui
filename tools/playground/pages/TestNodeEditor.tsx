import * as React from "react";
import { NodeEditor } from "@/extended/node-editor/NodeEditor";
import type { NodeEditorData } from "@/extended/node-editor/types/core";
import type { GridLayoutConfig, LayerDefinition } from "@/extended/node-editor/types/panels";
import { NodeCanvas, InspectorPanel, StatusBar } from "@/extended/node-editor";
import { SettingsManager } from "@/extended/node-editor/settings/SettingsManager";
import { defaultSettings } from "@/extended/node-editor/settings/defaultSettings";
import { Minimap, GridToolbox } from "@/extended/node-editor/components/layers";
import { NodeEditorToolbar } from "@/extended/node-editor";
import { useNodeDataFlow } from "../components/NodeDataFlow";
import { createAllTestNodeDefinitions } from "../test-nodes";
const initialData: Partial<NodeEditorData> = {
  nodes: {
    // Original WebGL Demo Nodes
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
    // UI Elements Test Section
    textInput1: {
      id: "textInput1",
      type: "text-input",
      position: { x: 50, y: 400 },
      size: { width: 200, height: 120 },
      data: { title: "User Input", value: "Hello World", placeholder: "Enter message...", multiline: false, maxLength: 50 },
      ports: [
        { id: "input", type: "input", label: "Default", nodeId: "textInput1", position: "left" },
        { id: "output", type: "output", label: "Text", nodeId: "textInput1", position: "right" },
      ],
    },
    buttonTrigger1: {
      id: "buttonTrigger1",
      type: "button-trigger",
      position: { x: 300, y: 400 },
      size: { width: 160, height: 100 },
      data: { title: "Action Button", label: "Process", variant: "success", disabled: false, clickCount: 0 },
      ports: [
        { id: "trigger", type: "output", label: "Triggered", nodeId: "buttonTrigger1", position: "right" },
        { id: "count", type: "output", label: "Count", nodeId: "buttonTrigger1", position: "right" },
      ],
    },
    dropdownSelect1: {
      id: "dropdownSelect1",
      type: "dropdown-select",
      position: { x: 500, y: 400 },
      size: { width: 180, height: 120 },
      data: {
        title: "Data Type",
        options: ["JSON", "XML", "CSV", "Plain Text"],
        selectedValue: "JSON",
        allowCustom: true,
      },
      ports: [
        { id: "options", type: "input", label: "Options", nodeId: "dropdownSelect1", position: "left" },
        { id: "selected", type: "output", label: "Selected", nodeId: "dropdownSelect1", position: "right" },
      ],
    },
    checkboxGroup1: {
      id: "checkboxGroup1",
      type: "checkbox-group",
      position: { x: 50, y: 560 },
      size: { width: 200, height: 150 },
      data: {
        title: "Features",
        options: ["Auto Save", "Dark Mode", "Notifications", "Advanced Mode"],
        selectedValues: ["Auto Save", "Dark Mode"],
        layout: "vertical",
      },
      ports: [
        { id: "options", type: "input", label: "Options", nodeId: "checkboxGroup1", position: "left" },
        { id: "selected", type: "output", label: "Selected", nodeId: "checkboxGroup1", position: "right" },
      ],
    },
    progressBar1: {
      id: "progressBar1",
      type: "progress-bar",
      position: { x: 300, y: 560 },
      size: { width: 200, height: 100 },
      data: {
        title: "Loading Progress",
        value: 75,
        min: 0,
        max: 100,
        showValue: true,
        color: "#2196F3",
        animated: true,
      },
      ports: [
        { id: "value", type: "input", label: "Value", nodeId: "progressBar1", position: "left" },
        { id: "progress", type: "output", label: "Progress", nodeId: "progressBar1", position: "right" },
      ],
    },
    // External Data Integration Test Section
    externalDataLoader1: {
      id: "externalDataLoader1",
      type: "external-data-loader",
      position: { x: 750, y: 400 },
      size: { width: 220, height: 140 },
      data: {
        title: "API Data Loader",
        dataType: "json",
        url: "https://jsonplaceholder.typicode.com/posts/1",
        autoRefresh: false,
        refreshInterval: 5000,
      },
      ports: [
        { id: "trigger", type: "input", label: "Refresh", nodeId: "externalDataLoader1", position: "left" },
        { id: "data", type: "output", label: "Data", nodeId: "externalDataLoader1", position: "right" },
        { id: "loading", type: "output", label: "Loading", nodeId: "externalDataLoader1", position: "right" },
        { id: "error", type: "output", label: "Error", nodeId: "externalDataLoader1", position: "right" },
      ],
    },
    dataTransformer1: {
      id: "dataTransformer1",
      type: "data-transformer",
      position: { x: 1000, y: 400 },
      size: { width: 240, height: 160 },
      data: {
        title: "JSON Processor",
        expression: "{ title: data.title?.toUpperCase(), id: data.id, processed: true }",
        errorHandling: "ignore",
      },
      ports: [
        { id: "input", type: "input", label: "Input Data", nodeId: "dataTransformer1", position: "left" },
        { id: "output", type: "output", label: "Transformed", nodeId: "dataTransformer1", position: "right" },
        { id: "error", type: "output", label: "Error", nodeId: "dataTransformer1", position: "right" },
      ],
    },
    // Additional Feature Test Nodes
    textInput2: {
      id: "textInput2",
      type: "text-input",
      position: { x: 50, y: 750 },
      size: { width: 200, height: 150 },
      data: {
        title: "Multi-line Text",
        value: "This is a\nmulti-line\ntext example",
        placeholder: "Enter notes...",
        multiline: true,
        maxLength: 200,
      },
      ports: [
        { id: "input", type: "input", label: "Default", nodeId: "textInput2", position: "left" },
        { id: "output", type: "output", label: "Text", nodeId: "textInput2", position: "right" },
      ],
    },
    dropdownSelect2: {
      id: "dropdownSelect2",
      type: "dropdown-select",
      position: { x: 300, y: 750 },
      size: { width: 180, height: 120 },
      data: {
        title: "Theme Selector",
        options: ["Light Theme", "Dark Theme", "Auto"],
        selectedValue: "Dark Theme",
        allowCustom: false,
      },
      ports: [
        { id: "options", type: "input", label: "Options", nodeId: "dropdownSelect2", position: "left" },
        { id: "selected", type: "output", label: "Selected", nodeId: "dropdownSelect2", position: "right" },
      ],
    },
    checkboxGroup2: {
      id: "checkboxGroup2",
      type: "checkbox-group",
      position: { x: 520, y: 750 },
      size: { width: 220, height: 120 },
      data: {
        title: "Export Options",
        options: ["Include Headers", "Minify", "Compress"],
        selectedValues: ["Include Headers", "Minify"],
        layout: "horizontal",
      },
      ports: [
        { id: "options", type: "input", label: "Options", nodeId: "checkboxGroup2", position: "left" },
        { id: "selected", type: "output", label: "Selected", nodeId: "checkboxGroup2", position: "right" },
      ],
    },
    buttonTrigger2: {
      id: "buttonTrigger2",
      type: "button-trigger",
      position: { x: 780, y: 750 },
      size: { width: 160, height: 100 },
      data: {
        title: "Export Button",
        label: "Export Data",
        variant: "danger",
        disabled: false,
        clickCount: 0,
      },
      ports: [
        { id: "trigger", type: "output", label: "Triggered", nodeId: "buttonTrigger2", position: "right" },
        { id: "count", type: "output", label: "Count", nodeId: "buttonTrigger2", position: "right" },
      ],
    },
    progressBar2: {
      id: "progressBar2",
      type: "progress-bar",
      position: { x: 980, y: 750 },
      size: { width: 200, height: 100 },
      data: {
        title: "Export Progress",
        value: 0,
        min: 0,
        max: 100,
        showValue: true,
        color: "#FF5722",
        animated: true,
      },
      ports: [
        { id: "value", type: "input", label: "Value", nodeId: "progressBar2", position: "left" },
        { id: "progress", type: "output", label: "Progress", nodeId: "progressBar2", position: "right" },
      ],
    },
    // Math Processing Test Section
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
    // WebGL Demo Connections
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
    // External Data Flow Connections
    dataFlowConn: {
      id: "dataFlowConn",
      fromNodeId: "externalDataLoader1",
      fromPortId: "data",
      toNodeId: "dataTransformer1",
      toPortId: "input",
    },
    // UI Integration Connections
    buttonToProgressConn: {
      id: "buttonToProgressConn",
      fromNodeId: "buttonTrigger1",
      fromPortId: "count",
      toNodeId: "progressBar1",
      toPortId: "value",
    },
    // Additional Feature Test Connections
    exportButtonToProgressConn: {
      id: "exportButtonToProgressConn",
      fromNodeId: "buttonTrigger2",
      fromPortId: "count",
      toNodeId: "progressBar2",
      toPortId: "value",
    },
    checkboxToDropdownConn: {
      id: "checkboxToDropdownConn",
      fromNodeId: "checkboxGroup2",
      fromPortId: "selected",
      toNodeId: "dropdownSelect2",
      toPortId: "options",
    },
  },
};
export const TestNodeEditor: React.FC = () => {
  const [nodeDataState, setNodeDataState] = React.useState<Record<string, any>>({});
  const [editorData, setEditorData] = React.useState<NodeEditorData | null>(null);
  const { getConnectedValue, updateNodeValue, nodeValues } = useNodeDataFlow(editorData);

  // Layout controls
  const [showInspector, setShowInspector] = React.useState(true);

  // Create custom node definitions using the new modular approach
  const customNodeDefinitions = React.useMemo(
    () => createAllTestNodeDefinitions({ getConnectedValue, updateNodeValue }),
    [getConnectedValue, updateNodeValue]
  );
  const [settingsVersion, setSettingsVersion] = React.useState(0);
  const [minimapPosition, setMinimapPosition] = React.useState<"top-left" | "top-right" | "bottom-left" | "bottom-right">(
    "top-right"
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

  // Build grid config and layers separately
  const gridConfig = React.useMemo((): GridLayoutConfig | undefined => {
    // If inspector should be hidden, use canvas-only layout
    if (!showInspector) {
      return {
        areas: [["canvas"]],
        rows: [{ size: "1fr" }],
        columns: [{ size: "1fr" }],
        gap: "0",
      };
    }

    // Inspector is shown - build layout with resizable inspector
    return {
      areas: [
        ["canvas", "inspector"],
        ["statusbar", "statusbar"],
      ],
      rows: [{ size: "1fr" }, { size: "auto" }],
      columns: [{ size: "1fr" }, { size: "300px", resizable: true, minSize: 200, maxSize: 600 }],
      gap: "0",
    };
  }, [showInspector]);

  const gridLayers = React.useMemo((): LayerDefinition[] | undefined => {
    const commonLayers: LayerDefinition[] = [
      {
        id: "canvas",
        component: <NodeCanvas />,
        gridArea: "canvas",
        zIndex: 0,
      },
      ...(settingsManager.getValue("appearance.showMinimap")
        ? [
            {
              id: "minimap",
              component: <Minimap width={200} height={150} position={minimapPosition} />,
              gridArea: "canvas",
              positionMode: "absolute" as const,
              zIndex: 100,
              pointerEvents: false,
            },
          ]
        : []),
      {
        id: "grid-toolbox",
        component: <GridToolbox />,
        gridArea: "canvas",
        positionMode: "absolute" as const,
        zIndex: 101,
        pointerEvents: false,
      },
    ];

    if (!showInspector) {
      return commonLayers;
    }

    // Inspector is shown - add inspector and statusbar layers
    return [
      ...commonLayers,
      {
        id: "inspector",
        component: <InspectorPanel />,
        gridArea: "inspector",
        zIndex: 1,
      },
      {
        id: "statusbar",
        component: <StatusBar />,
        gridArea: "statusbar",
        zIndex: 1,
      },
    ];
  }, [showInspector, settingsManager, settingsVersion, minimapPosition]);

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
        <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #ddd" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Layout Controls</div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <label style={{ fontSize: "12px" }}>
              <input type="checkbox" checked={showInspector} onChange={(e) => setShowInspector(e.target.checked)} />
              Show Inspector (300px)
            </label>
          </div>
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
          settingsManager={settingsManager}
          gridConfig={gridConfig}
          gridLayers={gridLayers}
          nodeDefinitions={customNodeDefinitions}
          includeDefaultDefinitions={true}
        />
      </div>
    </div>
  );
};
