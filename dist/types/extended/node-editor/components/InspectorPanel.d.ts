import * as React from "react";
export interface InspectorPanelProps {
    className?: string;
}
/**
 * InspectorPanel - Displays and allows editing of selected nodes and connections
 * Uses Context to receive information from NodeEditor and EditorActionState
 */
export declare const InspectorPanel: React.FC<InspectorPanelProps>;
