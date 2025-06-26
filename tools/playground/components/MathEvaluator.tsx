import * as React from "react";
import type { NodeEditorData, Node } from "../../src/extended/node-editor/types/core";

interface EvaluationContext {
  editorData: NodeEditorData;
  nodeValues: Map<string, any>;
}

export const useMathEvaluator = (editorData: NodeEditorData | null) => {
  const [calculatedValues, setCalculatedValues] = React.useState<Record<string, any>>({});
  const [evaluationTrigger, setEvaluationTrigger] = React.useState(0);

  // Topological sort to determine evaluation order
  const getEvaluationOrder = React.useCallback((data: NodeEditorData): string[] => {
    const graph = new Map<string, string[]>();
    const inDegree = new Map<string, number>();
    
    // Initialize graph
    Object.keys(data.nodes).forEach(nodeId => {
      graph.set(nodeId, []);
      inDegree.set(nodeId, 0);
    });
    
    // Build dependency graph
    Object.values(data.connections).forEach(conn => {
      const fromNode = conn.fromNodeId;
      const toNode = conn.toNodeId;
      
      if (!graph.get(fromNode)?.includes(toNode)) {
        graph.get(fromNode)?.push(toNode);
        inDegree.set(toNode, (inDegree.get(toNode) || 0) + 1);
      }
    });
    
    // Topological sort using Kahn's algorithm
    const queue: string[] = [];
    const result: string[] = [];
    
    // Find nodes with no dependencies
    inDegree.forEach((degree, nodeId) => {
      if (degree === 0) {
        queue.push(nodeId);
      }
    });
    
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      result.push(nodeId);
      
      graph.get(nodeId)?.forEach(neighbor => {
        const newDegree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, newDegree);
        
        if (newDegree === 0) {
          queue.push(neighbor);
        }
      });
    }
    
    return result;
  }, []);

  // Get input value for a specific port
  const getInputValue = React.useCallback((
    nodeId: string,
    portId: string,
    context: EvaluationContext
  ): any => {
    // Find connection to this input port
    const connection = Object.values(context.editorData.connections).find(
      conn => conn.toNodeId === nodeId && conn.toPortId === portId
    );
    
    if (!connection) {
      return null;
    }
    
    const sourceNode = context.editorData.nodes[connection.fromNodeId];
    if (!sourceNode) {
      return null;
    }
    
    // Get value from calculated values or node data
    const sourceValue = context.nodeValues.get(connection.fromNodeId);
    
    if (sourceValue !== undefined) {
      // Handle different output port types
      if (connection.fromPortId === "output" || connection.fromPortId === "result") {
        return sourceValue;
      }
    }
    
    // Fallback to node data value
    return sourceNode.data.value;
  }, []);

  // Evaluate a single node
  const evaluateNode = React.useCallback((
    node: Node,
    context: EvaluationContext
  ): any => {
    switch (node.type) {
      case "data-source":
      case "random-generator":
        return node.data.value || 0;
        
      case "math-add": {
        const a = getInputValue(node.id, "a", context) || 0;
        const b = getInputValue(node.id, "b", context) || 0;
        const precision = node.data.precision || 2;
        const result = a + b;
        return Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
      }
      
      case "math-multiply": {
        const a = getInputValue(node.id, "a", context) || 0;
        const b = getInputValue(node.id, "b", context) || 0;
        const precision = node.data.precision || 2;
        const result = a * b;
        return Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
      }
      
      case "math-divide": {
        const dividend = getInputValue(node.id, "dividend", context) || 0;
        const divisor = getInputValue(node.id, "divisor", context) || 1;
        const precision = node.data.precision || 2;
        
        if (divisor === 0) {
          return "Error: Division by zero";
        }
        
        const result = dividend / divisor;
        return Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
      }
      
      case "number-to-string": {
        const input = getInputValue(node.id, "input", context);
        return input !== null && input !== undefined ? String(input) : "";
      }
      
      case "string-concat": {
        const a = getInputValue(node.id, "a", context) || "";
        const b = getInputValue(node.id, "b", context) || "";
        const separator = node.data.separator || "";
        return `${a}${separator}${b}`;
      }
      
      case "text-display": {
        const input = getInputValue(node.id, "input", context);
        return input;
      }
      
      case "number-display": {
        const input = getInputValue(node.id, "input", context);
        return input;
      }
      
      case "condition": {
        const a = getInputValue(node.id, "a", context) || 0;
        const b = getInputValue(node.id, "b", context) || 0;
        const condition = node.data.condition || "greater";
        
        switch (condition) {
          case "greater": return a > b;
          case "less": return a < b;
          case "equal": return a === b;
          case "notEqual": return a !== b;
          case "greaterEqual": return a >= b;
          case "lessEqual": return a <= b;
          default: return false;
        }
      }
      
      default:
        return null;
    }
  }, [getInputValue]);

  // Main evaluation function
  const evaluate = React.useCallback(() => {
    if (!editorData) {
      return;
    }
    
    console.log("Evaluating nodes...");
    const evaluationOrder = getEvaluationOrder(editorData);
    const nodeValues = new Map<string, any>();
    const context: EvaluationContext = { editorData, nodeValues };
    
    // Evaluate nodes in topological order
    evaluationOrder.forEach(nodeId => {
      const node = editorData.nodes[nodeId];
      if (node) {
        const value = evaluateNode(node, context);
        nodeValues.set(nodeId, value);
        console.log(`Node ${nodeId} (${node.type}): ${value}`);
      }
    });
    
    // Convert Map to object for state
    const valuesObject: Record<string, any> = {};
    nodeValues.forEach((value, key) => {
      valuesObject[key] = value;
    });
    
    console.log("Final calculated values:", valuesObject);
    setCalculatedValues(valuesObject);
  }, [editorData, evaluateNode, getEvaluationOrder]);

  // Re-evaluate when editor data changes or trigger changes
  React.useEffect(() => {
    evaluate();
  }, [evaluate, evaluationTrigger]);

  // Function to get calculated value for a node
  const getNodeValue = React.useCallback((nodeId: string) => {
    return calculatedValues[nodeId];
  }, [calculatedValues]);

  // Function to manually trigger evaluation
  const triggerEvaluation = React.useCallback(() => {
    setEvaluationTrigger(prev => prev + 1);
  }, []);

  return {
    calculatedValues,
    getNodeValue,
    triggerEvaluation,
  };
};