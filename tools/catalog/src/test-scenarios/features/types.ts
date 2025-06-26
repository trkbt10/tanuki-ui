// Type-safe node data definitions for the features scenario
export type FeaturesNodeDataTypeMap = {
  "custom-card": {
    title: string;
    description: string;
    icon: string;
    status: "active" | "inactive" | "pending" | "completed";
  };
  "progress-bar": {
    title: string;
    progress: number;
  };
  "code-block": {
    title: string;
    language: string;
    code: string;
    output?: string;
  };
  "image-gallery": {
    title: string;
    images: Array<{
      id: string;
      emoji: string;
      name: string;
    }>;
    currentIndex: number;
  };
  "data-visualization": {
    title: string;
    chartData: number[];
  };
  "data-source": {
    title: string;
    value: any;
    dataType: "number" | "string" | "boolean" | "object" | "array" | "any";
  };
  "trigger-button": {
    title: string;
    buttonText: string;
  };
  "text-input": {
    title: string;
    text: string;
  };
  "data-monitor": {
    title: string;
    lastValue: any;
  };
};

// Individual type exports for backward compatibility
export type CustomCardData = FeaturesNodeDataTypeMap["custom-card"];
export type ProgressBarData = FeaturesNodeDataTypeMap["progress-bar"];
export type CodeBlockData = FeaturesNodeDataTypeMap["code-block"];
export type ImageGalleryData = FeaturesNodeDataTypeMap["image-gallery"];
export type DataVisualizationData = FeaturesNodeDataTypeMap["data-visualization"];
export type DataSourceData = FeaturesNodeDataTypeMap["data-source"];
export type TriggerButtonData = FeaturesNodeDataTypeMap["trigger-button"];
export type TextInputData = FeaturesNodeDataTypeMap["text-input"];
export type DataMonitorData = FeaturesNodeDataTypeMap["data-monitor"];
