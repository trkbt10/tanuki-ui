import { NodeEditorData } from '../../types/core';
import { NodeEditorAction } from './actions';
export declare const nodeEditorReducer: (state: NodeEditorData, action: NodeEditorAction) => NodeEditorData;
export declare const defaultNodeEditorData: NodeEditorData;
export declare function generateId(): string;
export type { NodeEditorData };
