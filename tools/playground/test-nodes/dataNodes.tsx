import * as React from "react";
import type { NodeDefinition } from "@/extended/node-editor/types/NodeDefinition";

export const createDataNodeDefinitions = (): NodeDefinition[] => [
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
];