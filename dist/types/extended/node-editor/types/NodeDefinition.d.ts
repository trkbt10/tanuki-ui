import { ReactNode, ReactElement } from 'react';
import { Node, NodeId, Port, Connection } from './core';
/**
 * Base node data type map interface
 * This can be extended through generic parameters instead of module augmentation
 * @example
 * // Instead of module augmentation, use as generic parameter:
 * type MyNodeTypes = {
 *   'my-custom-node': { title: string; value: number; };
 * };
 * // Then use with NodeDefinitionProvider<MyNodeTypes>
 */
export interface NodeDataTypeMap {
}
/**
 * External data reference for nodes
 * Supports both synchronous and asynchronous data loading
 */
export interface ExternalDataReference {
    /** Unique identifier for the external data */
    id: string;
    /** Type of the external data (e.g., "section", "plot", "layer") */
    type: string;
    /** Optional version for optimistic locking */
    version?: number;
    /** Optional metadata */
    metadata?: Record<string, unknown>;
}
/**
 * Node render props for custom node visualization
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export interface NodeRenderProps<TNodeType extends string = string, TNodeDataTypeMap = NodeDataTypeMap> {
    /** The node data with type-safe data property */
    node: TNodeType extends keyof TNodeDataTypeMap ? Node & {
        type: TNodeType;
        data: TNodeDataTypeMap[TNodeType];
    } : Node;
    /** Whether the node is selected */
    isSelected: boolean;
    /** Whether the node is being dragged */
    isDragging: boolean;
    /** Whether the node is being edited inline */
    isEditing: boolean;
    /** External data if loaded */
    externalData: unknown;
    /** Loading state for external data */
    isLoadingExternalData: boolean;
    /** Error state for external data */
    externalDataError: Error | null;
    /** Callback to trigger inline editing */
    onStartEdit: () => void;
    /** Callback to update node data */
    onUpdateNode: (updates: Partial<Node>) => void;
}
/**
 * Inspector panel render props
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export interface InspectorRenderProps<TNodeType extends string = string, TNodeDataTypeMap = NodeDataTypeMap> {
    /** The selected node with type-safe data property */
    node: TNodeType extends keyof TNodeDataTypeMap ? Node & {
        type: TNodeType;
        data: TNodeDataTypeMap[TNodeType];
    } : Node;
    /** External data if loaded */
    externalData: unknown;
    /** Loading state for external data */
    isLoadingExternalData: boolean;
    /** Error state for external data */
    externalDataError: Error | null;
    /** Callback to update node data */
    onUpdateNode: (updates: Partial<Node>) => void;
    /** Callback to update external data */
    onUpdateExternalData: (data: unknown) => Promise<void>;
    /** Callback to delete the node */
    onDeleteNode: () => void;
}
/**
 * Port configuration for a node type
 */
export interface PortDefinition {
    /** Port identifier */
    id: string;
    /** Port type */
    type: "input" | "output";
    /** Display label */
    label: string;
    /** Position on the node */
    position: "left" | "right" | "top" | "bottom";
    /** Optional data type for validation */
    dataType?: string;
    /** Whether this port is required */
    required?: boolean;
    /** Maximum number of connections (default: 1 for input, unlimited for output) */
    maxConnections?: number;
}
/**
 * Constraint violation information
 */
export interface ConstraintViolation {
    /** Type of constraint that was violated */
    type: string;
    /** Human-readable description of the violation */
    message: string;
    /** Severity level */
    severity: "error" | "warning" | "info";
    /** Related node IDs */
    nodeIds?: NodeId[];
    /** Related port IDs */
    portIds?: string[];
    /** Related connection IDs */
    connectionIds?: string[];
}
/**
 * Constraint validation context
 */
export interface ConstraintContext {
    /** Current node being validated */
    node: Node;
    /** All nodes in the editor */
    allNodes: Record<NodeId, Node>;
    /** All connections in the editor */
    allConnections: Record<string, Connection>;
    /** Node definition for the current node */
    nodeDefinition: NodeDefinition;
    /** Operation being performed */
    operation: "create" | "update" | "delete" | "connect" | "disconnect" | "move";
    /** Additional context data */
    context?: Record<string, unknown>;
}
/**
 * Constraint validation result
 */
export interface ConstraintValidationResult {
    /** Whether the constraint is satisfied */
    isValid: boolean;
    /** List of violations (if any) */
    violations: ConstraintViolation[];
}
/**
 * Node constraint definition
 */
export interface NodeConstraint {
    /** Unique identifier for the constraint */
    id: string;
    /** Display name for the constraint */
    name: string;
    /** Description of what the constraint does */
    description?: string;
    /** Constraint validation function */
    validate: (context: ConstraintContext) => ConstraintValidationResult;
    /** Whether this constraint should block operations when violated */
    blocking?: boolean;
    /** Operations this constraint applies to */
    appliesTo?: ("create" | "update" | "delete" | "connect" | "disconnect" | "move")[];
}
/**
 * Node type definition
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export interface NodeDefinition<TNodeType extends string = string, TNodeDataTypeMap = NodeDataTypeMap> {
    /** Unique type identifier */
    type: TNodeType;
    /** Display name for the node type */
    displayName: string;
    /** Description of the node type */
    description?: string;
    /** Icon or visual identifier */
    icon?: ReactNode;
    /** Category for grouping in UI */
    category?: string;
    /** Default data when creating a new node */
    defaultData?: TNodeType extends keyof TNodeDataTypeMap ? TNodeDataTypeMap[TNodeType] : Record<string, unknown>;
    /** Default size for new nodes */
    defaultSize?: {
        width: number;
        height: number;
    };
    /** Port definitions */
    ports?: PortDefinition[];
    /** Whether this node type supports children (group nodes) */
    supportsChildren?: boolean;
    /** When true, node can only be moved by dragging title or when multi-selected */
    interactive?: boolean;
    /** Custom render function for the node */
    renderNode?: (props: NodeRenderProps<TNodeType, TNodeDataTypeMap>) => ReactElement;
    /** Custom render function for the inspector panel */
    renderInspector?: (props: InspectorRenderProps<TNodeType, TNodeDataTypeMap>) => ReactElement;
    /** External data loader */
    loadExternalData?: (ref: ExternalDataReference) => unknown | Promise<unknown>;
    /** External data updater */
    updateExternalData?: (ref: ExternalDataReference, data: unknown) => void | Promise<void>;
    /** Validation function for connections */
    validateConnection?: (fromPort: Port, toPort: Port) => boolean;
    /** Custom color or visual state */
    visualState?: "info" | "success" | "warning" | "error" | "disabled";
    /** Node constraints */
    constraints?: NodeConstraint[];
}
/**
 * Node definitions registry
 * @template TNodeDataTypeMap - The node data type map
 */
export interface NodeDefinitionRegistry<TNodeDataTypeMap = NodeDataTypeMap> {
    /** Map of type to definition */
    definitions: Map<string, NodeDefinition<string, TNodeDataTypeMap>>;
    /** Register a new node type */
    register: (definition: NodeDefinition<string, TNodeDataTypeMap>) => void;
    /** Unregister a node type */
    unregister: (type: string) => void;
    /** Get a node definition by type */
    get: (type: string) => NodeDefinition<string, TNodeDataTypeMap> | undefined;
    /** Get all definitions */
    getAll: () => NodeDefinition<string, TNodeDataTypeMap>[];
    /** Get definitions by category */
    getByCategory: (category: string) => NodeDefinition<string, TNodeDataTypeMap>[];
}
/**
 * Create a node definition registry
 * @template TNodeDataTypeMap - The node data type map
 */
export declare function createNodeDefinitionRegistry<TNodeDataTypeMap = NodeDataTypeMap>(): NodeDefinitionRegistry<TNodeDataTypeMap>;
/**
 * Standard node definition
 */
export declare const StandardNodeDefinition: NodeDefinition;
/**
 * Group node definition
 */
export declare const GroupNodeDefinition: NodeDefinition;
/**
 * Multi-input node definition for testing multiple input ports
 */
export declare const MultiInputNodeDefinition: NodeDefinition;
/**
 * Helper function to create a type-safe node definition
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export declare function createNodeDefinition<TNodeType extends string, TNodeDataTypeMap = NodeDataTypeMap>(definition: NodeDefinition<TNodeType, TNodeDataTypeMap>): NodeDefinition<TNodeType, TNodeDataTypeMap>;
/**
 * Helper function to get typed node data
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export declare function getTypedNodeData<TNodeType extends keyof TNodeDataTypeMap, TNodeDataTypeMap = NodeDataTypeMap>(node: Node & {
    type: TNodeType;
}): TNodeDataTypeMap[TNodeType];
/**
 * Helper function to create a type-safe node data updater
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export declare function createNodeDataUpdater<TNodeType extends keyof TNodeDataTypeMap, TNodeDataTypeMap = NodeDataTypeMap>(onUpdateNode: (updates: Partial<Node>) => void): (data: Partial<TNodeDataTypeMap[TNodeType]>) => void;
/**
 * Compatibility bridge: Convert typed node render to original interface
 * @template TNodeType - The specific node type from NodeDataTypeMap
 */
export declare function asOriginalNodeRender<TNodeType extends string>(render: (props: NodeRenderProps<TNodeType>) => ReactElement): (props: NodeRenderProps) => ReactElement;
/**
 * Compatibility bridge: Convert typed inspector render to original interface
 * @template TNodeType - The specific node type from NodeDataTypeMap
 */
export declare function asOriginalInspectorRender<TNodeType extends string>(render: (props: InspectorRenderProps<TNodeType>) => ReactElement): (props: InspectorRenderProps) => ReactElement;
