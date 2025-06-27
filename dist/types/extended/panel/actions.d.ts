import { PanelID, TabID, TabMeta, Orientation, SplitDirection } from './types';
export declare enum PanelActionType {
    ACTIVATE_TAB = "ACTIVATE_TAB",
    CLOSE_TAB = "CLOSE_TAB",
    CREATE_TAB = "CREATE_TAB",
    MOVE_TAB = "MOVE_TAB",
    REORDER_TAB = "REORDER_TAB",
    SPLIT_PANEL = "SPLIT_PANEL",
    CLOSE_PANEL = "CLOSE_PANEL",
    RESIZE_PANEL = "RESIZE_PANEL",
    FOCUS_PANEL = "FOCUS_PANEL",
    START_DRAG = "START_DRAG",
    SET_DROP_TARGET = "SET_DROP_TARGET",
    END_DRAG = "END_DRAG",
    EXECUTE_DROP = "EXECUTE_DROP",
    PRUNE_EMPTY_NODES = "PRUNE_EMPTY_NODES",
    RESTORE_TAB = "RESTORE_TAB",
    SET_STATE = "SET_STATE"
}
export interface ActivateTabAction {
    type: PanelActionType.ACTIVATE_TAB;
    payload: {
        leafId: PanelID;
        tabId: TabID;
    };
}
export interface CloseTabAction {
    type: PanelActionType.CLOSE_TAB;
    payload: {
        leafId: PanelID;
        tabId: TabID;
    };
}
export interface CreateTabAction {
    type: PanelActionType.CREATE_TAB;
    payload: {
        leafId: PanelID;
        tab: TabMeta;
    };
}
export interface MoveTabAction {
    type: PanelActionType.MOVE_TAB;
    payload: {
        sourceLeafId: PanelID;
        targetLeafId: PanelID;
        tabId: TabID;
        targetIndex?: number;
    };
}
export interface ReorderTabAction {
    type: PanelActionType.REORDER_TAB;
    payload: {
        leafId: PanelID;
        tabId: TabID;
        newIndex: number;
    };
}
export interface SplitPanelAction {
    type: PanelActionType.SPLIT_PANEL;
    payload: {
        leafId: PanelID;
        orientation: Orientation;
        ratio?: number;
    };
}
export interface ClosePanelAction {
    type: PanelActionType.CLOSE_PANEL;
    payload: {
        panelId: PanelID;
    };
}
export interface ResizePanelAction {
    type: PanelActionType.RESIZE_PANEL;
    payload: {
        panelId: PanelID;
        sizes: number[];
    };
}
export interface FocusPanelAction {
    type: PanelActionType.FOCUS_PANEL;
    payload: {
        leafId: PanelID;
    };
}
export interface StartDragAction {
    type: PanelActionType.START_DRAG;
    payload: {
        tabId: TabID;
        sourceLeafId: PanelID;
    };
}
export interface SetDropTargetAction {
    type: PanelActionType.SET_DROP_TARGET;
    payload: {
        leafId?: PanelID;
        direction?: SplitDirection;
        insertIndex?: number;
    };
}
export interface EndDragAction {
    type: PanelActionType.END_DRAG;
}
export interface ExecuteDropAction {
    type: PanelActionType.EXECUTE_DROP;
}
export interface PruneEmptyNodesAction {
    type: PanelActionType.PRUNE_EMPTY_NODES;
}
export interface RestoreTabAction {
    type: PanelActionType.RESTORE_TAB;
}
export interface SetStateAction {
    type: PanelActionType.SET_STATE;
    payload: {
        state: any;
    };
}
export type PanelAction = ActivateTabAction | CloseTabAction | CreateTabAction | MoveTabAction | ReorderTabAction | SplitPanelAction | ClosePanelAction | ResizePanelAction | FocusPanelAction | StartDragAction | SetDropTargetAction | EndDragAction | ExecuteDropAction | PruneEmptyNodesAction | RestoreTabAction | SetStateAction;
export declare const createPanelActions: (dispatch: React.Dispatch<PanelAction>) => {
    activateTab: (leafId: PanelID, tabId: TabID) => void;
    closeTab: (leafId: PanelID, tabId: TabID) => void;
    createTab: (leafId: PanelID, tab?: TabMeta) => void;
    moveTab: (sourceLeafId: PanelID, targetLeafId: PanelID, tabId: TabID, targetIndex?: number) => void;
    reorderTab: (leafId: PanelID, tabId: TabID, newIndex: number) => void;
    splitPanel: (leafId: PanelID, orientation: Orientation, ratio?: number) => void;
    closePanel: (panelId: PanelID) => void;
    resizePanel: (panelId: PanelID, sizes: number[]) => void;
    focusPanel: (leafId: PanelID) => void;
    startDrag: (tabId: TabID, sourceLeafId: PanelID) => void;
    setDropTarget: (leafId?: PanelID, direction?: SplitDirection, insertIndex?: number) => void;
    endDrag: () => void;
    executeDrop: () => void;
    pruneEmptyNodes: () => void;
    restoreTab: () => void;
};
