import { NodeConstraint, ConstraintContext, ConstraintValidationResult, ConstraintViolation, NodeDefinition } from '../types/NodeDefinition';
import { Node, NodeId, Connection } from '../types/core';
/**
 * Validate all constraints for a node
 */
export declare function validateNodeConstraints(node: Node, nodeDefinition: NodeDefinition, allNodes: Record<NodeId, Node>, allConnections: Record<string, Connection>, operation: ConstraintContext["operation"], context?: Record<string, unknown>): ConstraintValidationResult;
/**
 * Validate constraints for a connection operation
 */
export declare function validateConnectionConstraints(fromNode: Node, toNode: Node, fromNodeDefinition: NodeDefinition, toNodeDefinition: NodeDefinition, allNodes: Record<NodeId, Node>, allConnections: Record<string, Connection>, operation: "connect" | "disconnect", context?: Record<string, unknown>): ConstraintValidationResult;
/**
 * Check if any constraints are blocking
 */
export declare function hasBlockingViolations(violations: ConstraintViolation[], constraints: NodeConstraint[]): boolean;
/**
 * Pre-built constraint factories
 */
export declare const ConstraintFactory: {
    /**
     * Constraint that limits the maximum number of input connections
     */
    maxInputConnections(maxConnections: number): NodeConstraint;
    /**
     * Constraint that requires at least one input connection
     */
    requiresInput(): NodeConstraint;
    /**
     * Constraint that prevents connections to specific node types
     */
    preventConnectionToTypes(forbiddenTypes: string[]): NodeConstraint;
    /**
     * Constraint that limits node placement within a specific area
     */
    boundedPlacement(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): NodeConstraint;
    /**
     * Constraint that requires specific data fields
     */
    requiredDataFields(requiredFields: string[]): NodeConstraint;
};
