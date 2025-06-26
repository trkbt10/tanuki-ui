// Type-safe node data definitions
export interface CustomCardData {
  title: string;
  description: string;
  icon: string;
  status: "active" | "inactive" | "pending" | "completed";
}

export interface ProgressBarData {
  title: string;
  progress: number;
}

export interface CodeBlockData {
  title: string;
  language: string;
  code: string;
  output?: string;
}

export interface ImageGalleryData {
  title: string;
  images: Array<{
    id: string;
    emoji: string;
    name: string;
  }>;
  currentIndex: number;
}

export interface DataVisualizationData {
  title: string;
  chartData: number[];
}

export interface DataSourceData {
  title: string;
  value: any;
  dataType: "number" | "string" | "boolean" | "object" | "array" | "any";
}

export interface TriggerButtonData {
  title: string;
  buttonText: string;
}

export interface TextInputData {
  title: string;
  text: string;
}

export interface DataMonitorData {
  title: string;
  lastValue: any;
}

// Node type to data mapping
export interface NodeDataTypeMap {
  "custom-card": CustomCardData;
  "progress-bar": ProgressBarData;
  "code-block": CodeBlockData;
  "image-gallery": ImageGalleryData;
  "data-visualization": DataVisualizationData;
  "data-source": DataSourceData;
  "trigger-button": TriggerButtonData;
  "text-input": TextInputData;
  "data-monitor": DataMonitorData;
}