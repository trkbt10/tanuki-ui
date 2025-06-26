import React from "react";
import type { InspectorRenderProps } from "tanuki-ui/extended/node-editor";
import { Input, Label, Button, Select } from "tanuki-ui";

export const CustomCardInspector: React.FC<InspectorRenderProps<"custom-card">> = ({ node, onUpdateNode }) => {
  const data = node.data;
  const icons = ["📄", "⚙️", "🔧", "📊", "💡", "🎯", "🚀", "⭐"];
  const statuses = ["active", "inactive", "pending", "completed"];

  return (
    <div>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Custom Card Settings</h3>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={data.title || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, title: e.target.value },
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Description:</Label>
        <Input
          value={data.description || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, description: e.target.value },
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Icon:</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
          {icons.map((icon) => (
            <button
              key={icon}
              onClick={() =>
                onUpdateNode({
                  data: { ...node.data, icon },
                })
              }
              style={{
                padding: "8px",
                border: data.icon === icon ? "2px solid #4caf50" : "1px solid #ddd",
                backgroundColor: data.icon === icon ? "#e8f5e9" : "#fff",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Status:</Label>
        <Select
          value={data.status || "active"}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, status: e.target.value },
            })
          }
          style={{ width: "100%" }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export const ProgressBarInspector: React.FC<InspectorRenderProps<"progress-bar">> = ({ node, onUpdateNode }) => {
  const data = node.data;
  const min = data.min ?? 0;
  const max = data.max ?? 100;
  const progress = data.progress ?? 0;
  const percentage = ((progress - min) / (max - min)) * 100;

  return (
    <div>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Progress Bar Settings</h3>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={data.title || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, title: e.target.value },
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Progress:</Label>
        <Input
          type="number"
          value={progress}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, progress: Number(e.target.value) },
            })
          }
          style={{ width: "100%" }}
        />
        <div
          style={{
            marginTop: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#4caf50",
            textAlign: "center",
          }}
        >
          {percentage.toFixed(1)}%
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Min:</Label>
          <Input
            type="number"
            value={min}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, min: Number(e.target.value) },
              })
            }
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Max:</Label>
          <Input
            type="number"
            value={max}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, max: Number(e.target.value) },
              })
            }
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
          <input
            type="checkbox"
            checked={data.showPercentage ?? true}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, showPercentage: e.target.checked },
              })
            }
            style={{ marginRight: "8px" }}
          />
          Show Percentage Label
        </Label>
      </div>
    </div>
  );
};

export const CodeBlockInspector: React.FC<InspectorRenderProps<"code-block">> = ({ node, onUpdateNode }) => {
  const data = node.data;
  const languages = ["javascript", "typescript", "python", "java", "csharp", "cpp", "html", "css"];
  const themes = ["light", "dark", "monokai", "github"];

  const executeCode = () => {
    try {
      // Simulated code execution
      const simulatedOutput = `Executed ${data.language || "javascript"} code at ${new Date().toLocaleTimeString()}`;
      onUpdateNode({
        data: { ...node.data, output: simulatedOutput },
      });
    } catch (error) {
      onUpdateNode({
        data: { ...node.data, output: `Error: ${error}` },
      });
    }
  };

  return (
    <div>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Code Block Settings</h3>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={data.title || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, title: e.target.value },
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Language:</Label>
          <Select
            value={data.language || "javascript"}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, language: e.target.value },
              })
            }
            style={{ width: "100%" }}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Theme:</Label>
          <Select
            value={data.theme || "light"}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, theme: e.target.value },
              })
            }
            style={{ width: "100%" }}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Code:</Label>
        <textarea
          value={data.code || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, code: e.target.value },
            })
          }
          style={{
            width: "100%",
            height: "100px",
            fontFamily: "monospace",
            fontSize: "12px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </div>

      <Button onClick={executeCode} style={{ width: "100%", marginBottom: "12px" }}>
        ▶️ Execute Code
      </Button>

      {data.output && (
        <div
          style={{
            padding: "8px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
        >
          <strong>Output:</strong>
          <br />
          {data.output}
        </div>
      )}
    </div>
  );
};

export const ImageGalleryInspector: React.FC<InspectorRenderProps<"image-gallery">> = ({ node, onUpdateNode }) => {
  const data = node.data;
  const images = Array.isArray(data.images) ? data.images : [];
  const currentIndex = data.currentIndex ?? 0;

  const addImage = () => {
    const newImage = {
      id: `img${images.length + 1}`,
      emoji: "🖼️",
      name: `Image ${images.length + 1}`,
    };
    onUpdateNode({
      data: { ...node.data, images: [...images, newImage] },
    });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onUpdateNode({
      data: {
        ...node.data,
        images: newImages,
        currentIndex: Math.min(currentIndex, Math.max(0, newImages.length - 1)),
      },
    });
  };

  const updateImage = (index: number, field: string, value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    onUpdateNode({
      data: { ...node.data, images: newImages },
    });
  };

  return (
    <div>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Image Gallery Settings</h3>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={data.title || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, title: e.target.value },
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Images ({images.length}):</Label>
        <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "4px", padding: "8px" }}>
          {images.length === 0 ? (
            <div style={{ color: "#999", textAlign: "center", padding: "16px" }}>No images. Click "Add Image" to start.</div>
          ) : (
            images.map((img, index) => (
              <div
                key={img.id}
                style={{
                  marginBottom: "8px",
                  padding: "8px",
                  backgroundColor: index === currentIndex ? "#e3f2fd" : "#f5f5f5",
                  borderRadius: "4px",
                  border: index === currentIndex ? "2px solid #2196f3" : "1px solid transparent",
                }}
              >
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Input
                    value={img.emoji}
                    onChange={(e) => updateImage(index, "emoji", e.target.value)}
                    style={{ width: "50px", textAlign: "center" }}
                  />
                  <Input value={img.name} onChange={(e) => updateImage(index, "name", e.target.value)} style={{ flex: 1 }} />
                  <Button onClick={() => removeImage(index)} style={{ padding: "4px 8px", fontSize: "12px" }}>
                    ❌
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <Button onClick={addImage} style={{ width: "100%", marginTop: "8px" }}>
          ➕ Add Image
        </Button>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
          <input
            type="checkbox"
            checked={data.autoPlay ?? false}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, autoPlay: e.target.checked },
              })
            }
            style={{ marginRight: "8px" }}
          />
          Auto Play
        </Label>
      </div>

      {data.autoPlay && (
        <div style={{ marginBottom: "12px" }}>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Interval (ms):</Label>
          <Input
            type="number"
            value={data.interval || 3000}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, interval: Number(e.target.value) },
              })
            }
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export const DataVisualizationInspector: React.FC<InspectorRenderProps<"data-visualization">> = ({ node, onUpdateNode }) => {
  const data = node.data;
  const chartData = Array.isArray(data.chartData) ? data.chartData : [];
  const chartTypes = ["bar", "line", "area", "scatter"];
  const colors = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0", "#00bcd4"];

  const addDataPoint = () => {
    const newValue = Math.floor(Math.random() * 100);
    onUpdateNode({
      data: { ...node.data, chartData: [...chartData, newValue] },
    });
  };

  const clearData = () => {
    onUpdateNode({
      data: { ...node.data, chartData: [] },
    });
  };

  const generateRandomData = () => {
    const newData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
    onUpdateNode({
      data: { ...node.data, chartData: newData },
    });
  };

  const updateDataPoint = (index: number, value: number) => {
    const newData = [...chartData];
    newData[index] = value;
    onUpdateNode({
      data: { ...node.data, chartData: newData },
    });
  };

  return (
    <div>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Data Visualization Settings</h3>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Title:</Label>
        <Input
          value={data.title || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, title: e.target.value },
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Chart Type:</Label>
          <Select
            value={data.chartType || "bar"}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, chartType: e.target.value },
              })
            }
            style={{ width: "100%" }}
          >
            {chartTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Color:</Label>
          <Select
            value={data.color || "#4caf50"}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, color: e.target.value },
              })
            }
            style={{ width: "100%" }}
          >
            {colors.map((color) => (
              <option key={color} value={color} style={{ backgroundColor: color, color: "#fff" }}>
                {color}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <Label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Data Points ({chartData.length}):</Label>
        <div
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          {chartData.length === 0 ? (
            <div style={{ color: "#999", textAlign: "center", padding: "16px" }}>
              No data points. Click "Add Point" to start.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
              {chartData.map((value, index) => (
                <Input
                  key={index}
                  type="number"
                  value={value}
                  onChange={(e) => updateDataPoint(index, Number(e.target.value))}
                  style={{ fontSize: "12px", padding: "4px" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        <Button onClick={addDataPoint} style={{ fontSize: "12px" }}>
          ➕ Add Point
        </Button>
        <Button onClick={generateRandomData} style={{ fontSize: "12px" }}>
          🎲 Random
        </Button>
        <Button onClick={clearData} style={{ fontSize: "12px" }}>
          🗑️ Clear
        </Button>
      </div>
    </div>
  );
};
