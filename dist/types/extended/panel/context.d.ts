import { default as React } from 'react';
import { PanelState, PanelContextValue, PanelOptions, PanelActions, DragState, PanelID, TabID, TabMeta, Orientation, SplitDirection } from './types';
declare const PanelContext: React.Context<PanelContextValue | null>;
export declare const usePanelContext: () => PanelContextValue;
export interface PanelProviderProps {
    children: React.ReactNode;
    value?: PanelState;
    defaultValue?: PanelState;
    onChange?: (state: PanelState) => void;
    options?: PanelOptions;
}
export declare const PanelProvider: React.FC<PanelProviderProps>;
export declare const usePanelState: () => PanelState;
export declare const useDragState: () => DragState;
export declare const usePanelActions: () => PanelActions;
export declare const usePanelOptions: () => Required<PanelOptions>;
export declare const useTabOperations: (leafId: PanelID) => {
    activateTab: (tabId: TabID) => void;
    closeTab: (tabId: TabID) => void;
    createTab: (tab?: TabMeta) => void;
    reorderTab: (tabId: TabID, newIndex: number) => void;
};
export declare const usePanelOperations: (panelId: PanelID) => {
    splitPanel: (orientation: Orientation, ratio?: number) => void;
    closePanel: () => void;
    focusPanel: () => void;
};
export declare const useDragOperations: () => {
    startDrag: (tabId: TabID, sourceLeafId: PanelID) => void;
    setDropTarget: (leafId?: PanelID, direction?: SplitDirection, insertIndex?: number) => void;
    endDrag: () => void;
    executeDrop: () => void;
};
export { PanelContext };
