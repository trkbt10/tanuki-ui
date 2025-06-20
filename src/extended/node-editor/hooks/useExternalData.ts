import * as React from "react";
import type { Node } from "../types/core";
import type { ExternalDataReference, NodeDefinition } from "../types/NodeDefinition";
import { useNodeDefinition } from "../contexts/NodeDefinitionContext";

/**
 * External data state
 */
export interface ExternalDataState {
  data: unknown;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook for managing external data for a node
 */
export function useExternalData(
  node: Node | null,
  externalRef?: ExternalDataReference
): ExternalDataState & {
  refresh: () => void;
  update: (data: unknown) => Promise<void>;
} {
  const definition = useNodeDefinition(node?.type || "");
  const [state, setState] = React.useState<ExternalDataState>({
    data: undefined,
    isLoading: false,
    error: null,
  });

  // Load external data
  const loadData = React.useCallback(async () => {
    if (!node || !externalRef || !definition?.loadExternalData) {
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await Promise.resolve(
        definition.loadExternalData(externalRef)
      );
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: undefined,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }, [node, externalRef, definition]);

  // Initial load
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // Update external data
  const update = React.useCallback(
    async (data: unknown) => {
      if (!node || !externalRef || !definition?.updateExternalData) {
        throw new Error("Cannot update external data: missing requirements");
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await Promise.resolve(
          definition.updateExternalData(externalRef, data)
        );
        // Optimistically update local state
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
        throw error;
      }
    },
    [node, externalRef, definition]
  );

  return {
    ...state,
    refresh: loadData,
    update,
  };
}

/**
 * Hook for managing multiple external data references
 */
export function useExternalDataMap(
  nodes: Record<string, Node>,
  externalRefs: Record<string, ExternalDataReference>
): Record<string, ExternalDataState> {
  const [dataMap, setDataMap] = React.useState<Record<string, ExternalDataState>>({});

  React.useEffect(() => {
    const loadAllData = async () => {
      const newDataMap: Record<string, ExternalDataState> = {};

      await Promise.all(
        Object.entries(nodes).map(async ([nodeId, node]) => {
          const externalRef = externalRefs[nodeId];
          if (!externalRef) {
            newDataMap[nodeId] = {
              data: undefined,
              isLoading: false,
              error: null,
            };
            return;
          }

          // This would need to be implemented with proper definition lookup
          newDataMap[nodeId] = {
            data: undefined,
            isLoading: true,
            error: null,
          };
        })
      );

      setDataMap(newDataMap);
    };

    loadAllData();
  }, [nodes, externalRefs]);

  return dataMap;
}