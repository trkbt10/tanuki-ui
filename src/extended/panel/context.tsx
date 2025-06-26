import React, { createContext, useContext, useMemo, useReducer, useCallback } from 'react';
import {
  PanelState,
  PanelContextValue,
  PanelOptions,
  PanelActions,
  DragState,
  PanelID,
  TabID,
  TabMeta,
  Orientation,
  SplitDirection,
} from './types';
import { panelReducer, createInitialState } from './reducer';
import { createPanelActions } from './actions';

const PanelContext = createContext<PanelContextValue | null>(null);

export const usePanelContext = (): PanelContextValue => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error('usePanelContext must be used within a PanelProvider');
  }
  return context;
};

export interface PanelProviderProps {
  children: React.ReactNode;
  value?: PanelState;
  defaultValue?: PanelState;
  onChange?: (state: PanelState) => void;
  options?: PanelOptions;
}

const defaultOptions: Required<PanelOptions> = {
  pruneEmptyGroups: true,
  enableTabDrag: true,
  enablePanelSplit: true,
  enableTabReorder: true,
  minPanelSize: 100,
  splitterSize: 4,
  showCloseButton: true,
  maxTabWidth: 200,
  minTabWidth: 80,
  enableKeyboardShortcuts: true,
  keyBindings: {
    closeTab: ['Ctrl+W', 'Cmd+W'],
    newTab: ['Ctrl+T', 'Cmd+T'],
    nextTab: ['Ctrl+Tab', 'Cmd+Option+ArrowRight'],
    prevTab: ['Ctrl+Shift+Tab', 'Cmd+Option+ArrowLeft'],
    splitRight: ['Ctrl+\\', 'Cmd+\\'],
    splitDown: ['Ctrl+K Ctrl+\\', 'Cmd+K Cmd+\\'],
    focusGroup: ['Ctrl+1', 'Cmd+1'],
    moveTabRight: ['Ctrl+Alt+ArrowRight', 'Cmd+Ctrl+ArrowRight'],
    moveTabLeft: ['Ctrl+Alt+ArrowLeft', 'Cmd+Ctrl+ArrowLeft'],
  },
};

export const PanelProvider: React.FC<PanelProviderProps> = ({
  children,
  value,
  defaultValue,
  onChange,
  options = {},
}) => {
  const mergedOptions = useMemo(
    () => ({ ...defaultOptions, ...options }),
    [options]
  );

  const [state, dispatch] = useReducer(
    panelReducer,
    createInitialState(value || defaultValue)
  );

  // Controlled vs uncontrolled state handling
  const currentState = value || state.panelState;
  const currentDragState = state.dragState;

  // Track previous state to avoid unnecessary onChange calls
  const prevStateRef = React.useRef(state.panelState);
  
  // Notify parent of state changes
  React.useEffect(() => {
    if (onChange && JSON.stringify(prevStateRef.current) !== JSON.stringify(state.panelState)) {
      prevStateRef.current = state.panelState;
      onChange(state.panelState);
    }
  }, [state.panelState, onChange]);

  // Create base actions
  const baseActions = useMemo(() => createPanelActions(dispatch), [dispatch]);

  // Create memoized action wrappers
  const activateTab = useCallback((leafId: PanelID, tabId: TabID) => {
    baseActions.activateTab(leafId, tabId);
  }, [baseActions]);

  const closeTab = useCallback((leafId: PanelID, tabId: TabID) => {
    baseActions.closeTab(leafId, tabId);
  }, [baseActions]);

  const createTab = useCallback((leafId: PanelID, tab?: TabMeta) => {
    if (tab) {
      baseActions.createTab(leafId, tab);
    }
  }, [baseActions]);

  const moveTab = useCallback((
    sourceLeafId: PanelID,
    targetLeafId: PanelID,
    tabId: TabID,
    targetIndex?: number
  ) => {
    console.log('🚚 CONTEXT moveTab called:', { sourceLeafId, targetLeafId, tabId, targetIndex });
    baseActions.moveTab(sourceLeafId, targetLeafId, tabId, targetIndex);
  }, [baseActions]);

  const reorderTab = useCallback((leafId: PanelID, tabId: TabID, newIndex: number) => {
    console.log('🔄 CONTEXT reorderTab called:', { leafId, tabId, newIndex });
    baseActions.reorderTab(leafId, tabId, newIndex);
  }, [baseActions]);

  const splitPanel = useCallback((
    leafId: PanelID,
    orientation: Orientation,
    ratio?: number
  ) => {
    baseActions.splitPanel(leafId, orientation, ratio);
  }, [baseActions]);

  const closePanel = useCallback((panelId: PanelID) => {
    baseActions.closePanel(panelId);
  }, [baseActions]);

  const resizePanel = useCallback((panelId: PanelID, sizes: number[]) => {
    baseActions.resizePanel(panelId, sizes);
  }, [baseActions]);

  const focusPanel = useCallback((leafId: PanelID) => {
    baseActions.focusPanel(leafId);
  }, [baseActions]);

  const startDrag = useCallback((tabId: TabID, sourceLeafId: PanelID) => {
    console.log('🚀 CONTEXT startDrag called:', { tabId, sourceLeafId, enableTabDrag: mergedOptions.enableTabDrag });
    if (mergedOptions.enableTabDrag) {
      baseActions.startDrag(tabId, sourceLeafId);
    } else {
      console.log('❌ Tab drag disabled in options');
    }
  }, [baseActions, mergedOptions.enableTabDrag]);

  const setDropTarget = useCallback((
    leafId?: PanelID,
    direction?: SplitDirection,
    insertIndex?: number
  ) => {
    baseActions.setDropTarget(leafId, direction, insertIndex);
  }, [baseActions]);

  const endDrag = useCallback(() => {
    baseActions.endDrag();
  }, [baseActions]);

  const executeDrop = useCallback(() => {
    baseActions.executeDrop();
  }, [baseActions]);

  const pruneEmptyNodes = useCallback(() => {
    if (mergedOptions.pruneEmptyGroups) {
      baseActions.pruneEmptyNodes();
    }
  }, [baseActions, mergedOptions.pruneEmptyGroups]);

  const restoreTab = useCallback(() => {
    baseActions.restoreTab();
  }, [baseActions]);

  // Combine all actions
  const actions = useMemo((): PanelActions => ({
    activateTab,
    closeTab,
    createTab,
    moveTab,
    reorderTab,
    splitPanel,
    closePanel,
    resizePanel,
    focusPanel,
    startDrag,
    setDropTarget,
    endDrag,
    executeDrop,
    pruneEmptyNodes,
    restoreTab,
  }), [
    activateTab,
    closeTab,
    createTab,
    moveTab,
    reorderTab,
    splitPanel,
    closePanel,
    resizePanel,
    focusPanel,
    startDrag,
    setDropTarget,
    endDrag,
    executeDrop,
    pruneEmptyNodes,
    restoreTab,
  ]);

  const contextValue = useMemo(
    (): PanelContextValue => ({
      state: currentState,
      dragState: currentDragState,
      actions,
      options: mergedOptions,
    }),
    [currentState, currentDragState, actions, mergedOptions]
  );

  return (
    <PanelContext.Provider value={contextValue}>
      {children}
    </PanelContext.Provider>
  );
};

// Custom hooks for specific use cases
export const usePanelState = () => {
  const { state } = usePanelContext();
  return state;
};

export const useDragState = () => {
  const { dragState } = usePanelContext();
  return dragState;
};

export const usePanelActions = () => {
  const { actions } = usePanelContext();
  return actions;
};

export const usePanelOptions = () => {
  const { options } = usePanelContext();
  return options;
};

// Helper hooks for common operations
export const useTabOperations = (leafId: PanelID) => {
  const { actions } = usePanelContext();
  
  return useMemo(() => ({
    activateTab: (tabId: TabID) => actions.activateTab(leafId, tabId),
    closeTab: (tabId: TabID) => actions.closeTab(leafId, tabId),
    createTab: (tab?: TabMeta) => actions.createTab(leafId, tab),
    reorderTab: (tabId: TabID, newIndex: number) => actions.reorderTab(leafId, tabId, newIndex),
  }), [actions, leafId]);
};

export const usePanelOperations = (panelId: PanelID) => {
  const { actions } = usePanelContext();
  
  return useMemo(() => ({
    splitPanel: (orientation: Orientation, ratio?: number) => 
      actions.splitPanel(panelId, orientation, ratio),
    closePanel: () => actions.closePanel(panelId),
    focusPanel: () => actions.focusPanel(panelId),
  }), [actions, panelId]);
};

export const useDragOperations = () => {
  const { actions } = usePanelContext();
  
  return useMemo(() => ({
    startDrag: actions.startDrag,
    setDropTarget: actions.setDropTarget,
    endDrag: actions.endDrag,
    executeDrop: actions.executeDrop,
  }), [actions]);
};

export { PanelContext };