import * as React from "react";
import type { Node, NodeEditorData, NodeId, Port } from "../../types/core";
import { useSettings } from "../../hooks";
import type { SettingsManager } from "../../settings/SettingsManager";
import { createCachedPortResolver } from "../../utils/portResolver";
import { NodeDefinitionContext } from "../NodeDefinitionContext";
import { loadDataWithMigration, prepareDataForSave, type VersionedNodeEditorData } from "../../utils/dataMigration";
import { getFeatureFlags } from "../../config/featureFlags";
import { nodeEditorActions } from "./actions";
import { nodeEditorReducer, defaultNodeEditorData } from "./reducer";
import { NodeEditorContext } from "./context";

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
  const nodeDefinitionsContext = React.useContext(NodeDefinitionContext);
  const registry = nodeDefinitionsContext?.registry;

  const featureFlags = React.useMemo(() => getFeatureFlags(), []);
  const portResolver = React.useMemo(() => createCachedPortResolver(), []);

  const initialData: NodeEditorData = React.useMemo(() => {
    return {
      nodes: initialState?.nodes || defaultNodeEditorData.nodes,
      connections: initialState?.connections || defaultNodeEditorData.connections,
    };
  }, [initialState]);

  const [internalState, internalDispatch] = React.useReducer(nodeEditorReducer, initialData);
  const state = controlledData || internalState;
  const onDataChangeRef = React.useRef(onDataChange);
  onDataChangeRef.current = onDataChange;

  const dispatch: React.Dispatch<any> = React.useCallback(
    (action) => {
      if (!controlledData) {
        internalDispatch(action);
      } else if (onDataChangeRef.current) {
        const newState = nodeEditorReducer(state, action);
        onDataChangeRef.current(newState);
      }
    },
    [controlledData, state]
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const settings = useSettings(settingsManager);
  const { autoSave, autoSaveInterval } = settings;

  React.useEffect(() => {
    if (onLoad && !isLoading) {
      setIsLoading(true);
      Promise.resolve(onLoad())
        .then((loadedData) => {
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
        .finally(() => setIsLoading(false));
    }
  }, [featureFlags]);

  // In uncontrolled mode, notify external listener on every internal state change
  const lastNotifiedStateRef = React.useRef<NodeEditorData | null>(null);
  React.useEffect(() => {
    if (controlledData) return; // controlled mode: notification happens via dispatch path
    const cb = onDataChangeRef.current;
    if (!cb) return;
    // Avoid duplicate notifications when state identity hasn't changed
    if (lastNotifiedStateRef.current === state) return;
    lastNotifiedStateRef.current = state;
    cb(state);
  }, [controlledData, state]);

  const handleSave = React.useCallback(async () => {
    if (onSave && !isSaving) {
      setIsSaving(true);
      try {
        const dataToSave = prepareDataForSave(state, featureFlags.saveInNewFormat);
        await Promise.resolve(onSave(dataToSave));
      } catch (error) {
        console.error("Failed to save node editor data:", error);
      } finally {
        setIsSaving(false);
      }
    }
  }, [onSave, state, isSaving]);

  React.useEffect(() => {
    if (!autoSave || !onSave) return;
    const intervalId = setInterval(() => {
      if (!isSaving) handleSave();
    }, autoSaveInterval * 1000);
    return () => clearInterval(intervalId);
  }, [autoSave, autoSaveInterval, handleSave, isSaving]);

  const getNodePorts = React.useCallback(
    (nodeId: NodeId): Port[] => {
      const node = state.nodes[nodeId];
      if (!node) return [];
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
      if (registry) {
        const definition = registry.get(node.type);
        if (definition) return portResolver.getNodePorts(node, definition);
      }
      return node.ports || [];
    },
    [state.nodes, registry, portResolver, featureFlags.useInferredPortsOnly]
  );

  const getPort = React.useCallback(
    (nodeId: NodeId, portId: string): Port | undefined => {
      const node = state.nodes[nodeId];
      if (!node) return undefined;
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
      if (registry) {
        const definition = registry.get(node.type);
        if (definition) return portResolver.getPort(node, portId, definition);
      }
      return node.ports?.find((p) => p.id === portId);
    },
    [state.nodes, registry, portResolver, featureFlags.useInferredPortsOnly]
  );

  const portLookupMap = React.useMemo(() => {
    if (featureFlags.useInferredPortsOnly) {
      if (!registry) {
        console.error("NodeDefinitionRegistry is required when useInferredPortsOnly is enabled");
        return new Map<string, { node: Node; port: Port }>();
      }
      return portResolver.createPortLookupMap(state.nodes, (type: string) => registry.get(type));
    }
    if (!registry) {
      const map = new Map<string, { node: Node; port: Port }>();
      for (const node of Object.values(state.nodes)) {
        const ports = node.ports || [];
        for (const port of ports) map.set(`${node.id}:${port.id}`, { node, port });
      }
      return map;
    }
    return portResolver.createPortLookupMap(state.nodes, (type: string) => registry.get(type));
  }, [state.nodes, registry, portResolver, featureFlags.useInferredPortsOnly]);

  React.useEffect(() => {
    portResolver.clearCache();
  }, [state.nodes, portResolver]);

  const contextValue = React.useMemo(
    () => ({
      state,
      dispatch,
      actions: nodeEditorActions,
      isLoading,
      isSaving,
      handleSave,
      getNodePorts,
      getPort,
      portLookupMap,
    }),
    [state, dispatch, isLoading, isSaving, handleSave, getNodePorts, getPort, portLookupMap]
  );

  return <NodeEditorContext.Provider value={contextValue}>{children}</NodeEditorContext.Provider>;
};

export type { NodeEditorData };
