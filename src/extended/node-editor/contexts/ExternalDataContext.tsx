import * as React from "react";
import type { ExternalDataReference } from "../types/NodeDefinition";

/**
 * Context for providing external data references
 */
export interface ExternalDataContextValue {
  refs: Record<string, ExternalDataReference>;
}

export const ExternalDataContext = React.createContext<ExternalDataContextValue | null>(null);

export interface ExternalDataProviderProps {
  children: React.ReactNode;
  refs?: Record<string, ExternalDataReference>;
}

export const ExternalDataProvider: React.FC<ExternalDataProviderProps> = ({
  children,
  refs = {},
}) => {
  const contextValue: ExternalDataContextValue = {
    refs,
  };

  return (
    <ExternalDataContext.Provider value={contextValue}>
      {children}
    </ExternalDataContext.Provider>
  );
};

export const useExternalDataRefs = (): ExternalDataContextValue => {
  const context = React.useContext(ExternalDataContext);
  if (!context) {
    throw new Error("useExternalDataRefs must be used within an ExternalDataProvider");
  }
  return context;
};

export const useExternalDataRef = (nodeId: string): ExternalDataReference | undefined => {
  const { refs } = useExternalDataRefs();
  return refs[nodeId];
};