import * as React from "react";
export type NodeId = string;
export interface InlineEditingState {
    editingNodeId: NodeId | null;
    editingField: 'title' | 'data' | null;
    originalValue: string;
    currentValue: string;
    isActive: boolean;
}
export type InlineEditingAction = {
    type: "START_EDITING";
    payload: {
        nodeId: NodeId;
        field: 'title' | 'data';
        value: string;
    };
} | {
    type: "UPDATE_VALUE";
    payload: {
        value: string;
    };
} | {
    type: "CONFIRM_EDIT";
} | {
    type: "CANCEL_EDIT";
} | {
    type: "END_EDITING";
};
export declare const inlineEditingReducer: (state: InlineEditingState, action: InlineEditingAction) => InlineEditingState;
export declare const defaultInlineEditingState: InlineEditingState;
export declare const inlineEditingActions: {
    startEditing: (nodeId: NodeId, field: "title" | "data", value: string) => InlineEditingAction;
    updateValue: (value: string) => InlineEditingAction;
    confirmEdit: () => InlineEditingAction;
    cancelEdit: () => InlineEditingAction;
    endEditing: () => InlineEditingAction;
};
export interface InlineEditingContextValue {
    state: InlineEditingState;
    dispatch: React.Dispatch<InlineEditingAction>;
    actions: typeof inlineEditingActions;
    isEditing: (nodeId: NodeId, field?: 'title' | 'data') => boolean;
    startEditing: (nodeId: NodeId, field: 'title' | 'data', value: string) => void;
    updateValue: (value: string) => void;
    confirmEdit: () => void;
    cancelEdit: () => void;
}
export declare const InlineEditingContext: React.Context<InlineEditingContextValue | null>;
export interface InlineEditingProviderProps {
    children: React.ReactNode;
    initialState?: Partial<InlineEditingState>;
}
export declare const InlineEditingProvider: React.FC<InlineEditingProviderProps>;
export declare const useInlineEditing: () => InlineEditingContextValue;
