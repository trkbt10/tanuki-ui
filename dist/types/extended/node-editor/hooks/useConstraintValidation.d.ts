import { Node, NodeId, Connection, Port } from '../types/core';
import { NodeEditorAction } from '../contexts/NodeEditorContext';
import { ConstraintViolation } from '../types/NodeDefinition';
export interface ConstraintValidationHook {
    /** Validate a node operation */
    validateNodeOperation: (node: Node, operation: "create" | "update" | "delete" | "move", allNodes: Record<NodeId, Node>, allConnections: Record<string, Connection>, context?: Record<string, unknown>) => {
        isValid: boolean;
        violations: ConstraintViolation[];
        isBlocking: boolean;
    };
    /** Validate a connection operation */
    validateConnectionOperation: (fromNode: Node, toNode: Node, operation: "connect" | "disconnect", allNodes: Record<NodeId, Node>, allConnections: Record<string, Connection>, context?: Record<string, unknown>) => {
        isValid: boolean;
        violations: ConstraintViolation[];
        isBlocking: boolean;
    };
    /** Check if an action should be allowed */
    canPerformAction: (action: NodeEditorAction, currentState: {
        nodes: Record<NodeId, Node>;
        connections: Record<string, Connection>;
    }) => {
        allowed: boolean;
        violations: ConstraintViolation[];
    };
}
/**
 * Hook for constraint validation
 */
export declare const useConstraintValidation: (getNodePorts?: (nodeId: NodeId) => Port[]) => ConstraintValidationHook;
