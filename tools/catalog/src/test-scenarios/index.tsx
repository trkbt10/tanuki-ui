// Import all test scenarios
import { simpleTestData, simpleNodeDefinitions } from "./simple";
import { mathFlowTestData, mathFlowNodeDefinitions, MathEvaluatorContext } from "./mathFlow";
import { emptyTestData, emptyNodeDefinitions } from "./empty";
import { complexFlowTestData, complexFlowNodeDefinitions } from "./complexFlow";
import { featuresTestData, featuresNodeDefinitions } from "./features";

// Test data sets
export const testDataSets = {
  simple: simpleTestData,
  mathFlow: mathFlowTestData,
  empty: emptyTestData,
  complexFlow: complexFlowTestData,
  features: featuresTestData,
} as const;

// Node definitions for each scenario
export const scenarioNodeDefinitions = {
  simple: simpleNodeDefinitions,
  mathFlow: mathFlowNodeDefinitions,
  empty: emptyNodeDefinitions,
  complexFlow: complexFlowNodeDefinitions,
  features: featuresNodeDefinitions,
} as const;

// Export context for mathFlow scenario
export { MathEvaluatorContext };

// Export all individual scenarios
export * from "./simple";
export * from "./mathFlow";
export * from "./empty";
export * from "./complexFlow";
export * from "./features";
