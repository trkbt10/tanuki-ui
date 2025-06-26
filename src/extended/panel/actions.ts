import {
  PanelID,
  TabID,
  TabMeta,
  Orientation,
  SplitDirection,
} from './types';

export enum PanelActionType {
  // Tab actions
  ACTIVATE_TAB = 'ACTIVATE_TAB',
  CLOSE_TAB = 'CLOSE_TAB',
  CREATE_TAB = 'CREATE_TAB',
  MOVE_TAB = 'MOVE_TAB',
  REORDER_TAB = 'REORDER_TAB',

  // Panel actions
  SPLIT_PANEL = 'SPLIT_PANEL',
  CLOSE_PANEL = 'CLOSE_PANEL',
  RESIZE_PANEL = 'RESIZE_PANEL',
  FOCUS_PANEL = 'FOCUS_PANEL',

  // Drag actions
  START_DRAG = 'START_DRAG',
  SET_DROP_TARGET = 'SET_DROP_TARGET',
  END_DRAG = 'END_DRAG',
  EXECUTE_DROP = 'EXECUTE_DROP',

  // Utility actions
  PRUNE_EMPTY_NODES = 'PRUNE_EMPTY_NODES',
  RESTORE_TAB = 'RESTORE_TAB',
  SET_STATE = 'SET_STATE',
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

export type PanelAction =
  | ActivateTabAction
  | CloseTabAction
  | CreateTabAction
  | MoveTabAction
  | ReorderTabAction
  | SplitPanelAction
  | ClosePanelAction
  | ResizePanelAction
  | FocusPanelAction
  | StartDragAction
  | SetDropTargetAction
  | EndDragAction
  | ExecuteDropAction
  | PruneEmptyNodesAction
  | RestoreTabAction
  | SetStateAction;

// Action creators
export const createPanelActions = (dispatch: React.Dispatch<PanelAction>) => ({
  activateTab: (leafId: PanelID, tabId: TabID) => {
    dispatch({
      type: PanelActionType.ACTIVATE_TAB,
      payload: { leafId, tabId },
    });
  },

  closeTab: (leafId: PanelID, tabId: TabID) => {
    dispatch({
      type: PanelActionType.CLOSE_TAB,
      payload: { leafId, tabId },
    });
  },

  createTab: (leafId: PanelID, tab?: TabMeta) => {
    if (tab) {
      dispatch({
        type: PanelActionType.CREATE_TAB,
        payload: { leafId, tab },
      });
    }
  },

  moveTab: (
    sourceLeafId: PanelID,
    targetLeafId: PanelID,
    tabId: TabID,
    targetIndex?: number
  ) => {
    console.log('🎭 ACTION moveTab dispatching:', { sourceLeafId, targetLeafId, tabId, targetIndex });
    dispatch({
      type: PanelActionType.MOVE_TAB,
      payload: { sourceLeafId, targetLeafId, tabId, targetIndex },
    });
  },

  reorderTab: (leafId: PanelID, tabId: TabID, newIndex: number) => {
    console.log('🎭 ACTION reorderTab dispatching:', { leafId, tabId, newIndex });
    dispatch({
      type: PanelActionType.REORDER_TAB,
      payload: { leafId, tabId, newIndex },
    });
  },

  splitPanel: (
    leafId: PanelID,
    orientation: Orientation,
    ratio?: number
  ) => {
    dispatch({
      type: PanelActionType.SPLIT_PANEL,
      payload: { leafId, orientation, ratio },
    });
  },

  closePanel: (panelId: PanelID) => {
    dispatch({
      type: PanelActionType.CLOSE_PANEL,
      payload: { panelId },
    });
  },

  resizePanel: (panelId: PanelID, sizes: number[]) => {
    dispatch({
      type: PanelActionType.RESIZE_PANEL,
      payload: { panelId, sizes },
    });
  },

  focusPanel: (leafId: PanelID) => {
    dispatch({
      type: PanelActionType.FOCUS_PANEL,
      payload: { leafId },
    });
  },

  startDrag: (tabId: TabID, sourceLeafId: PanelID) => {
    dispatch({
      type: PanelActionType.START_DRAG,
      payload: { tabId, sourceLeafId },
    });
  },

  setDropTarget: (
    leafId?: PanelID,
    direction?: SplitDirection,
    insertIndex?: number
  ) => {
    dispatch({
      type: PanelActionType.SET_DROP_TARGET,
      payload: { leafId, direction, insertIndex },
    });
  },

  endDrag: () => {
    dispatch({
      type: PanelActionType.END_DRAG,
    });
  },

  executeDrop: () => {
    dispatch({
      type: PanelActionType.EXECUTE_DROP,
    });
  },

  pruneEmptyNodes: () => {
    dispatch({
      type: PanelActionType.PRUNE_EMPTY_NODES,
    });
  },

  restoreTab: () => {
    dispatch({
      type: PanelActionType.RESTORE_TAB,
    });
  },
});