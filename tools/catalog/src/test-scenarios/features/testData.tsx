import type { NodeEditorData } from "tanuki-ui/extended/node-editor";

export const featuresTestData: NodeEditorData = {
  nodes: {
    // Data sources
    "data-source-1": {
      id: "data-source-1",
      type: "data-source",
      position: { x: 50, y: 100 },
      size: { width: 150, height: 80 },
      data: {
        title: "Progress Value",
        value: 75.5,
        dataType: "number"
      },
    },
    "data-source-2": {
      id: "data-source-2",
      type: "data-source",
      position: { x: 50, y: 220 },
      size: { width: 150, height: 80 },
      data: {
        title: "Status Source",
        value: "active",
        dataType: "string"
      },
    },
    "text-input-1": {
      id: "text-input-1",
      type: "text-input",
      position: { x: 50, y: 340 },
      size: { width: 160, height: 80 },
      data: {
        title: "Code Input",
        text: "const result = Math.random() * 100;"
      },
    },
    "trigger-1": {
      id: "trigger-1",
      type: "trigger-button",
      position: { x: 50, y: 460 },
      size: { width: 120, height: 60 },
      data: {
        title: "Execute",
        buttonText: "Run Code"
      },
    },

    // Custom feature nodes
    "custom-card-1": {
      id: "custom-card-1",
      type: "custom-card",
      position: { x: 300, y: 80 },
      size: { width: 200, height: 120 },
      data: {
        title: "System Status",
        description: "Monitoring system health",
        icon: "⚙️",
        status: "active"
      },
    },
    "progress-bar-1": {
      id: "progress-bar-1",
      type: "progress-bar",
      position: { x: 300, y: 240 },
      size: { width: 180, height: 100 },
      data: {
        title: "Task Progress",
        progress: 75.5
      },
    },
    "code-block-1": {
      id: "code-block-1",
      type: "code-block",
      position: { x: 300, y: 380 },
      size: { width: 220, height: 140 },
      data: {
        title: "Random Generator",
        language: "javascript",
        code: "const result = Math.random() * 100;",
        output: "42.7"
      },
    },
    "image-gallery-1": {
      id: "image-gallery-1",
      type: "image-gallery",
      position: { x: 580, y: 100 },
      size: { width: 160, height: 140 },
      data: {
        title: "UI Mockups",
        images: [
          { id: "img1", emoji: "🖥️", name: "Desktop View" },
          { id: "img2", emoji: "📱", name: "Mobile View" },
          { id: "img3", emoji: "🎨", name: "Design System" },
          { id: "img4", emoji: "📊", name: "Analytics" }
        ],
        currentIndex: 1
      },
    },
    "data-visualization-1": {
      id: "data-visualization-1",
      type: "data-visualization",
      position: { x: 580, y: 280 },
      size: { width: 200, height: 120 },
      data: {
        title: "Performance Metrics",
        chartData: [45, 78, 23, 89, 56, 34, 67, 90, 72, 85]
      },
    },

    // Monitor nodes for debugging
    "monitor-1": {
      id: "monitor-1",
      type: "data-monitor",
      position: { x: 820, y: 160 },
      size: { width: 150, height: 100 },
      data: {
        title: "Status Monitor",
        lastValue: null
      },
    },
    "monitor-2": {
      id: "monitor-2",
      type: "data-monitor",
      position: { x: 820, y: 300 },
      size: { width: 150, height: 100 },
      data: {
        title: "Progress Monitor",
        lastValue: null
      },
    },
  },
  connections: {
    // Status flow
    "conn-1": {
      id: "conn-1",
      fromNodeId: "data-source-2",
      fromPortId: "output",
      toNodeId: "custom-card-1",
      toPortId: "status-input",
    },
    "conn-2": {
      id: "conn-2",
      fromNodeId: "custom-card-1",
      fromPortId: "card-output",
      toNodeId: "monitor-1",
      toPortId: "data-input",
    },

    // Progress flow
    "conn-3": {
      id: "conn-3",
      fromNodeId: "data-source-1",
      fromPortId: "output",
      toNodeId: "progress-bar-1",
      toPortId: "progress-input",
    },
    "conn-4": {
      id: "conn-4",
      fromNodeId: "progress-bar-1",
      fromPortId: "progress-output",
      toNodeId: "monitor-2",
      toPortId: "data-input",
    },

    // Code execution flow
    "conn-5": {
      id: "conn-5",
      fromNodeId: "text-input-1",
      fromPortId: "text-output",
      toNodeId: "code-block-1",
      toPortId: "code-input",
    },
    "conn-6": {
      id: "conn-6",
      fromNodeId: "trigger-1",
      fromPortId: "trigger-output",
      toNodeId: "code-block-1",
      toPortId: "execute-trigger",
    },

    // Data visualization flow
    "conn-7": {
      id: "conn-7",
      fromNodeId: "code-block-1",
      fromPortId: "result-output",
      toNodeId: "data-visualization-1",
      toPortId: "data-input",
    },

    // Gallery control flow
    "conn-8": {
      id: "conn-8",
      fromNodeId: "trigger-1",
      fromPortId: "trigger-output",
      toNodeId: "image-gallery-1",
      toPortId: "next-trigger",
    },

    // Cross-connections for testing complex flows
    "conn-9": {
      id: "conn-9",
      fromNodeId: "data-visualization-1",
      fromPortId: "stats-output",
      toNodeId: "custom-card-1",
      toPortId: "data-input",
    },
    "conn-10": {
      id: "conn-10",
      fromNodeId: "image-gallery-1",
      fromPortId: "current-output",
      toNodeId: "progress-bar-1",
      toPortId: "max-input",
    },
  },
};