import React from "react";

interface DepsCheckerOptions {
  enabled?: boolean;
  skipInitialRenders?: number;
  componentName?: string;
}

/**
 * Development hook for tracking prop changes and identifying unnecessary re-renders.
 * Logs detailed information about prop changes after initial stabilization.
 */
export const useDepsChecker = (
  props: { [key: string]: any },
  options: DepsCheckerOptions = {}
) => {
  const {
    enabled = process.env.NODE_ENV === "development",
    skipInitialRenders = 2,
    componentName = "Component",
  } = options;

  const callCount = React.useRef<{ [key: string]: number }>({});
  const previousValues = React.useRef<{ [key: string]: any }>({});

  if (!enabled) {
    return;
  }

  for (const [key, value] of Object.entries(props)) {
    React.useEffect(() => {
      if (typeof callCount.current[key] === "undefined") {
        callCount.current[key] = 0;
        previousValues.current[key] = value;
      }

      callCount.current[key] = callCount.current[key] + 1;

      // Skip initial renders to avoid noise
      if (callCount.current[key] <= skipInitialRenders) {
        previousValues.current[key] = value;
        return;
      }

      const hasChanged = previousValues.current[key] !== value;
      if (hasChanged) {
        const valuePreview = getValuePreview(value);
        const previousPreview = getValuePreview(previousValues.current[key]);
        
        console.group(`🔄 [${componentName}] Prop "${key}" changed (render #${callCount.current[key]})`);
        console.log("Previous:", previousPreview);
        console.log("Current:", valuePreview);
        console.log("Type:", typeof value);
        
        if (typeof value === "function") {
          console.log("⚠️ Function prop changed - consider useCallback");
        } else if (Array.isArray(value)) {
          console.log(`📊 Array length: ${value.length}`);
        } else if (value && typeof value === "object") {
          console.log(`📊 Object keys: ${Object.keys(value).length}`);
        }
        
        console.groupEnd();
        previousValues.current[key] = value;
      }
    }, [key, value]);
  }
};

/**
 * Helper function to create a readable preview of values for logging
 */
function getValuePreview(value: any): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return `"${value.slice(0, 50)}${value.length > 50 ? "..." : ""}"`;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "function") return `[Function: ${value.name || "anonymous"}]`;
  if (Array.isArray(value)) return `[Array(${value.length})]`;
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    return `{${keys.slice(0, 3).join(", ")}${keys.length > 3 ? "..." : ""}}`;
  }
  return String(value).slice(0, 50);
}