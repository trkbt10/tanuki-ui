import { NodeEditorData } from '../types/core';
import * as React from "react";
export interface HistoryEntry {
    id: string;
    timestamp: number;
    action: string;
    data: NodeEditorData;
}
export interface HistoryState {
    entries: HistoryEntry[];
    currentIndex: number;
    maxEntries: number;
    isRecording: boolean;
}
export type HistoryAction = {
    type: "PUSH_ENTRY";
    payload: {
        action: string;
        data: NodeEditorData;
    };
} | {
    type: "UNDO";
} | {
    type: "REDO";
} | {
    type: "CLEAR_HISTORY";
} | {
    type: "SET_RECORDING";
    payload: {
        isRecording: boolean;
    };
} | {
    type: "SET_MAX_ENTRIES";
    payload: {
        maxEntries: number;
    };
};
export declare const historyReducer: (state: HistoryState, action: HistoryAction) => HistoryState;
export declare const defaultHistoryState: HistoryState;
export declare const historyActions: {
    pushEntry: (action: string, data: NodeEditorData) => HistoryAction;
    undo: () => HistoryAction;
    redo: () => HistoryAction;
    clearHistory: () => HistoryAction;
    setRecording: (isRecording: boolean) => HistoryAction;
    setMaxEntries: (maxEntries: number) => HistoryAction;
};
export interface HistoryContextValue {
    state: HistoryState;
    dispatch: React.Dispatch<HistoryAction>;
    actions: typeof historyActions;
    canUndo: boolean;
    canRedo: boolean;
    currentEntry: HistoryEntry | null;
    pushEntry: (action: string, data: NodeEditorData) => void;
    undo: () => HistoryEntry | null;
    redo: () => HistoryEntry | null;
}
export declare const HistoryContext: React.Context<HistoryContextValue | null>;
export interface HistoryProviderProps {
    children: React.ReactNode;
    initialState?: Partial<HistoryState>;
}
export declare const HistoryProvider: React.FC<HistoryProviderProps>;
export declare const useHistory: () => HistoryContextValue;
