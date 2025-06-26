import React from "react";
import type { NodeRenderProps } from "tanuki-ui/extended/node-editor";
import type { FeaturesNodeDataTypeMap } from "./types";

// Type-safe Custom Card Renderer using enhanced NodeRenderProps
export const CustomCardRenderer: React.FC<NodeRenderProps<"custom-card", FeaturesNodeDataTypeMap>> = ({ node, isSelected }) => {
  // node.data is automatically typed as CustomCardData
  const { title, description, icon, status } = node.data;

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: isSelected ? "#e8f5e9" : "#ffffff",
        boxSizing: "border-box",
        borderRadius: "8px",
        border: isSelected ? "2px solid #4caf50" : "2px solid #e0e0e0",
        boxShadow: isSelected ? "0 4px 8px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.1)",
        fontSize: "13px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ fontSize: "16px" }}>{icon}</div>
        <div style={{ fontWeight: "bold", color: "#333" }}>{title}</div>
      </div>
      <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{description}</div>
      <div
        style={{
          fontSize: "11px",
          color: status === "active" ? "#4caf50" : "#ff9800",
          fontWeight: "bold",
          marginTop: "4px",
        }}
      >
        Status: {status}
      </div>
    </div>
  );
};

// Type-safe Progress Bar Renderer using enhanced NodeRenderProps
export const ProgressBarRenderer: React.FC<NodeRenderProps<"progress-bar", FeaturesNodeDataTypeMap>> = ({ node, isSelected }) => {
  // node.data is automatically typed as ProgressBarData
  const { title, progress } = node.data;
  const progressValue = Math.min(100, Math.max(0, progress));

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: isSelected ? "#f3e5f5" : "#fafafa",
        boxSizing: "border-box",
        borderRadius: "6px",
        border: isSelected ? "2px solid #9c27b0" : "1px solid #ddd",
        fontSize: "13px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold", color: "#333" }}>{title}</div>
      <div style={{ margin: "8px 0" }}>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressValue}%`,
              height: "100%",
              backgroundColor: progressValue >= 100 ? "#4caf50" : "#2196f3",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
      <div style={{ fontSize: "12px", color: "#666", textAlign: "center" }}>{progressValue.toFixed(1)}%</div>
    </div>
  );
};

// Type-safe Code Block Renderer using enhanced NodeRenderProps
export const CodeBlockRenderer: React.FC<NodeRenderProps<"code-block", FeaturesNodeDataTypeMap>> = ({ node, isSelected }) => {
  // node.data is automatically typed as CodeBlockData
  const { title, language, code, output } = node.data;

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#263238" : "#37474f",
        boxSizing: "border-box",
        borderRadius: "4px",
        border: isSelected ? "2px solid #00bcd4" : "1px solid #546e7a",
        fontSize: "11px",
        fontFamily: "monospace",
        color: "#ffffff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ color: "#4fc3f7", fontWeight: "bold", marginBottom: "4px" }}>
        {language || "code"} | {title}
      </div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "4px",
          borderRadius: "2px",
          fontSize: "10px",
          lineHeight: "1.2",
          overflowY: "auto",
          maxHeight: "60px",
        }}
      >
        <code>{code || "// No code"}</code>
      </div>
      {output && (
        <div
          style={{
            fontSize: "10px",
            color: "#81c784",
            marginTop: "4px",
            fontStyle: "italic",
          }}
        >
          → {output}
        </div>
      )}
    </div>
  );
};

// Type-safe Image Gallery Renderer using enhanced NodeRenderProps
export const ImageGalleryRenderer: React.FC<NodeRenderProps<"image-gallery", FeaturesNodeDataTypeMap>> = ({ node, isSelected }) => {
  // node.data is automatically typed as ImageGalleryData
  const { title, images, currentIndex } = node.data;
  const currentImageIndex = currentIndex || 0;
  const currentImage = images[currentImageIndex];

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: isSelected ? "#f8f9fa" : "#ffffff",
        boxSizing: "border-box",
        borderRadius: "8px",
        border: isSelected ? "2px solid #6c757d" : "1px solid #dee2e6",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold", color: "#333", marginBottom: "4px" }}>{title}</div>
      <div
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "4px 0",
          border: "1px dashed #ccc",
        }}
      >
        {currentImage ? (
          <div style={{ fontSize: "24px" }}>{currentImage.emoji || "🖼️"}</div>
        ) : (
          <div style={{ fontSize: "16px", color: "#999" }}>📷</div>
        )}
      </div>
      <div style={{ fontSize: "10px", color: "#666", textAlign: "center" }}>
        {images.length > 0 ? `${currentImageIndex + 1}/${images.length}` : "No images"}
        {currentImage && <div style={{ marginTop: "2px" }}>{currentImage.name}</div>}
      </div>
    </div>
  );
};

// Type-safe Data Visualization Renderer using enhanced NodeRenderProps
export const DataVisualizationRenderer: React.FC<NodeRenderProps<"data-visualization", FeaturesNodeDataTypeMap>> = ({ node, isSelected }) => {
  // node.data is automatically typed as DataVisualizationData
  const { title, chartData } = node.data;
  const maxValue = Math.max(...chartData, 1);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: isSelected ? "#fff3e0" : "#fafafa",
        boxSizing: "border-box",
        borderRadius: "6px",
        border: isSelected ? "2px solid #ff9800" : "1px solid #e0e0e0",
        fontSize: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold", color: "#333", marginBottom: "4px" }}>📊 {title}</div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "end",
          gap: "2px",
          margin: "4px 0",
          minHeight: "40px",
        }}
      >
        {chartData.slice(0, 8).map((value: number, index: number) => (
          <div
            key={index}
            style={{
              flex: 1,
              backgroundColor: "#2196f3",
              height: `${(value / maxValue) * 100}%`,
              minHeight: "4px",
              borderRadius: "1px",
              opacity: 0.8,
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: "10px", color: "#666", textAlign: "center" }}>{chartData.length} data points</div>
    </div>
  );
};
