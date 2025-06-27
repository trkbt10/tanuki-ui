import { ExternalDataReference } from '../types/NodeDefinition';
import * as React from "react";
/**
 * Context for providing external data references
 */
export interface ExternalDataContextValue {
    refs: Record<string, ExternalDataReference>;
}
export declare const ExternalDataContext: React.Context<ExternalDataContextValue | null>;
export interface ExternalDataProviderProps {
    children: React.ReactNode;
    refs?: Record<string, ExternalDataReference>;
}
export declare const ExternalDataProvider: React.FC<ExternalDataProviderProps>;
export declare const useExternalDataRefs: () => ExternalDataContextValue;
export declare const useExternalDataRef: (nodeId: string) => ExternalDataReference | undefined;
