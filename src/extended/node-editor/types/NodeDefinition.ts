import React, { type ReactNode, type ReactElement } from "react";
import { isLabelNodeRenderProps, createTypeGuard, isLabelInspectorProps, createInspectorTypeGuard } from "./typeGuards";
import type { Node, NodeId, Port, Connection, NodeEditorData, NodeData } from "./core";
import type { BuiltinNodeDataMap } from "./builtin";

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
  // This interface is intentionally empty - users should use generic parameters
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
  node: TNodeType extends keyof TNodeDataTypeMap 
    ? Node & {
        type: TNodeType;
        data: TNodeDataTypeMap[TNodeType];
      }
    : Node;
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
  node: TNodeType extends keyof TNodeDataTypeMap 
    ? Node & {
        type: TNodeType;
        data: TNodeDataTypeMap[TNodeType];
      }
    : Node;
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
  maxConnections?: number | "unlimited";
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
  /**
   * Maximum number of nodes of this type allowed within a single flow/editor.
   * If undefined, no limit is enforced.
   */
  maxPerFlow?: number;
  /** Default data when creating a new node */
  defaultData?: TNodeType extends keyof TNodeDataTypeMap ? TNodeDataTypeMap[TNodeType] : Record<string, unknown>;
  /** Default size for new nodes */
  defaultSize?: { width: number; height: number };
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
export function createNodeDefinitionRegistry<TNodeDataTypeMap = NodeDataTypeMap>(): NodeDefinitionRegistry<TNodeDataTypeMap> {
  const definitions = new Map<string, NodeDefinition<string, TNodeDataTypeMap>>();

  return {
    definitions,
    register(definition: NodeDefinition<string, TNodeDataTypeMap>) {
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
 * Example node definition (for documentation and reference only).
 * Not included in default registrations.
 */
export const ExampleNodeDefinition: NodeDefinition<"standard"> = {
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
export const GroupNodeDefinition: NodeDefinition<"group"> = {
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
 * Label node definition (decoration-less, no connections)
 */
import { LabelNodeRenderer, LabelNodeInspector } from "../components/node/renderers/LabelNode";
import type { LabelNodeDataMap } from "./nodes/label";

export const LabelNodeDefinition: NodeDefinition<"label", LabelNodeDataMap> = {
  type: "label",
  displayName: "Label",
  description: "A decoration-less text label with optional subtitle and caption",
  category: "Basic",
  defaultData: {
    title: "",
    subtitle: "",
    caption: "",
  },
  // Provide a compact default size; content may exceed if long
  defaultSize: { width: 220, height: 72 },
  // No ports for a pure label
  ports: [],
  renderNode: LabelNodeRenderer,
  renderInspector: LabelNodeInspector,
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

/**
 * Helper function to create a type-safe node definition
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export function createNodeDefinition<TNodeType extends string, TNodeDataTypeMap = NodeDataTypeMap>(
  definition: NodeDefinition<TNodeType, TNodeDataTypeMap>
): NodeDefinition<TNodeType, TNodeDataTypeMap> {
  return definition;
}

/**
 * Helper function to get typed node data
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export function getTypedNodeData<TNodeType extends keyof TNodeDataTypeMap, TNodeDataTypeMap = NodeDataTypeMap>(
  node: Node & { type: TNodeType }
): TNodeDataTypeMap[TNodeType] {
  return node.data as TNodeDataTypeMap[TNodeType];
}

/**
 * Helper function to create a type-safe node data updater
 * @template TNodeType - The specific node type
 * @template TNodeDataTypeMap - The node data type map
 */
export function createNodeDataUpdater<TNodeType extends keyof TNodeDataTypeMap, TNodeDataTypeMap = NodeDataTypeMap>(
  onUpdateNode: (updates: Partial<Node>) => void
) {
  return (data: Partial<TNodeDataTypeMap[TNodeType]>) => {
    onUpdateNode({ data: data as NodeData });
  };
}

/**
 * Compatibility bridge: Convert typed node render to original interface
 * @template TNodeType - The specific node type from NodeDataTypeMap
 */
export function asOriginalNodeRender<TNodeType extends string>(
  render: (props: NodeRenderProps<TNodeType>) => ReactElement
): (props: NodeRenderProps) => ReactElement {
  return (props: NodeRenderProps) => render(props as NodeRenderProps<TNodeType>);
}

/**
 * Compatibility bridge: Convert typed inspector render to original interface
 * @template TNodeType - The specific node type from NodeDataTypeMap
 */
export function asOriginalInspectorRender<TNodeType extends string>(
  render: (props: InspectorRenderProps<TNodeType>) => ReactElement
): (props: InspectorRenderProps) => ReactElement {
  return (props: InspectorRenderProps) => render(props as InspectorRenderProps<TNodeType>);
}

/**
 * Create a widened, untyped node definition suitable for heterogeneous registries.
 * It wraps typed render functions to accept generic props while delegating to the typed implementation.
 */
export function toUntypedDefinition<TNodeType extends string, TMap = NodeDataTypeMap>(
  def: NodeDefinition<TNodeType, TMap>
): NodeDefinition<string, NodeDataTypeMap> {
  const type = def.type as string;
  const typedRenderNode = def.renderNode as unknown as
    | ((props: NodeRenderProps<TNodeType, NodeDataTypeMap & BuiltinNodeDataMap>) => ReactElement)
    | undefined;
  const typedLabelRenderNode = def.renderNode as unknown as
    | ((props: NodeRenderProps<"label", LabelNodeDataMap>) => ReactElement)
    | undefined;
  const typedRenderInspector = def.renderInspector as unknown as
    | ((props: InspectorRenderProps<TNodeType, NodeDataTypeMap & BuiltinNodeDataMap>) => ReactElement)
    | undefined;
  const typedLabelRenderInspector = def.renderInspector as unknown as
    | ((props: InspectorRenderProps<"label", LabelNodeDataMap>) => ReactElement)
    | undefined;

  const wrapRenderNode = typedRenderNode
    ? ((props: NodeRenderProps<string, NodeDataTypeMap & BuiltinNodeDataMap>) => {
        if (type === "label") {
          if (isLabelNodeRenderProps(props) && typedLabelRenderNode) return typedLabelRenderNode(props);
        } else {
          const guard = createTypeGuard<TNodeType>(def.type);
          if (guard(props) && typedRenderNode) return typedRenderNode(props);
        }
        return React.createElement(React.Fragment, null);
      })
    : undefined;

  const wrapRenderInspector = typedRenderInspector
    ? ((props: InspectorRenderProps<string, NodeDataTypeMap & BuiltinNodeDataMap>) => {
        if (type === "label") {
          if (isLabelInspectorProps(props) && typedLabelRenderInspector) return typedLabelRenderInspector(props);
        } else {
          const guard = createInspectorTypeGuard<TNodeType>(def.type);
          if (guard(props) && typedRenderInspector) return typedRenderInspector(props);
        }
        return React.createElement(React.Fragment, null);
      })
    : undefined;

  const untyped = {
    ...def,
    type,
    renderNode: wrapRenderNode,
    renderInspector: wrapRenderInspector,
  } as unknown as NodeDefinition<string, NodeDataTypeMap>;
  return untyped;
}
