import React from "react";

// Context for sharing calculated values in math flow scenario
export const MathEvaluatorContext = React.createContext<{
  getNodeValue: (nodeId: string) => any;
  triggerEvaluation: () => void;
} | null>(null);

// Hook to use math evaluator context
export const useMathEvaluatorContext = () => {
  const context = React.useContext(MathEvaluatorContext);
  if (!context) {
    throw new Error("useMathEvaluatorContext must be used within MathEvaluatorContext.Provider");
  }
  return context;
};