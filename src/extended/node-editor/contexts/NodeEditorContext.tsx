import * as React from "react";
import { Connection, ConnectionId, Node, NodeEditorData, NodeId, Position, Port, PortId } from "../types/core";

import { useSettings } from "../hooks";
import { SettingsManager } from "../settings/SettingsManager";
import { createCachedPortResolver } from "../utils/portResolver";
import { NodeDefinitionContext } from "./NodeDefinitionContext";
import { loadDataWithMigration, prepareDataForSave, type VersionedNodeEditorData } from "../utils/dataMigration";
import { getFeatureFlags } from "../config/featureFlags";

// Re-export NodeEditorData for external use
export type { NodeEditorData };

// Node editor actions
export type NodeEditorAction =
  | { type: "ADD_NODE"; payload: { node: Omit<Node, "id"> } }
  | { type: "UPDATE_NODE"; payload: { nodeId: NodeId; updates: Partial<Node> } }
  | { type: "DELETE_NODE"; payload: { nodeId: NodeId } }
  | { type: "MOVE_NODE"; payload: { nodeId: NodeId; position: Position } }
  | { type: "MOVE_NODES"; payload: { updates: Record<NodeId, Position> } }
  | { type: "ADD_CONNECTION"; payload: { connection: Omit<Connection, "id"> } }
  | { type: "DELETE_CONNECTION"; payload: { connectionId: ConnectionId } }
  | { type: "SET_NODE_DATA"; payload: { data: NodeEditorData } }
  | { type: "RESTORE_STATE"; payload: { data: NodeEditorData } }
  | { type: "DUPLICATE_NODES"; payload: { nodeIds: NodeId[] } }
  | { type: "GROUP_NODES"; payload: { nodeIds: NodeId[]; groupId?: NodeId } }
  | { type: "UNGROUP_NODE"; payload: { groupId: NodeId } }
  | { type: "UPDATE_GROUP_MEMBERSHIP"; payload: { updates: Record<NodeId, { parentId?: NodeId }> } }
  | { type: "MOVE_GROUP_WITH_CHILDREN"; payload: { groupId: NodeId; delta: { x: number; y: number } } }
  | { type: "AUTO_LAYOUT"; payload: { layoutType: "force" | "hierarchical" | "grid"; selectedOnly?: boolean } };

// Node editor reducer
export const nodeEditorReducer = (state: NodeEditorData, action: NodeEditorAction): NodeEditorData => {
  switch (action.type) {
    case "ADD_NODE": {
      const id = generateId();
      const node = { ...action.payload.node, id } as Node;

      // Ports are no longer stored on nodes - they will be inferred from NodeDefinition

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [id]: node,
        },
      };
    }

    case "UPDATE_NODE": {
      const { nodeId, updates } = action.payload;
      const node = state.nodes[nodeId];
      if (!node) return state;

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [nodeId]: { ...node, ...updates } as Node,
        },
      };
    }

    case "DELETE_NODE": {
      const { nodeId } = action.payload;
      const { [nodeId]: deleted, ...remainingNodes } = state.nodes;

      // Delete all connections related to this node
      const remainingConnections = Object.entries(state.connections).reduce((acc, [connId, conn]) => {
        if (conn.fromNodeId !== nodeId && conn.toNodeId !== nodeId) {
          acc[connId] = conn;
        }
        return acc;
      }, {} as typeof state.connections);

      return {
        ...state,
        nodes: remainingNodes,
        connections: remainingConnections,
      };
    }

    case "MOVE_NODE": {
      const { nodeId, position } = action.payload;
      const node = state.nodes[nodeId];
      if (!node) return state;

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [nodeId]: { ...node, position },
        },
      };
    }

    case "MOVE_NODES": {
      const { updates } = action.payload;
      const updatedNodes = { ...state.nodes };

      Object.entries(updates).forEach(([nodeId, position]) => {
        const node = updatedNodes[nodeId];
        if (node) {
          updatedNodes[nodeId] = { ...node, position };
        }
      });

      return {
        ...state,
        nodes: updatedNodes,
      };
    }

    case "ADD_CONNECTION": {
      const { connection } = action.payload;
      const id = generateId();

      // Check if input port already has a connection
      const existingConnections = Object.entries(state.connections).filter(
        ([_, conn]) => conn.toNodeId === connection.toNodeId && conn.toPortId === connection.toPortId
      );

      // Remove existing connections to the input port (input ports can only have one connection)
      const connectionsAfterRemoval = { ...state.connections };
      existingConnections.forEach(([connId]) => {
        delete connectionsAfterRemoval[connId];
      });

      return {
        ...state,
        connections: {
          ...connectionsAfterRemoval,
          [id]: { ...connection, id },
        },
      };
    }

    case "DELETE_CONNECTION": {
      const { connectionId } = action.payload;
      const { [connectionId]: deleted, ...remainingConnections } = state.connections;

      return {
        ...state,
        connections: remainingConnections,
      };
    }

    case "SET_NODE_DATA":
      return action.payload.data;

    case "RESTORE_STATE":
      return action.payload.data;

    case "DUPLICATE_NODES": {
      const { nodeIds } = action.payload;
      if (nodeIds.length === 0) return state;

      const newNodes: Record<NodeId, Node> = { ...state.nodes };
      const nodeIdMap: Record<NodeId, NodeId> = {};
      const duplicatedNodeIds: NodeId[] = [];

      // Duplicate nodes with offset
      nodeIds.forEach((oldId) => {
        const originalNode = state.nodes[oldId];
        if (!originalNode) return;

        const newId = generateId();
        nodeIdMap[oldId] = newId;
        duplicatedNodeIds.push(newId);

        const duplicatedNode: Node = {
          ...originalNode,
          id: newId,
          position: {
            x: originalNode.position.x + 50,
            y: originalNode.position.y + 50,
          },
          data: {
            ...originalNode.data,
            title: originalNode.data.title ? `${originalNode.data.title} Copy` : `Node Copy`,
            createdAt: Date.now(), // Track creation time for selection
          },
          // Ports are no longer duplicated - they will be inferred from NodeDefinition
        };

        // Handle group nodes
        if (duplicatedNode.type === "group") {
          duplicatedNode.children = [];
        }

        newNodes[newId] = duplicatedNode;
      });

      return {
        ...state,
        nodes: newNodes,
        // Store duplicated node IDs for selection
        lastDuplicatedNodeIds: duplicatedNodeIds,
      };
    }

    case "GROUP_NODES": {
      const { nodeIds, groupId = generateId() } = action.payload;
      if (nodeIds.length === 0) return state;

      // Calculate bounding box
      let minX = Infinity,
        minY = Infinity;
      let maxX = -Infinity,
        maxY = -Infinity;

      nodeIds.forEach((id) => {
        const node = state.nodes[id];
        if (node) {
          minX = Math.min(minX, node.position.x);
          minY = Math.min(minY, node.position.y);
          maxX = Math.max(maxX, node.position.x + (node.size?.width || 100));
          maxY = Math.max(maxY, node.position.y + (node.size?.height || 50));
        }
      });

      const groupNode: Node = {
        id: groupId,
        type: "group",
        position: { x: minX - 20, y: minY - 40 },
        size: { width: maxX - minX + 40, height: maxY - minY + 60 },
        data: { title: "Group" },
        children: nodeIds,
        expanded: true,
      };

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [groupId]: groupNode,
        },
      };
    }

    case "UNGROUP_NODE": {
      const { groupId } = action.payload;
      const group = state.nodes[groupId];
      if (!group || group.type !== "group") return state;

      const { [groupId]: deleted, ...remainingNodes } = state.nodes;

      return {
        ...state,
        nodes: remainingNodes,
      };
    }

    case "UPDATE_GROUP_MEMBERSHIP": {
      const { updates } = action.payload;
      const updatedNodes = { ...state.nodes };

      Object.entries(updates).forEach(([nodeId, update]) => {
        const node = updatedNodes[nodeId];
        if (node) {
          updatedNodes[nodeId] = { ...node, ...update };
        }
      });

      return {
        ...state,
        nodes: updatedNodes,
      };
    }

    case "MOVE_GROUP_WITH_CHILDREN": {
      const { groupId, delta } = action.payload;
      const updatedNodes = { ...state.nodes };

      // Move the group node
      const groupNode = updatedNodes[groupId];
      if (groupNode) {
        updatedNodes[groupId] = {
          ...groupNode,
          position: {
            x: groupNode.position.x + delta.x,
            y: groupNode.position.y + delta.y,
          },
        };

        // Move all child nodes
        Object.values(updatedNodes).forEach((node) => {
          if (node.parentId === groupId) {
            updatedNodes[node.id] = {
              ...node,
              position: {
                x: node.position.x + delta.x,
                y: node.position.y + delta.y,
              },
            };
          }
        });
      }

      return {
        ...state,
        nodes: updatedNodes,
      };
    }

    case "AUTO_LAYOUT": {
      const { layoutType, selectedOnly = false } = action.payload;

      // Import layout functions dynamically to avoid circular dependency
      const layoutData = selectedOnly
        ? {
            nodes: Object.fromEntries(
              Object.entries(state.nodes).filter(
                ([_, node]) =>
                  // This will be filtered by selected nodes in the hook
                  true
              )
            ),
            connections: state.connections,
          }
        : state;

      // The actual layout calculation will be done in the hook
      // This case just triggers the layout process
      return state;
    }

    default:
      return state;
  }
};

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// Types are already imported at the top of the file, no need to re-export

// Default state
export const defaultNodeEditorData: NodeEditorData = {
  nodes: {},
  connections: {},
};

// Node editor action creators
export const nodeEditorActions = {
  addNode: (node: Omit<Node, "id">): NodeEditorAction => ({
    type: "ADD_NODE",
    payload: { node },
  }),
  updateNode: (nodeId: NodeId, updates: Partial<Node>): NodeEditorAction => ({
    type: "UPDATE_NODE",
    payload: { nodeId, updates },
  }),
  deleteNode: (nodeId: NodeId): NodeEditorAction => ({
    type: "DELETE_NODE",
    payload: { nodeId },
  }),
  moveNode: (nodeId: NodeId, position: Position): NodeEditorAction => ({
    type: "MOVE_NODE",
    payload: { nodeId, position },
  }),
  moveNodes: (updates: Record<NodeId, Position>): NodeEditorAction => ({
    type: "MOVE_NODES",
    payload: { updates },
  }),
  addConnection: (connection: Omit<Connection, "id">): NodeEditorAction => ({
    type: "ADD_CONNECTION",
    payload: { connection },
  }),
  deleteConnection: (connectionId: ConnectionId): NodeEditorAction => ({
    type: "DELETE_CONNECTION",
    payload: { connectionId },
  }),
  setNodeData: (data: NodeEditorData): NodeEditorAction => ({
    type: "SET_NODE_DATA",
    payload: { data },
  }),
  restoreState: (data: NodeEditorData): NodeEditorAction => ({
    type: "RESTORE_STATE",
    payload: { data },
  }),
  duplicateNodes: (nodeIds: NodeId[]): NodeEditorAction => ({
    type: "DUPLICATE_NODES",
    payload: { nodeIds },
  }),
  groupNodes: (nodeIds: NodeId[], groupId?: NodeId): NodeEditorAction => ({
    type: "GROUP_NODES",
    payload: { nodeIds, groupId },
  }),
  ungroupNode: (groupId: NodeId): NodeEditorAction => ({
    type: "UNGROUP_NODE",
    payload: { groupId },
  }),
  updateGroupMembership: (updates: Record<NodeId, { parentId?: NodeId }>): NodeEditorAction => ({
    type: "UPDATE_GROUP_MEMBERSHIP",
    payload: { updates },
  }),
  moveGroupWithChildren: (groupId: NodeId, delta: { x: number; y: number }): NodeEditorAction => ({
    type: "MOVE_GROUP_WITH_CHILDREN",
    payload: { groupId, delta },
  }),
  autoLayout: (layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean): NodeEditorAction => ({
    type: "AUTO_LAYOUT",
    payload: { layoutType, selectedOnly },
  }),
};

// Context
export interface NodeEditorContextValue {
  state: NodeEditorData;
  dispatch: React.Dispatch<NodeEditorAction>;
  actions: typeof nodeEditorActions;
  isLoading: boolean;
  isSaving: boolean;
  handleSave: () => Promise<void>;
  // Port resolution methods
  getNodePorts: (nodeId: NodeId) => Port[];
  getPort: (nodeId: NodeId, portId: string) => Port | undefined;
  portLookupMap: Map<string, { node: Node; port: Port }>;
}

export const NodeEditorContext = React.createContext<NodeEditorContextValue | null>(null);

// Provider
export interface NodeEditorProviderProps {
  children: React.ReactNode;
  initialState?: Partial<NodeEditorData>;
  controlledData?: NodeEditorData;
  onDataChange?: (data: NodeEditorData) => void;
  onSave?: (data: NodeEditorData) => void | Promise<void>;
  onLoad?: () => NodeEditorData | Promise<NodeEditorData>;
  settingsManager?: SettingsManager;
}
export const NodeEditorProvider: React.FC<NodeEditorProviderProps> = ({
  children,
  initialState,
  controlledData,
  onDataChange,
  onLoad,
  onSave,
  settingsManager,
}) => {
  // Get node definitions from context
  const nodeDefinitionsContext = React.useContext(NodeDefinitionContext);
  const registry = nodeDefinitionsContext?.registry;
  
  // Get feature flags
  const featureFlags = React.useMemo(() => getFeatureFlags(), []);
  
  // Create port resolver instance
  const portResolver = React.useMemo(() => createCachedPortResolver(), []);
  
  // Deep merge initial state with defaults
  const initialData: NodeEditorData = React.useMemo(() => {
    return {
      nodes: initialState?.nodes || defaultNodeEditorData.nodes,
      connections: initialState?.connections || defaultNodeEditorData.connections,
    };
  }, [initialState]);

  const [internalState, internalDispatch] = React.useReducer(nodeEditorReducer, initialData);
  // Use controlled data if provided, otherwise use internal state
  const state = controlledData || internalState;
  const onDataChangeRef = React.useRef(onDataChange);
  onDataChangeRef.current = onDataChange;

  // Wrap dispatch to handle controlled mode
  const dispatch: React.Dispatch<NodeEditorAction> = React.useCallback(
    (action) => {
      if (!controlledData) {
        // Uncontrolled mode: use internal dispatch
        internalDispatch(action);
      } else if (onDataChangeRef.current) {
        // Controlled mode: calculate new state and call onDataChange
        const newState = nodeEditorReducer(state, action);
        onDataChangeRef.current(newState);
      }
      // If controlled but no onDataChange, dispatch does nothing
    },
    [controlledData, state]
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const settings = useSettings(settingsManager);
  const { autoSave, autoSaveInterval } = settings;
  // Load data on mount if onLoad is provided
  React.useEffect(() => {
    if (onLoad && !isLoading) {
      setIsLoading(true);
      Promise.resolve(onLoad())
        .then((loadedData) => {
          // Handle migration if needed
          const { data, migrated, migrationResult } = loadDataWithMigration(
            loadedData as VersionedNodeEditorData,
            registry,
            featureFlags.autoMigrateOnLoad
          );
          
          if (migrated && migrationResult && featureFlags.showMigrationWarnings) {
            console.log("Node editor data migrated successfully:", migrationResult.statistics);
            if (migrationResult.warnings.length > 0) {
              console.warn("Migration warnings:", migrationResult.warnings);
            }
          }
          
          dispatch(nodeEditorActions.setNodeData(data));
        })
        .catch((error) => {
          console.error("Failed to load node editor data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [featureFlags]);

  // Save handler
  const handleSave = React.useCallback(async () => {
    if (onSave && !isSaving) {
      setIsSaving(true);
      try {
        // Prepare data for saving based on feature flags
        const dataToSave = prepareDataForSave(state, featureFlags.saveInNewFormat);
        await Promise.resolve(onSave(dataToSave));
      } catch (error) {
        console.error("Failed to save node editor data:", error);
      } finally {
        setIsSaving(false);
      }
    }
  }, [onSave, state, isSaving]);

  // Auto-save functionality based on settings
  React.useEffect(() => {
    if (!autoSave || !onSave) return;
    const intervalId = setInterval(() => {
      if (!isSaving) {
        handleSave();
      }
    }, autoSaveInterval * 1000);

    return () => clearInterval(intervalId);
  }, [autoSave, autoSaveInterval, handleSave, isSaving]);

  // Port resolution methods
  const getNodePorts = React.useCallback(
    (nodeId: NodeId): Port[] => {
      const node = state.nodes[nodeId];
      if (!node) return [];
      
      // If using inferred ports only, require registry
      if (featureFlags.useInferredPortsOnly) {
        if (!registry) {
          console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled");
          return [];
        }
        const definition = registry.get(node.type);
        if (!definition) {
          console.warn(`No definition found for node type: ${node.type}`);
          return [];
        }
        return portResolver.getNodePorts(node, definition);
      }
      
      // Use registry if available, otherwise fall back to legacy ports
      if (registry) {
        const definition = registry.get(node.type);
        if (definition) {
          return portResolver.getNodePorts(node, definition);
        }
      }
      
      // Fallback to legacy ports
      return node.ports || [];
    },
    [state.nodes, registry, portResolver, featureFlags.useInferredPortsOnly]
  );

  const getPort = React.useCallback(
    (nodeId: NodeId, portId: string): Port | undefined => {
      const node = state.nodes[nodeId];
      if (!node) return undefined;
      
      // If using inferred ports only, require registry
      if (featureFlags.useInferredPortsOnly) {
        if (!registry) {
          console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled");
          return undefined;
        }
        const definition = registry.get(node.type);
        if (!definition) {
          console.warn(`No definition found for node type: ${node.type}`);
          return undefined;
        }
        return portResolver.getPort(node, portId, definition);
      }
      
      // Use registry if available, otherwise fall back to legacy ports
      if (registry) {
        const definition = registry.get(node.type);
        if (definition) {
          return portResolver.getPort(node, portId, definition);
        }
      }
      
      // Fallback to legacy ports
      return node.ports?.find(p => p.id === portId);
    },
    [state.nodes, registry, portResolver, featureFlags.useInferredPortsOnly]
  );

  // Create port lookup map
  const portLookupMap = React.useMemo(() => {
    // If using inferred ports only, require registry
    if (featureFlags.useInferredPortsOnly) {
      if (!registry) {
        console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled");
        return new Map<string, { node: Node; port: Port }>();
      }
      return portResolver.createPortLookupMap(
        state.nodes,
        (type: string) => registry.get(type)
      );
    }
    
    // Hybrid mode: use registry if available
    if (!registry) {
      // Fallback to legacy approach
      const map = new Map<string, { node: Node; port: Port }>();
      for (const node of Object.values(state.nodes)) {
        const ports = node.ports || [];
        for (const port of ports) {
          const key = `${node.id}:${port.id}`;
          map.set(key, { node, port });
        }
      }
      return map;
    }
    
    return portResolver.createPortLookupMap(
      state.nodes,
      (type: string) => registry.get(type)
    );
  }, [state.nodes, registry, portResolver, featureFlags.useInferredPortsOnly]);

  // Clear port cache when nodes change
  React.useEffect(() => {
    portResolver.clearCache();
  }, [state.nodes, portResolver]);

  const contextValue: NodeEditorContextValue = React.useMemo(() => {
    return {
      state,
      dispatch,
      actions: nodeEditorActions,
      isLoading,
      isSaving,
      handleSave,
      getNodePorts,
      getPort,
      portLookupMap,
    };
  }, [state, dispatch, isLoading, isSaving, handleSave, getNodePorts, getPort, portLookupMap]);

  return <NodeEditorContext.Provider value={contextValue}>{children}</NodeEditorContext.Provider>;
};

// Hook
export const useNodeEditor = (): NodeEditorContextValue => {
  const context = React.useContext(NodeEditorContext);
  if (!context) {
    throw new Error("useNodeEditor must be used within a NodeEditorProvider");
  }
  return context;
};
