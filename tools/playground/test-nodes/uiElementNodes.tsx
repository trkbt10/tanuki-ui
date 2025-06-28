import * as React from "react";
import type { NodeDefinition } from "@/extended/node-editor/types/NodeDefinition";

export const createUIElementNodeDefinitions = (
  updateNodeValue: (nodeId: string, value: any) => void,
): NodeDefinition[] => [
  {
    type: "text-input",
    displayName: "Text Input",
    description: "Text input field with validation",
    category: "UI Elements",
    icon: "📝",
    defaultSize: { width: 200, height: 120 },
    defaultData: { 
      title: "Text Input", 
      value: "Sample Text",
      placeholder: "Enter text...",
      multiline: false,
      maxLength: 100
    },
    ports: [
      { id: "input", type: "input", label: "Default", position: "left", dataType: "string" },
      { id: "output", type: "output", label: "Text", position: "right", dataType: "string" }
    ],
    renderNode: ({ node, onUpdateNode }) => {
      const currentValue = (node.data?.value as string) || "";
      const placeholder = (node.data?.placeholder as string) || "Enter text...";
      const multiline = node.data?.multiline as boolean;
      const maxLength = (node.data?.maxLength as number) || 100;

      return (
        <div style={{
          width: "100%", height: "100%", position: "relative",
          border: "1px solid #ccc", borderRadius: "4px", background: "white",
          display: "flex", flexDirection: "column", padding: "8px", gap: "8px"
        }}>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Text Input"}</div>
          {multiline ? (
            <textarea
              value={currentValue}
              placeholder={placeholder}
              maxLength={maxLength}
              onChange={(e) => onUpdateNode({ data: { ...node.data, value: e.target.value } })}
              style={{ 
                flex: 1, resize: "none", border: "1px solid #ddd", borderRadius: "2px", 
                padding: "4px", fontSize: "11px", pointerEvents: "auto"
              }}
            />
          ) : (
            <input
              type="text"
              value={currentValue}
              placeholder={placeholder}
              maxLength={maxLength}
              onChange={(e) => onUpdateNode({ data: { ...node.data, value: e.target.value } })}
              style={{ 
                border: "1px solid #ddd", borderRadius: "2px", padding: "4px", 
                fontSize: "11px", pointerEvents: "auto"
              }}
            />
          )}
          <div style={{ fontSize: "10px", color: "#666" }}>{currentValue.length}/{maxLength}</div>
        </div>
      );
    },
    renderInspector: ({ node, onUpdateNode }) => (
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Title
          </label>
          <input
            type="text"
            value={(node.data?.title as string) || ""}
            onChange={(e) => onUpdateNode({ data: { ...node.data, title: e.target.value } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Placeholder
          </label>
          <input
            type="text"
            value={(node.data?.placeholder as string) || ""}
            onChange={(e) => onUpdateNode({ data: { ...node.data, placeholder: e.target.value } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
            <input
              type="checkbox"
              checked={node.data?.multiline as boolean || false}
              onChange={(e) => onUpdateNode({ data: { ...node.data, multiline: e.target.checked } })}
            />
            Multiline
          </label>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Max Length
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={(node.data?.maxLength as number) || 100}
            onChange={(e) => onUpdateNode({ data: { ...node.data, maxLength: parseInt(e.target.value) } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
      </div>
    )
  },
  {
    type: "button-trigger",
    displayName: "Button Trigger",
    description: "Interactive button with different states",
    category: "UI Elements",
    icon: "🔘",
    interactive: true,
    defaultSize: { width: 160, height: 100 },
    defaultData: { 
      title: "Button Trigger", 
      label: "Click Me",
      variant: "primary",
      disabled: false,
      clickCount: 0
    },
    ports: [
      { id: "trigger", type: "output", label: "Triggered", position: "right", dataType: "boolean" },
      { id: "count", type: "output", label: "Count", position: "right", dataType: "number" }
    ],
    renderNode: ({ node, onUpdateNode }) => {
      const label = (node.data?.label as string) || "Click Me";
      const variant = (node.data?.variant as string) || "primary";
      const disabled = node.data?.disabled as boolean;
      const clickCount = (node.data?.clickCount as number) || 0;

      const getButtonStyle = () => {
        const baseStyle = {
          padding: "8px 16px", border: "none", borderRadius: "4px", 
          cursor: disabled ? "not-allowed" : "pointer", fontSize: "12px",
          fontWeight: "bold", pointerEvents: "auto" as const,
          opacity: disabled ? 0.6 : 1
        };

        switch (variant) {
          case "secondary":
            return { ...baseStyle, background: "#6c757d", color: "white" };
          case "success":
            return { ...baseStyle, background: "#28a745", color: "white" };
          case "danger":
            return { ...baseStyle, background: "#dc3545", color: "white" };
          default:
            return { ...baseStyle, background: "#007bff", color: "white" };
        }
      };

      return (
        <div style={{
          width: "100%", height: "100%", position: "relative",
          border: "1px solid #ccc", borderRadius: "4px", background: "white",
          display: "flex", flexDirection: "column", padding: "8px", gap: "8px"
        }}>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Button Trigger"}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "4px" }}>
            <button
              disabled={disabled}
              onClick={() => {
                const newCount = clickCount + 1;
                onUpdateNode({ data: { ...node.data, clickCount: newCount } });
                updateNodeValue(node.id, { triggered: true, count: newCount });
                setTimeout(() => updateNodeValue(node.id, { triggered: false, count: newCount }), 200);
              }}
              style={getButtonStyle()}
            >
              {label}
            </button>
            <div style={{ fontSize: "10px", color: "#666" }}>Clicks: {clickCount}</div>
          </div>
        </div>
      );
    },
    renderInspector: ({ node, onUpdateNode }) => (
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Button Label
          </label>
          <input
            type="text"
            value={(node.data?.label as string) || ""}
            onChange={(e) => onUpdateNode({ data: { ...node.data, label: e.target.value } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
            Variant
          </label>
          <select
            value={(node.data?.variant as string) || "primary"}
            onChange={(e) => onUpdateNode({ data: { ...node.data, variant: e.target.value } })}
            style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="danger">Danger</option>
          </select>
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
            <input
              type="checkbox"
              checked={node.data?.disabled as boolean || false}
              onChange={(e) => onUpdateNode({ data: { ...node.data, disabled: e.target.checked } })}
            />
            Disabled
          </label>
        </div>
        <div>
          <button
            onClick={() => onUpdateNode({ data: { ...node.data, clickCount: 0 } })}
            style={{ padding: "4px 8px", fontSize: "11px", border: "1px solid #ddd", borderRadius: "2px" }}
          >
            Reset Count
          </button>
        </div>
      </div>
    )
  },
  {
    type: "dropdown-select",
    displayName: "Dropdown Select",
    description: "Dropdown selection with custom options",
    category: "UI Elements",
    icon: "📋",
    defaultSize: { width: 180, height: 120 },
    defaultData: { 
      title: "Dropdown Select",
      options: ["Option 1", "Option 2", "Option 3"],
      selectedValue: "Option 1",
      allowCustom: false
    },
    ports: [
      { id: "options", type: "input", label: "Options", position: "left", dataType: "array" },
      { id: "selected", type: "output", label: "Selected", position: "right", dataType: "string" }
    ],
    renderNode: ({ node, onUpdateNode }) => {
      const options = (node.data?.options as string[]) || ["Option 1", "Option 2", "Option 3"];
      const selectedValue = (node.data?.selectedValue as string) || options[0];
      const allowCustom = node.data?.allowCustom as boolean;

      return (
        <div style={{
          width: "100%", height: "100%", position: "relative",
          border: "1px solid #ccc", borderRadius: "4px", background: "white",
          display: "flex", flexDirection: "column", padding: "8px", gap: "8px"
        }}>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Dropdown Select"}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
            <select
              value={selectedValue}
              onChange={(e) => {
                const newValue = e.target.value;
                onUpdateNode({ data: { ...node.data, selectedValue: newValue } });
                updateNodeValue(node.id, newValue);
              }}
              style={{ 
                padding: "4px", border: "1px solid #ddd", borderRadius: "2px", 
                fontSize: "11px", pointerEvents: "auto"
              }}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {allowCustom && (
              <input
                type="text"
                placeholder="Custom value..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const customValue = (e.target as HTMLInputElement).value;
                    if (customValue && !options.includes(customValue)) {
                      const newOptions = [...options, customValue];
                      onUpdateNode({ 
                        data: { ...node.data, options: newOptions, selectedValue: customValue } 
                      });
                      updateNodeValue(node.id, customValue);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
                style={{ 
                  padding: "4px", border: "1px solid #ddd", borderRadius: "2px", 
                  fontSize: "11px", pointerEvents: "auto"
                }}
              />
            )}
          </div>
        </div>
      );
    },
    renderInspector: ({ node, onUpdateNode }) => {
      const options = (node.data?.options as string[]) || [];
      
      return (
        <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
              Options (one per line)
            </label>
            <textarea
              value={options.join("\n")}
              onChange={(e) => {
                const newOptions = e.target.value.split("\n").filter(opt => opt.trim());
                onUpdateNode({ data: { ...node.data, options: newOptions } });
              }}
              rows={6}
              style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px", resize: "vertical" }}
            />
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
              <input
                type="checkbox"
                checked={node.data?.allowCustom as boolean || false}
                onChange={(e) => onUpdateNode({ data: { ...node.data, allowCustom: e.target.checked } })}
              />
              Allow Custom Values
            </label>
          </div>
        </div>
      );
    }
  },
  {
    type: "checkbox-group",
    displayName: "Checkbox Group",
    description: "Multiple checkbox selection",
    category: "UI Elements",
    icon: "☑️",
    defaultSize: { width: 200, height: 150 },
    defaultData: { 
      title: "Checkbox Group",
      options: ["Feature A", "Feature B", "Feature C"],
      selectedValues: ["Feature A"],
      layout: "vertical"
    },
    ports: [
      { id: "options", type: "input", label: "Options", position: "left", dataType: "array" },
      { id: "selected", type: "output", label: "Selected", position: "right", dataType: "array" }
    ],
    renderNode: ({ node, onUpdateNode }) => {
      const options = (node.data?.options as string[]) || ["Feature A", "Feature B", "Feature C"];
      const selectedValues = (node.data?.selectedValues as string[]) || [];
      const layout = (node.data?.layout as string) || "vertical";

      const handleToggle = (option: string) => {
        const newSelected = selectedValues.includes(option)
          ? selectedValues.filter(v => v !== option)
          : [...selectedValues, option];
        onUpdateNode({ data: { ...node.data, selectedValues: newSelected } });
        updateNodeValue(node.id, newSelected);
      };

      return (
        <div style={{
          width: "100%", height: "100%", position: "relative",
          border: "1px solid #ccc", borderRadius: "4px", background: "white",
          display: "flex", flexDirection: "column", padding: "8px", gap: "8px"
        }}>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>{node.data?.title || "Checkbox Group"}</div>
          <div style={{ 
            flex: 1, display: "flex", 
            flexDirection: layout === "horizontal" ? "row" : "column",
            gap: "4px", flexWrap: "wrap",
            overflowY: "auto"
          }}>
            {options.map((option, index) => (
              <label key={index} style={{ 
                display: "flex", alignItems: "center", gap: "4px", 
                fontSize: "11px", cursor: "pointer", pointerEvents: "auto"
              }}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleToggle(option)}
                  style={{ pointerEvents: "auto" }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
    },
    renderInspector: ({ node, onUpdateNode }) => {
      const options = (node.data?.options as string[]) || [];
      
      return (
        <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
              Options (one per line)
            </label>
            <textarea
              value={options.join("\n")}
              onChange={(e) => {
                const newOptions = e.target.value.split("\n").filter(opt => opt.trim());
                onUpdateNode({ data: { ...node.data, options: newOptions } });
              }}
              rows={6}
              style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px", resize: "vertical" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
              Layout
            </label>
            <select
              value={(node.data?.layout as string) || "vertical"}
              onChange={(e) => onUpdateNode({ data: { ...node.data, layout: e.target.value } })}
              style={{ width: "100%", padding: "4px", border: "1px solid #ddd", borderRadius: "2px" }}
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>
        </div>
      );
    }
  },
];