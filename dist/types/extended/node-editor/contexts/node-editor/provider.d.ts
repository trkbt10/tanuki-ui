import { NodeEditorData } from '../../types/core';
import { SettingsManager } from '../../settings/SettingsManager';
import * as React from "react";
export interface NodeEditorProviderProps {
    children: React.ReactNode;
    initialState?: Partial<NodeEditorData>;
    controlledData?: NodeEditorData;
    onDataChange?: (data: NodeEditorData) => void;
    onSave?: (data: NodeEditorData) => void | Promise<void>;
    onLoad?: () => NodeEditorData | Promise<NodeEditorData>;
    settingsManager?: SettingsManager;
}
export declare const NodeEditorProvider: React.FC<NodeEditorProviderProps>;
export type { NodeEditorData };
