import { Node } from '../types/core';
import { ExternalDataReference } from '../types/NodeDefinition';
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
export declare function useExternalData(node: Node | null, externalRef?: ExternalDataReference): ExternalDataState & {
    refresh: () => void;
    update: (data: unknown) => Promise<void>;
};
/**
 * Hook for managing multiple external data references
 */
export declare function useExternalDataMap(nodes: Record<string, Node>, externalRefs: Record<string, ExternalDataReference>): Record<string, ExternalDataState>;
