import * as React from "react";
import type { NodeEditorRenderers } from "../types/renderers";

const RendererContext = React.createContext<NodeEditorRenderers | null>(null);

export interface RendererProviderProps {
  renderers: NodeEditorRenderers;
  children: React.ReactNode;
}

export const RendererProvider: React.FC<RendererProviderProps> = ({ renderers, children }) => {
  return <RendererContext.Provider value={renderers}>{children}</RendererContext.Provider>;
};

export const useRenderers = (): NodeEditorRenderers => {
  const context = React.useContext(RendererContext);
  if (!context) {
    throw new Error("useRenderers must be used within a RendererProvider");
  }
  return context;
};

export const useOptionalRenderers = (): NodeEditorRenderers | null => React.useContext(RendererContext);
