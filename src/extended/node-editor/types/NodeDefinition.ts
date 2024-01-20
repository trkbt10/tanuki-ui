import type { ReactNode, ReactElement } from "react";
import type { Node, NodeId, Port, Connection, NodeEditorData } from "./core";

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
 */
export interface NodeRenderProps {
  /** The node data */
  node: Node;
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
 */
export interface InspectorRenderProps {
  /** The selected node */
  node: Node;
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
 */
export interface NodeDefinition {
  /** Unique type identifier */
  type: string;
  /** Display name for the node type */
  displayName: string;
  /** Description of the node type */
  description?: string;
  /** Icon or visual identifier */
  icon?: ReactNode;
  /** Category for grouping in UI */
  category?: string;
  /** Default data when creating a new node */
  defaultData?: Record<string, unknown>;
  /** Default size for new nodes */
  defaultSize?: { width: number; height: number };
  /** Port definitions */
  ports?: PortDefinition[];
  /** Whether this node type supports children (group nodes) */
  supportsChildren?: boolean;
  /** When true, node can only be moved by dragging title or when multi-selected */
  interactive?: boolean;
  /** Custom render function for the node */
  renderNode?: (props: NodeRenderProps) => ReactElement;
  /** Custom render function for the inspector panel */
  renderInspector?: (props: InspectorRenderProps) => ReactElement;
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
 */
export interface NodeDefinitionRegistry {
  /** Map of type to definition */
  definitions: Map<string, NodeDefinition>;
  /** Register a new node type */
  register: (definition: NodeDefinition) => void;
  /** Unregister a node type */
  unregister: (type: string) => void;
  /** Get a node definition by type */
  get: (type: string) => NodeDefinition | undefined;
  /** Get all definitions */
  getAll: () => NodeDefinition[];
  /** Get definitions by category */
  getByCategory: (category: string) => NodeDefinition[];
}


/**
 * Create a node definition registry
 */
export function createNodeDefinitionRegistry(): NodeDefinitionRegistry {
  const definitions = new Map<string, NodeDefinition>();

  return {
    definitions,
    register(definition: NodeDefinition) {
      definitions.set(definition.type, definition);
    },
    unregister(type: string) {
      definitions.delete(type);
    },
    get(type: string) {
      return definitions.get(type);
    },
    getAll() {
      return Array.from(definitions.values());
    },
    getByCategory(category: string) {
      return Array.from(definitions.values()).filter(
        (def) => def.category === category
      );
    },
  };
}

/**
 * Standard node definition
 */
export const StandardNodeDefinition: NodeDefinition = {
  type: "standard",
  displayName: "Standard Node",
  description: "A basic node with customizable properties",
  category: "Basic",
  defaultData: {
    title: "New Node",
    content: "",
  },
  defaultSize: { width: 200, height: 100 },
  ports: [
    {
      id: "input",
      type: "input",
      label: "Input",
      position: "left",
    },
    {
      id: "output",
      type: "output",
      label: "Output",
      position: "right",
    },
  ],
};

/**
 * Group node definition
 */
export const GroupNodeDefinition: NodeDefinition = {
  type: "group",
  displayName: "Group",
  description: "A container node that can hold other nodes",
  category: "Structure",
  defaultData: {
    title: "Group",
  },
  defaultSize: { width: 300, height: 200 },
  supportsChildren: true,
  visualState: "info",
};

/**
 * Multi-input node definition for testing multiple input ports
 */
export const MultiInputNodeDefinition: NodeDefinition = {
  type: "multi-input",
  displayName: "Multi Input Node",
  description: "A node with multiple input ports for testing",
  category: "Processing",
  defaultData: {
    title: "Multi Input",
    content: "Processes multiple inputs",
  },
  defaultSize: { width: 180, height: 120 },
  ports: [
    {
      id: "input1",
      type: "input",
      label: "Input 1",
      position: "left",
    },
    {
      id: "input2", 
      type: "input",
      label: "Input 2",
      position: "left",
    },
    {
      id: "input3",
      type: "input", 
      label: "Input 3",
      position: "left",
    },
    {
      id: "output",
      type: "output",
      label: "Output",
      position: "right",
    },
  ],
};

